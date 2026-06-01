export default function StepBar({ currentStep, totalSteps }) {
  return (
    <div className="flex gap-1.5 flex-1">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            i < currentStep ? "bg-sky-500" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  )
}