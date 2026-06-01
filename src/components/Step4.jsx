import { useState } from "react"
import StepBar from "./StepBar"
import FadeSection from "./FadeSection"

export default function Step4({ currentStep, totalSteps, onNext, onBack }) {
  const [collected, setCollected] = useState(null) // null, true, false
  const [media, setMedia] = useState([])
  const [errors, setErrors] = useState(null)

  function addItem() {
    setMedia(prev => [...prev, { title: "", owner: "" }])
  }

  function removeItem(index) {
    setMedia(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index, field, value) {
    setMedia(prev => prev.map((it, i) => i === index ? { ...it, [field]: value } : it))
  }

  function handleNext() {
    if (collected === null) {
      setErrors("Selecciona sí o no.")
      return
    }

    if (collected === true) {
      // validar que cada item tenga título y propietario si existen
      const bad = media.some(it => !it.title.trim() || !it.owner.trim())
      if (bad) {
        setErrors("Todos los audios/videos añadidos deben tener título y propietario.")
        return
      }
    }

    // enviar collected y media (puede estar vacío)
    onNext({ collectedMedia: collected, media })
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

        <h1 className="text-3xl font-normal text-gray-900 mb-4">¿Se recopilaron audios o videos en la gira?</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            type="button"
            onClick={() => { setCollected(true); setErrors(null) }}
            className={`px-4 py-2 rounded-full border ${collected === true ? 'bg-sky-500 text-white border-sky-500' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            Sí
          </button>
          <button
            type="button"
            onClick={() => { setCollected(false); setErrors(null); setMedia([]) }}
            className={`px-4 py-2 rounded-full border ${collected === false ? 'bg-sky-500 text-white border-sky-500' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            No
          </button>
        </div>

        {collected === true && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">Agrega los audios/videos (Paso 4.5). Pulsa + para añadir uno nuevo.</p>

            <div className="space-y-3">
              {media.map((item, idx) => (
                <div key={idx} className="p-3 border border-gray-400 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm font-medium">Archivo {idx + 1}</strong>
                    <button type="button" onClick={() => removeItem(idx)} className="text-red-500 text-sm hover:text-red-600 hover:underline transform transition duration-150">Eliminar</button>
                  </div>
                  <input
                    type="text"
                    placeholder="Título del audio/video"
                    value={item.title}
                    onChange={(e) => updateItem(idx, 'title', e.target.value)}
                    className="w-full px-3 py-2 mb-2 text-sm border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Propietario"
                    value={item.owner}
                    onChange={(e) => updateItem(idx, 'owner', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3">
              <button type="button" onClick={addItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-100">
                + Agregar audio/video
              </button>
            </div>
          </div>
        )}

        {errors && <p className="text-red-500 text-xs mt-3">{errors}</p>}


      </FadeSection>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm font-medium px-4 py-2.5 rounded-full transition">Atrás</button>
        <button onClick={handleNext} className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-6 py-2.5 rounded-full transition">Continuar</button>
      </div>

    </div>
  )
}
