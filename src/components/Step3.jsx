import { useState } from "react"
import StepBar from "./StepBar"
import FadeSection from "./FadeSection"

export default function Step3({ currentStep, totalSteps, onNext, onBack }) {
  const [actividad, setActividad] = useState("")
  const [horas, setHoras] = useState(1)
  const [participantes, setParticipantes] = useState(1)
  const [errors, setErrors] = useState({})

  function aumentar() {
    setHoras(prev => (typeof prev === 'number' ? prev + 1 : 1))
  }

  function disminuir() {
    setHoras(prev => {
      const n = typeof prev === 'number' ? prev - 1 : 0
      return Math.max(0, n)
    })
  }

  function handleHorasChange(e) {
    // permitir solo dígitos y convertir a entero
    const digits = e.target.value.replace(/\D/g, "")
    setHoras(digits === "" ? "" : parseInt(digits, 10))
    setErrors(prev => ({ ...prev, horas: null }))
  }

  function aumentarParticipantes() {
    setParticipantes(prev => (typeof prev === 'number' ? prev + 1 : 1))
  }

  function disminuirParticipantes() {
    setParticipantes(prev => {
      const n = typeof prev === 'number' ? prev - 1 : 0
      return Math.max(0, n)
    })
  }

  function handleParticipantesChange(e) {
    const digits = e.target.value.replace(/\D/g, "")
    setParticipantes(digits === "" ? "" : parseInt(digits, 10))
    setErrors(prev => ({ ...prev, participantes: null }))
  }

  function handleNext() {
    const newErrors = {}
    if (!actividad.trim()) newErrors.actividad = "Ingresa la actividad realizada."
    if (horas === "" || Number.isNaN(horas) || parseInt(horas, 10) < 1) newErrors.horas = "Ingresa las horas (entero mayor o igual a 1)."
    if (participantes === "" || Number.isNaN(participantes) || parseInt(participantes, 10) < 1) newErrors.participantes = "Ingresa la cantidad de participantes (entero mayor o igual a 1)."
    setErrors(newErrors)
    if (Object.keys(newErrors).length) return
    onNext({ actividad, horas, participantes })
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
          ¿Qué actividad se realizó y cuántas horas?
        </h1>

        <label className="block text-sm font-medium text-gray-700 mb-2">Actividad</label>
        <input
          type="text"
          placeholder="Describe la actividad"
          value={actividad}
          onChange={(e) => { setActividad(e.target.value); setErrors(prev => ({ ...prev, actividad: null })) }}
          className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none
          focus:border-sky-400 focus:ring-2 focus:ring-sky-100
          ${errors.actividad ? "border-red-400" : "border-gray-300"}`}
        />
        {errors.actividad && <p className="text-red-500 text-xs mt-1">{errors.actividad}</p>}

        <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">Horas</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={disminuir}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Disminuir horas"
          >
            -
          </button>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={horas}
            onChange={handleHorasChange}
            className={`w-24 text-center px-3 py-2 text-sm border rounded-lg outline-none
            focus:border-sky-400 focus:ring-2 focus:ring-sky-100
            ${errors.horas ? "border-red-400" : "border-gray-300"}`}
          />

          <button
            type="button"
            onClick={aumentar}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Aumentar horas"
          >
            +
          </button>
        </div>
        {errors.horas && <p className="text-red-500 text-xs mt-1">{errors.horas}</p>}

        <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">Participantes</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={disminuirParticipantes}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Disminuir participantes"
          >
            -
          </button>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={participantes}
            onChange={handleParticipantesChange}
            className={`w-24 text-center px-3 py-2 text-sm border rounded-lg outline-none
            focus:border-sky-400 focus:ring-2 focus:ring-sky-100
            ${errors.participantes ? "border-red-400" : "border-gray-300"}`}
          />

          <button
            type="button"
            onClick={aumentarParticipantes}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Aumentar participantes"
          >
            +
          </button>
        </div>
        {errors.participantes && <p className="text-red-500 text-xs mt-1">{errors.participantes}</p>}


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
