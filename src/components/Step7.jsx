import StepBar from "./StepBar"
import FadeSection from "./FadeSection"

export default function Step7({ currentStep, totalSteps, onBack, onSubmit, formData, isSubmitting, submitError }) {
  const {
    nombre,
    responsable,
    comunidad,
    fecha,
    actividad,
    horas,
    participantes,
    collectedMedia,
    media = [],
    informedConsents,
    consents = [],
    notes,
  } = formData

  const consentCount = informedConsents && consents.length > 0
    ? consents.reduce((acc, c) => acc + (parseInt(c.count) || 0), 0)
    : 0

  const archivoCount = collectedMedia && media.length > 0 ? media.length : 0

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 w-full max-w-md sm:max-w-xl mx-auto shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-full bg-sky-400 flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold tracking-wide">UCR</span>
        </div>
        <StepBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <FadeSection>
      {/* Title */}
      <p className="text-[10px] font-bold tracking-[0.14em] text-sky-400 uppercase mb-1">
        sistematización TCU-782
      </p>
      <h1 className="text-3xl font-normal text-slate-900 leading-tight">Resumen</h1>
      <p className="text-sm text-slate-500 mt-1.5 mb-5 leading-snug">
        Revisa los datos antes de enviar. Si necesitas cambiar algo, usa el botón Atrás.
      </p>

      {/* Responsable / Fecha / Comunidad */}
      <div className="divide-y divide-slate-100">
        <div className="flex items-start py-2">
          <span className="text-sm font-medium text-gray-700 w-28 shrink-0">Responsable</span>
          <span className="text-[13px] font-medium text-slate-900">{responsable || nombre || "No registrado"}</span>
        </div>
        <div className="flex items-start py-2">
          <span className="text-[13px] text-slate-500 w-28 shrink-0">Fecha</span>
          <span className="text-[13px] font-medium text-slate-900">{fecha || "No registrada"}</span>
        </div>
        <div className="flex items-start py-2 mb-3">
          <span className="text-[13px] text-slate-500 w-28 shrink-0">Comunidad</span>
          <span className="text-[13px] font-medium text-slate-900">{comunidad || "No registrada"}</span>
        </div>
      </div>

      {/* Actividad */}
      <div className="border-t border-slate-100 pt-3">
        <p className="text-[14px] font-semibold text-slate-900">Actividad</p>
        <p className="text-[13px] text-slate-500 mt-0.5 pb-3 border-b border-slate-100">
          {actividad || "No registrada"}
        </p>
      </div>

      {/* Stats tiles */}
      <div className="flex gap- py-3 border-b border-slate-100">
        {/* Participantes */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-sm text-slate-500 font-normal text-center leading-tight">Participantes</span>
          <div className="w-[54px] h-[54px] rounded-[14px] bg-blue-200 flex items-center justify-center text-[20px] font-semibold text-blue-500">
            {participantes ?? 0}
          </div>
        </div>
        {/* Horas */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-sm text-slate-500 font-normal text-center leading-tight">Horas</span>
          <div className="w-[54px] h-[54px] rounded-[14px] bg-yellow-100 flex items-center justify-center text-[18px] font-semibold text-yellow-600">
            {horas ?? 0}
          </div>
        </div>
        {/* Consentimientos */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-sm text-slate-500 font-normal text-center leading-tight">Consetimientos</span>
          <div className="w-[54px] h-[54px] rounded-[14px] bg-green-200 flex items-center justify-center text-[20px] font-semibold text-green-600">
            {consentCount}
          </div>
        </div>
        {/* Archivos */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-sm text-slate-500 font-normal text-center leading-tight">Archivos</span>
          <div className="w-[54px] h-[54px] rounded-[14px] bg-red-200 flex items-center justify-center text-[20px] font-semibold text-red-400">
            {archivoCount}
          </div>
        </div>
      </div>

      {/* Notas y Pendientes */}
      <div className="pt-3 pb-2">
        <p className="text-[14px] font-semibold text-slate-900 mb-0.5">Notas Y Pendientes</p>
        <p className="text-[13px] text-slate-500 whitespace-pre-line">
          {notes || "No se agregaron notas."}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={onBack}
          className="text-slate-400 text-[14px] font-medium px-2 py-2"
        >
          Atrás
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`bg-sky-400 text-white text-[14px] font-semibold px-7 py-3 rounded-full transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-sky-500'}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Enviando...
            </span>
          ) : (
            'Enviar'
          )}
        </button>
      </div>
      {submitError && (
        <p className="text-sm text-red-600 mt-4 text-center">{submitError}</p>
      )}

      </FadeSection>

    </div>
  )
}