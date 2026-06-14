import StepBar from "./StepBar"
import FadeSection from "./FadeSection"

export default function Step8({ currentStep, totalSteps, onRestart }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 w-full max-w-md sm:max-w-xl mx-auto shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-full bg-sky-400 flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold tracking-wide">UCR</span>
        </div>
        <StepBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <FadeSection>
        <p className="text-[10px] font-bold tracking-[0.14em] text-sky-400 uppercase mb-1">
          sistematización TCU-782
        </p>
        <h1 className="text-3xl font-normal text-slate-900 leading-tight">Enviado con éxito</h1>
        <p className="text-sm text-slate-500 mt-1.5 mb-6 leading-snug">
          La sistematización ha sido registrada correctamente. Gracias por completar el formulario.
        </p>

        <div className="rounded-3xl bg-slate-50 border border-slate-100 p-5 mb-6">
          <p className="text-sm text-slate-700 font-medium">Resumen enviado</p>
          <p className="text-sm text-slate-500 mt-2">
            Tu información fue enviada y ahora forma parte del registro.
          </p>
        </div>

        <div className="flex items-center justify-end mt-4">
          <button
            onClick={onRestart}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-full"
          >
            Registrar otra
          </button>
        </div>
      </FadeSection>
    </div>
  )
}
