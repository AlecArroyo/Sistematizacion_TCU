import { useState } from "react"
import StepBar from "./StepBar"
import FadeSection from "./FadeSection"


export default function Step5({ currentStep, totalSteps, onNext, onBack }) {
  const [hasConsent, setHasConsent] = useState(null)
  const [consents, setConsents] = useState([])
  const [errors, setErrors] = useState(null)

  function addPerson() {
    setConsents(prev => [...prev, { name: "", count: "" }])
  }

  function removePerson(index) {
    setConsents(prev => prev.filter((_, i) => i !== index))
  }

  function updatePerson(index, field, value) {
    setConsents(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }

  function handleNext() {
    if (hasConsent === null) {
      setErrors("Selecciona sí o no.")
      return
    }

    if (hasConsent === true) {
      const bad = consents.some(item => !item.name.trim() || item.count === "" || Number.isNaN(Number(item.count)) || Number(item.count) < 1)
      if (bad) {
        setErrors("Cada persona debe tener nombre y cantidad válida.")
        return
      }
    }

    onNext({ informedConsents: hasConsent, consents })
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

        <h1 className="text-3xl font-normal text-gray-900 mb-4">¿Hay consentimientos informados?</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            type="button"
            onClick={() => { setHasConsent(true); setErrors(null) }}
            className={`px-4 py-2 rounded-full border ${hasConsent === true ? 'bg-sky-500 text-white border-sky-500' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            Sí
          </button>
          <button
            type="button"
            onClick={() => { setHasConsent(false); setErrors(null); setConsents([]) }}
            className={`px-4 py-2 rounded-full border ${hasConsent === false ? 'bg-sky-500 text-white border-sky-500' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            No
          </button>
        </div>

      </FadeSection>


      {hasConsent === true && (
        <div className="mt-4">
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 mb-4">
            <p className="text-sm text-gray-700">
              Anota quién tiene los consentimientos firmados y cuántos tiene cada persona, para llevar el control de cuántos faltan recolectar o entregar.
            </p>
          </div>

          <div className="space-y-3">
            {consents.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Registro {idx + 1}</span>
                  <button type="button" onClick={() => removePerson(idx)} className="text-red-500 text-xs hover:text-red-600 hover:underline">Eliminar</button>
                </div>

                <label className="block text-xs font-medium text-gray-500 mb-1">Nombre de la persona</label>
                <input
                  type="text"
                  placeholder="Ej: María Pérez"
                  value={item.name}
                  onChange={(e) => updatePerson(idx, 'name', e.target.value)}
                  className="w-full px-3 py-2 mb-3 text-sm border border-gray-300 rounded-lg bg-white"
                />

                <label className="block text-xs font-medium text-gray-500 mb-1">Cantidad de consentimientos</label>
                <input
                  type="text"
                  placeholder="Ej: 3"
                  value={item.count}
                  onChange={(e) => updatePerson(idx, 'count', e.target.value.replace(/\D/g, ""))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
                />
              </div>
            ))}
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={addPerson}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-100 text-sm font-medium"
            >
              + Agregar otra persona
            </button>
          </div>
        </div>
      )}

      {errors && <p className="text-red-500 text-xs mt-3">{errors}</p>}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm font-medium px-4 py-2.5 rounded-full transition">Atrás</button>
        <button onClick={handleNext} className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-6 py-2.5 rounded-full transition">Continuar</button>
      </div>
    </div>
  )
}
