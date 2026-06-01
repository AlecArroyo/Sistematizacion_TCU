import { useState } from "react"
import StepBar from "./StepBar"
import FadeSection from "./FadeSection"

export default function Step2({ currentStep, totalSteps, onNext, onBack }) {
  const [comunidad, setComunidad] = useState("")
  const [fecha, setFecha] = useState("")
  const [errors, setErrors] = useState({})

  function handleNext() {
    const newErrors = {}
    if (!comunidad.trim()) newErrors.comunidad = "Ingresa el nombre de la comunidad."
    if (!fecha) newErrors.fecha = "Selecciona la fecha."
    setErrors(newErrors)
    if (Object.keys(newErrors).length) return
    onNext({ comunidad, fecha })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-11 h-11 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">UCR</span>
        </div>
        <StepBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <FadeSection>


        <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase mb-1">
          Sistematización TCU-782
        </p>
        <h1 className="text-3xl font-normal text-gray-900 mb-6">
          ¿Cuál es el nombre de la comunidad?
        </h1>

        <input
          type="text"
          placeholder="Nombre de la comunidad"
          value={comunidad}
          onChange={(e) => { setComunidad(e.target.value); setErrors(prev => ({ ...prev, comunidad: null })) }}
          className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none
          focus:border-sky-400 focus:ring-2 focus:ring-sky-100
          ${errors.comunidad ? "border-red-400" : "border-gray-300"}`}
        />
        {errors.comunidad && <p className="text-red-500 text-xs mt-1">{errors.comunidad}</p>}

        <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">Fecha</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="date"
            value={fecha}
            onChange={(e) => { setFecha(e.target.value); setErrors(prev => ({ ...prev, fecha: null })) }}
            className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg outline-none
            focus:border-sky-400 focus:ring-2 focus:ring-sky-100
            ${errors.fecha ? "border-red-400" : "border-gray-300"}`}
          />
        </div>
        {errors.fecha && <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>}


      </FadeSection>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 text-sm font-medium px-4 py-2.5 rounded-full transition"
          >
            Atrás
          </button>
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