import StepBar from "./StepBar"
import FadeSection from "./FadeSection";


export default function Step0({ currentStep, totalSteps, onNext }) {
  return (
    <FadeSection className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-11 h-11 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">UCR</span>
        </div>
        <StepBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase mb-1">
        Sistematización TCU-782
      </p>
      <h1 className="text-3xl font-normal text-gray-900 mb-6">
        ¿Listo para empezar la sistematización?
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        Antes de comenzar, asegúrate de tener a mano la información requerida.
        Podrás avanzar y regresar entre pasos según lo necesites.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-6">
        <button
          onClick={() => onNext({})}
          className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-6 py-2.5 rounded-full transition"
        >
          Sí, estoy listo
        </button>
      </div>
    </FadeSection>
  )
}
