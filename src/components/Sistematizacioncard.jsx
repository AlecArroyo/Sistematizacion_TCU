import { Printer } from "lucide-react"
import { printSistematizacion } from "./Printview"

const DISTRICT_COLORS = {
  "Isla Venado":  { bg: "#ede9fe", text: "#6d28d9" }, // violeta
  "Chomes": { bg: "#d1fae5", text: "#065f46" },        // esmeralda
  "Lepanto": { bg: "#fef9c3", text: "#854d0e" },       // amarillo
  "Pitaya": { bg: "#fef9c3", text: "#854d0e" },        // amarillo
  "Paquera": { bg: "#dbeafe", text: "#1e40af" },       // azul
  "Puntarenas": { bg: "#FFC096", text: "#823500" },    // naranja
  "Barranca": { bg: "#fee2e2", text: "#991b1b" },      // naranja

  // --- Nuevos, para los que faltaban ---
  "Pitahaya": { bg: "#fef3c7", text: "#92400e" },       // ámbar
  "Manzanillo": { bg: "#ecfccb", text: "#3f6212" },     // lima
  "Cóbano": { bg: "#ccfbf1", text: "#115e59" },         // teal
  "Chacarita": { bg: "#cffafe", text: "#155e75" },      // cyan
  "Chira": { bg: "#e0f2fe", text: "#075985" },          // sky
  "El Roble": { bg: "#e0e7ff", text: "#3730a3" },       // índigo
  "Espíritu Santo": { bg: "#f3e8ff", text: "#6b21a8" }, // púrpura
  "Caldera": { bg: "#fae8ff", text: "#86198f" },        // fucsia
  "Quepos": { bg: "#fce7f3", text: "#9d174d" },         // rosado
  "Parrita": { bg: "#ffe4e6", text: "#9f1239" },        // rose
  "Jacó": { bg: "#fee2e2", text: "#991b1b" },           // rojo
  "Tárcoles": { bg: "#ffedd5", text: "#9a3412" },       // naranja claro
  "Orotina": { bg: "#f5f5f4", text: "#44403c" },        // piedra/gris

  default: { bg: "#f3f4f6", text: "#374151" },
}

function DistrictBadge({ distrito }) {
  const colors = DISTRICT_COLORS[distrito] ?? DISTRICT_COLORS.default

  return (
    <span
      style={{ backgroundColor: colors.bg, color: colors.text }}
      className="self-start w-fit text-xs font-medium px-4 py-1 rounded-full"
    >
      {distrito}
    </span>
  )
}

export default function SistematizacionCard({
  item = {},
  isSelected = false,
  onClick,
}) {
  const {
    actividad = "Sin actividad",
    nombre = "",
    distrito = "",
    fecha = "",
    participantes,
    horas,
    comunidad,
  } = item

  function handlePrint(e) {
    e.stopPropagation()
    printSistematizacion(item)
  }

  function formatFecha(f) {
    if (!f) return ""

    const d = new Date(f)
    if (isNaN(d)) return f

    const useUTC = typeof f === 'string' && /T.*Z$/.test(f)
    const options = { day: "numeric", month: "long", year: "numeric" }
    if (useUTC) options.timeZone = 'UTC'
    return d.toLocaleDateString("es-CR", options)
  }

  return (
    <div
      onClick={onClick}
      className={[
        "relative bg-white rounded-2xl border cursor-pointer select-none",
        "transition-all duration-200  hover:bg-neutral-100 active:scale-[0.985]",
        "p-5 flex flex-col gap-3",
        isSelected
          ? "border-sky-400 ring-2 ring-sky-200 shadow-sm"
          : "border-gray-400",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          {fecha && (
            <span className="text-xs uppercase tracking-wide text-gray-400 font-medium">
              {formatFecha(fecha)}
            </span>
          )}

          <h3 className="text-sm font-semibold text-sky-600 mt-1">
            {actividad}
          </h3>
        </div>

        <button
          onClick={handlePrint}
          title="Imprimir"
          className="shrink-0 text-gray-400 hover:text-sky-400 transition-colors mt-1"
        >
          <Printer size={19} strokeWidth={2} />
        </button>
      </div>

      {/* Nombre */}
      {nombre && (
        <p className="text-xs text-gray-700 font-semibold">
          {nombre}
        </p>
      )}

      {/* Distrito (tag) */}
      {distrito && <DistrictBadge distrito={distrito} />}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 pt-1">
        {participantes != null && (
          <span>{participantes} Participantes</span>
        )}

        {participantes != null && horas != null && (
          <span className="text-gray-500">·</span>
        )}

        {horas != null && (
          <span>{horas} Horas ·</span>
        )}
         {horas != null && (
          <span>{comunidad} </span>
        )}
               

      </div>
    </div>
  )
}