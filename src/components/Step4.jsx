import { useState } from "react"
import StepBar from "./StepBar"
import FadeSection from "./FadeSection"
import useEstudiantes from "../hooks/useEstudiantes"

export default function Step4({ currentStep, totalSteps, onNext, onBack }) {
  const [collected, setCollected] = useState(null) // null, true, false
  const [media, setMedia] = useState([])
  const [errors, setErrors] = useState(null)
  const { estudiantes, loading } = useEstudiantes()

  function addItem() {
    setMedia(prev => [...prev, { types: [], owner: "", ownerId: "" }])
  }

  function toggleType(index, type) {
    setMedia(prev => prev.map((it, i) => {
      if (i !== index) return it
      const has = it.types.includes(type)
      return { ...it, types: has ? it.types.filter(t => t !== type) : [...it.types, type] }
    }))
  }

  function removeItem(index) {
    setMedia(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index, field, value) {
    setMedia(prev => prev.map((it, i) => i === index ? { ...it, [field]: value } : it))
  }

  function selectOwner(index, id) {
    const e = estudiantes.find(est => est.id === id)
    const nombreCompleto = e
      ? `${e.nombre} ${e.apellido1} ${e.apellido2}`.replace(/\s+/g, ' ').trim()
      : ""

    setMedia(prev => prev.map((it, i) =>
      i === index ? { ...it, owner: nombreCompleto, ownerId: id } : it
    ))
  }

  function handleNext() {
    if (collected === null) {
      setErrors("Selecciona sí o no.")
      return
    }

    if (collected === true) {
      if (media.length === 0) {
        setErrors("Agrega al menos un audio o video.")
        return
      }

      const bad = media.some(it => it.types.length === 0 || !it.owner || !it.owner.trim())
      if (bad) {
        setErrors("Todos los audios/videos añadidos deben tener título y propietario.")
        return
      }
    }

    // convertimos types (array) a title (string) para la base de datos
    const mediaForDb = media.map(it => ({
      title: it.types.join(", "),
      owner: it.owner,
      ownerId: it.ownerId
    }))

    onNext({ collectedMedia: collected, media: mediaForDb })
  }

  // derivar estado para deshabilitar el botón Continuar cuando se requiere info y falta
  const hasIncompleteMedia = collected === true && (media.length === 0 || media.some(it => it.types.length === 0 || !it.owner || !it.owner.trim()))
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

        <h1 className="text-3xl font-normal text-gray-900 mb-4">¿Se recopilaron audios, videos o fotos en la gira?</h1>

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
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">¡Ya casi terminas!</span> Registra aqui quién tiene fotos, videos o audios de la gira — toma 10 segundos. Luego le avisamos a esa persona para que lo suba al drive y así generar material del TCU (cuentos, videos, etc.).
              </p>
            </div>

            <div className="space-y-3">
              {media.map((item, idx) => (
                <div key={idx} className="p-4 border border-gray-200 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Registro {idx + 1}</span>
                    <button type="button" onClick={() => removeItem(idx)} className="text-red-500 text-xs hover:text-red-600 hover:underline">Eliminar</button>
                  </div>

                  <label className="block text-xs font-medium text-gray-500 mb-2">¿Qué es? (podés marcar varios)</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {["Foto(s)", "Audio(s)", "Video(s)"].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleType(idx, type)}
                        className={`px-3 py-2 sm:py-1.5 rounded-full border text-sm whitespace-nowrap ${item.types.includes(type)
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <label className="block text-xs font-medium text-gray-500 mb-1">¿Quién lo tiene?</label>
                  <select
                    value={item.ownerId}
                    onChange={(e) => selectOwner(idx, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="">{loading ? "Cargando..." : "Selecciona un estudiante"}</option>
                    {estudiantes.map(e => {
                      const nombreCompleto = `${e.nombre} ${e.apellido1} ${e.apellido2}`.replace(/\s+/g, ' ').trim()
                      return <option key={e.id} value={e.id}>{nombreCompleto}</option>
                    })}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <button type="button" onClick={addItem} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-100 text-sm font-medium">
                + Agregar otro registro audio/video
              </button>
            </div>
          </div>
        )}

        {errors && <p className="text-red-500 text-xs mt-3">{errors}</p>}


      </FadeSection>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm font-medium px-4 py-2.5 rounded-full transition">Atrás</button>
        <button
          onClick={handleNext}
          disabled={hasIncompleteMedia}
          className={`bg-sky-500 text-white text-sm font-medium px-6 py-2.5 rounded-full transition ${hasIncompleteMedia ? 'opacity-50 cursor-not-allowed hover:bg-sky-500' : 'hover:bg-sky-600'}`}
        >
          Continuar
        </button>
      </div>

    </div>
  )
}
