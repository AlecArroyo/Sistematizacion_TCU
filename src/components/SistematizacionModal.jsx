import { useEffect } from "react"
import { Printer, X, Video, FileText, StickyNote, CheckCircle, XCircle } from "lucide-react"
import { printSistematizacion } from "./Printview"

const COMMUNITY_COLORS = {
  "Isla Venado": { bg: "#ede9fe", text: "#6d28d9" },
  "Chomes":      { bg: "#d1fae5", text: "#065f46" },
  "Lepanto":     { bg: "#fef9c3", text: "#854d0e" },
  "Pitaya":      { bg: "#fef9c3", text: "#854d0e" },
  "Paquera":     { bg: "#dbeafe", text: "#1e40af" },
  default:       { bg: "#f3f4f6", text: "#374151" },
}

// Campos que se manejan explícitamente — no se muestran en el bloque genérico
const KNOWN_FIELDS = new Set([
  "_id", "id", "actividad", "nombre", "comunidad",
  "fecha", "participantes", "horas",
  "distrito", "poblacion",
  "audiosVideos", "consentimientos", "notas",
])

function CommunityBadge({ comunidad }) {
  const colors = COMMUNITY_COLORS[comunidad] ?? COMMUNITY_COLORS.default
  return (
    <span
      style={{ backgroundColor: colors.bg, color: colors.text }}
      className="inline-block text-xs font-medium px-3 py-1 rounded-full"
    >
      {comunidad}
    </span>
  )
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

// Etiqueta pequeña de sección
function SectionLabel({ children }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1.5">
      {children}
    </p>
  )
}

// Bloque con fondo gris suave para secciones secundarias
function SectionBlock({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3 bg-gray-50 rounded-xl px-4 py-3">
      {Icon && <Icon size={16} className="mt-0.5 text-gray-400 shrink-0" />}
      <div className="flex-1 min-w-0">
        <SectionLabel>{label}</SectionLabel>
        {children}
      </div>
    </div>
  )
}

// Render del objeto audiosVideos
function AudiosVideosSection({ data }) {
  if (!data) return null
  const { recopilado, items = [] } = data

  return (
    <SectionBlock icon={Video} label="Audios y videos">
      {!recopilado || items.length === 0 ? (
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <XCircle size={14} className="text-gray-400" />
          No se recopiló material audiovisual.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((it, i) => {
            const title = it.titulo || it.nombre || it.descripcion || `Ítem ${i + 1}`
            const owner = it.quien || it.quienTiene || it.propietario || it.owner || it.responsable || it.usuario || it.encargado || it.persona || 'Desconocido'

            return (
              <details key={i} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                <summary className="flex items-center gap-2 px-3 py-2 cursor-pointer list-none">
                  <CheckCircle size={13} className="text-green-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-800 truncate">{title}</div>
                    <div className="text-xs text-gray-400 truncate">Por: {owner}</div>
                  </div>
                </summary>

                <div className="px-3 pb-3 pt-1 text-sm text-gray-700">
                  {it.descripcion && <p className="mb-1 text-sm text-gray-700">{it.descripcion}</p>}
                  {it.archivo && (
                    <p className="text-sm text-gray-700">Archivo: <span className="font-medium">{it.archivo}</span></p>
                  )}
                  {it.url && (
                    <p className="mt-1"><a href={it.url} target="_blank" rel="noreferrer" className="text-sky-600 underline">Ver archivo</a></p>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      )}
    </SectionBlock>
  )
}

// Render del objeto consentimientos
function ConsentimientosSection({ data }) {
  if (!data) return null
  const { tiene, personas = [] } = data

  return (
    <SectionBlock icon={FileText} label="Consentimientos">
      {!tiene || personas.length === 0 ? (
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <XCircle size={14} className="text-gray-400" />
          No hay consentimientos registrados.
        </div>
      ) : (
        <div className="space-y-1.5">
          {personas.map((p, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-700">{p.nombre || `Persona ${i + 1}`}</span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                {p.cantidad} {p.cantidad === 1 ? "consentimiento" : "consentimientos"}
              </span>
            </div>
          ))}
        </div>
      )}
    </SectionBlock>
  )
}

// Campos extra desconocidos (por si se añaden nuevos campos al modelo en el futuro)
function ExtraField({ label, value }) {
  const display = typeof value === "object"
    ? JSON.stringify(value, null, 2)
    : String(value ?? "")

  return (
    <div>
      <p className="text-xs text-gray-400 mb-0.5 capitalize">{label}</p>
      <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">{display}</p>
    </div>
  )
}

export default function SistematizacionModal({ item = {}, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function onKey(e) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  if (!item) return null

  const {
    actividad, nombre, comunidad, fecha,
    participantes, horas,
    distrito, poblacion,
    audiosVideos, consentimientos, notas,
    ...rest
  } = item

  // Filtrar campos del sistema y ya manejados
  const extraEntries = Object.entries(rest).filter(([k]) => !KNOWN_FIELDS.has(k))

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl m-0 sm:m-6 max-h-[92vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-sky-600 leading-snug truncate">
              {actividad || "Sin actividad"}
            </h2>
            {fecha && (
              <p className="text-xs text-gray-400 mt-0.5">{formatFecha(fecha)}</p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => printSistematizacion(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
            >
              <Printer size={13} /> Imprimir
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 space-y-5">

          {/* Fila: Nombre + Comunidad */}
          <div className="grid grid-cols-2 gap-4">
            {nombre && (
              <div>
                <SectionLabel>Responsable</SectionLabel>
                <p className="text-sm text-gray-800">{nombre}</p>
              </div>
            )}
            {comunidad && (
              <div>
                <SectionLabel>Comunidad</SectionLabel>
                <CommunityBadge comunidad={comunidad} />
              </div>
            )}
            {distrito !== undefined && (
              <div>
                <SectionLabel>Distrito</SectionLabel>
                <p className="text-sm text-gray-700">{distrito ? String(distrito) : "Por asignar"}</p>
              </div>
            )}
            {poblacion !== undefined && (
              <div>
                <SectionLabel>Población</SectionLabel>
                {Array.isArray(poblacion) && poblacion.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {poblacion.map((t, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">{String(t)}</span>
                    ))}
                  </div>
                ) : (typeof poblacion === 'string' && poblacion ? (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">{poblacion}</span>
                ) : (
                  <p className="text-sm text-gray-700">No registrada</p>
                ))}
              </div>
            )}
          </div>

          {/* Fila: Participantes + Horas */}
          {(participantes != null || horas != null) && (
            <div className="grid grid-cols-2 gap-4">
              {participantes != null && (
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                  <p className="text-2xl font-semibold text-gray-800">{participantes}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Participantes</p>
                </div>
              )}
              {horas != null && (
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                  <p className="text-2xl font-semibold text-gray-800">{horas}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Horas</p>
                </div>
              )}
            </div>
          )}

          {/* Audios y videos */}
          {audiosVideos && <AudiosVideosSection data={audiosVideos} />}

          {/* Consentimientos */}
          {consentimientos && <ConsentimientosSection data={consentimientos} />}

          {/* Notas */}
          {notas && (
            <SectionBlock icon={StickyNote} label="Notas">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{notas}</p>
            </SectionBlock>
          )}

          {/* Campos extra desconocidos */}
          {extraEntries.length > 0 && (
            <div className="space-y-3 border-t border-gray-100 pt-4">
              {extraEntries.map(([k, v]) => (
                <ExtraField key={k} label={k} value={v} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 sm:px-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}