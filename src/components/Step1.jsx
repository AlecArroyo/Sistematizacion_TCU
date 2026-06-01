import { useState } from "react"
import StepBar from "./StepBar"
import FadeSection from "./FadeSection";


export default function Step1({ currentStep, totalSteps, onNext }) {
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState(false)

  function handleNext() {
    if (!nombre.trim()) { setError(true); return }
    onNext({ nombre })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-11 h-11 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">UCR</span>
        </div>
        <StepBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <FadeSection>
        <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase mb-1">
          Sistematización TCU-782
        </p>
        <h1 className="text-3xl font-normal text-gray-900 mb-6">
          ¿Quién está registrando esta actividad?
        </h1>

        <input
          type="text"
          placeholder="Ingresa tu nombre completo"
          value={nombre}
          onChange={(e) => { setNombre(e.target.value); setError(false) }}
          className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none
          focus:border-sky-400 focus:ring-2 focus:ring-sky-100
          ${error ? "border-red-400" : "border-gray-300"}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">Ingresa tu nombre.</p>}


      </FadeSection>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-6">
        <button
          onClick={handleNext}
          className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-6 py-2.5 rounded-full transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}