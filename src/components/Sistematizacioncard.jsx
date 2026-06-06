import { Printer } from "lucide-react"
import { printSistematizacion } from "./Printview"

const COMMUNITY_COLORS = {
  "Isla Venado": { bg: "#d1fae5", text: "#065f46" },
  "Chomes":      { bg: "#d1fae5", text: "#065f46" },
  "Lepanto":     { bg: "#fef9c3", text: "#854d0e" },
  "Pitaya":      { bg: "#fef9c3", text: "#854d0e" },
  "Paquera":     { bg: "#dbeafe", text: "#1e40af" },
  "default":     { bg: "#f3f4f6", text: "#374151" },
}

function CommunityBadge({ comunidad }) {
  const colors = COMMUNITY_COLORS[comunidad] ?? COMMUNITY_COLORS.default
  return (
    <span
      style={{ backgroundColor: colors.bg, color: colors.text }}
      className="self-start w-fit text-xs font-medium px-4 py-1 rounded-full"
    >
      {comunidad}
    </span>
  )
}

export default function SistematizacionCard({ item = {}, isSelected = false, onClick, onPrint }) {
  const {
    actividad    = "Sin actividad",
    nombre       = "",
    comunidad    = "",
    fecha        = "",
    participantes,
    horas,
  } = item

  function handlePrint(e) {
    e.stopPropagation()
    printSistematizacion(item)
  }

  function formatFecha(f) {
    if (!f) return ""
    const d = new Date(f)
    if (isNaN(d)) return f
    return d.toLocaleDateString("es-CR", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div onClick={onClick}
      className={[
        "relative bg-white rounded-2xl border cursor-pointer select-none",
        "transition-all duration-200 hover:shadow-md active:scale-[0.985]",
        "p-5 flex flex-col gap-3",
        isSelected
          ? "border-sky-400 ring-2 ring-sky-200 shadow-sm"
          : "border-gray-400",
      ].join(" ")}
    >
      {/* Header: actividad + botón imprimir */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-md font-semibold text-sky-500">
          {actividad}
        </h3>
        <div>
          <button
            onClick={handlePrint}
            title="Imprimir"
            className="shrink-0 text-gray-400 hover:text-sky-400 transition-colors mt-1"
          >
            <Printer size={22} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Nombre */}
      {nombre && (
        <p className="text-sm text-gray-600 -mt-1">{nombre}</p>
      )}

      {/* Badge comunidad */}
      {comunidad && <CommunityBadge comunidad={comunidad} />}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer: participantes · fecha · horas */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 pt-1 border-t border-gray-100">
        {participantes != null && (
          <span>{participantes} Participantes</span>
        )}
        {participantes != null && fecha && (
          <span className="text-gray-500">·</span>
        )}
        {fecha && (
          <span className="font-bold text-green-800">
            {formatFecha(fecha)}
          </span>
        )}
        {(participantes != null || fecha) && horas != null && (
          <span className="text-gray-500">·</span>
        )}
        {horas != null && (
          <span>{horas} Horas</span>
        )}
      </div>
    </div>
  )
}