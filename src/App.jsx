import { useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Step0 from "./components/Step0"
import Step1 from "./components/Step1"
import Step2 from "./components/Step2"
import Step3 from "./components/Step3"
import Step4 from "./components/Step4"
import Step5 from "./components/Step5"
import Step6 from "./components/Step6"
import Step7 from "./components/Step7"
import Step8 from "./components/Step8"
import { crearSistematizacion } from "./services/api"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StepsForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

function StepsForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [payload, setPayload] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  function handleNext(data) {
    setFormData(prev => ({ ...prev, ...data }))
    setCurrentStep(prev => prev + 1)
  }

  async function handleSubmit() {
    const poblacionFromForm = Array.isArray(formData.poblacion)
      ? formData.poblacion.map(String)
      : Array.isArray(formData.tipoPoblacion)
      ? formData.tipoPoblacion.map(String)
      : (formData.poblacion ? [String(formData.poblacion)] : (formData.tipoPoblacion ? [String(formData.tipoPoblacion)] : []))

    const structuredPayload = {
      nombre: formData.nombre || "",
      comunidad: formData.comunidad || "",
      fecha: formData.fecha || "",
      distrito: formData.distrito || "",
      actividad: formData.actividad || "",
      horas: Number(formData.horas) || 0,
      participantes: Number(formData.participantes) || 0,
      poblacion: poblacionFromForm,
      audiosVideos: {
        recopilado: Boolean(formData.collectedMedia),
        items: Array.isArray(formData.media)
          ? formData.media.map(item => ({
              titulo: item.title || "",
              propietario: item.owner || ""
            }))
          : []
      },
      consentimientos: {
        tiene: Boolean(formData.informedConsents),
        personas: Array.isArray(formData.consents)
          ? formData.consents.map(item => ({
              nombre: item.name || "",
              cantidad: Number(item.count) || 0
            }))
          : []
      },
      notas: formData.notes || ""
    }
    setIsSubmitting(true)
    setSubmitError(null)
    setPayload(structuredPayload)
    try {
      const response = await crearSistematizacion(structuredPayload)
      setPayload(response)
      setCurrentStep(8)
      console.log("Datos enviados:", response)
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Error al enviar la sistematización"
      setSubmitError(message)
      console.error("Error enviando datos:", error)
    } finally {
      setIsSubmitting(false)
    }
  }


  function handleBack() {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  return (
    <div className="min-h-screen bg-cyan-100 flex items-center font-google justify-center p-4">
      <div className="w-full max-w-4xl absolute top-4 right-4">
        <div className="flex justify-end">
          <Link to="/dashboard" className="text-sky-600 hover:underline">Ir al Dashboard</Link>
        </div>
      </div>
      {currentStep === 0 && (
        <Step0 currentStep={currentStep} totalSteps={8} onNext={handleNext} />
      )}
      {currentStep === 1 && (
        <Step1 currentStep={currentStep} totalSteps={8} onNext={handleNext} />
      )}
      {currentStep === 2 && (
        <Step2 currentStep={currentStep} totalSteps={8} onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 3 && (
        <Step3 currentStep={currentStep} totalSteps={8} onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 4 && (
        <Step4 currentStep={currentStep} totalSteps={8} onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 5 && (
        <Step5 currentStep={currentStep} totalSteps={8} onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 6 && (
        <Step6 currentStep={currentStep} totalSteps={8} onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 7 && (
        <Step7
          currentStep={currentStep}
          totalSteps={8}
          formData={formData}
          onBack={handleBack}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
      {currentStep === 8 && (
        <Step8 currentStep={currentStep} totalSteps={8} onBack={handleBack} />
      )}
    </div>
  )
}