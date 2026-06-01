import { useState } from "react"
import StepBar from "./StepBar"
import FadeSection from "./FadeSection"

export default function Step6({ currentStep, totalSteps, onNext, onBack }) {
  const [notes, setNotes] = useState("")

  function handleNext() {
    onNext({ notes })
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

        <h1 className="text-3xl font-normal text-gray-900 mb-3">Notas y pendientes</h1>
        <p className="text-sm text-gray-600 mb-6">
          Anota los pendientes de la gira, observaciones y cualquier cosa que la profesora quisiese saber.
        </p>

        <textarea
          placeholder="Escribe aquí tus notas y pendientes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-2xl outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 resize-none"
        />
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
          Continuar
        </button>
      </div>
    </div>
  )
}
