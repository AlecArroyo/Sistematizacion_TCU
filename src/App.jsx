import { useState } from "react"
import Step0 from "./components/Step0"
import Step1 from "./components/Step1"
import Step2 from "./components/Step2"
import Step3 from "./components/Step3"
import Step4 from "./components/Step4"
import Step5 from "./components/Step5"
import Step6 from "./components/Step6"
import Step7 from "./components/Step7"

export default function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [payload, setPayload] = useState(null)

  function handleNext(data) {
    setFormData(prev => ({ ...prev, ...data }))
    setCurrentStep(prev => prev + 1)
  }

  function handleSubmit() {
    const structuredPayload = {
      nombre: formData.nombre || "",
      comunidad: formData.comunidad || "",
      fecha: formData.fecha || "",
      actividad: formData.actividad || "",
      horas: Number(formData.horas) || 0,
      participantes: Number(formData.participantes) || 0,
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
    setPayload(structuredPayload)
    setSubmitted(true)
    console.log("Datos enviados:", structuredPayload)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-gray-200 p-10 w-full max-w-xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500 text-white mb-6">
            ✓
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Enviado con éxito</h1>
          <p className="text-sm text-gray-600 mb-8">
            La sistematización ha sido registrada. Gracias por la información.
          </p>
          <pre className="text-left text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-x-auto">
            {JSON.stringify(payload || formData, null, 2)}
          </pre>
        </div>
      </div>
    )
  }

  function handleBack() {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  return (
    <div className="min-h-screen bg-cyan-100 flex items-center font-google justify-center p-4">
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
        <Step7 currentStep={currentStep} totalSteps={8} formData={formData} onBack={handleBack} onSubmit={handleSubmit} />
      )}
    </div>
  )
}