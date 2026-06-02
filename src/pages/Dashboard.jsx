import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FadeSection from "../components/FadeSection"
import StepBar from "../components/StepBar"
import { getSistematizaciones } from "../services/api"

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getSistematizaciones()
        if (!mounted) return
        setItems(Array.isArray(data) ? data : [])
        setSelectedIndex(0)
      } catch (err) {
        setError(err?.message || "Error cargando sistematizaciones")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  const selected = items[selectedIndex]

  return (
    <div className="min-h-screen bg-cyan-100 flex flex-col items-center font-google p-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Dashboard — Sistematizaciones</h1>
          <Link to="/" className="text-sky-600 hover:underline">Volver al formulario</Link>
        </div>

        <FadeSection className="mb-4">
          <div className="bg-white rounded-lg p-4 shadow">
            {loading ? (
              <p>Cargando sistematizaciones...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : items.length === 0 ? (
              <p>No hay sistematizaciones disponibles.</p>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <StepBar currentStep={selectedIndex} totalSteps={items.length} />
                  <div className="text-sm text-gray-600">{selectedIndex + 1} / {items.length}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {items.map((it, i) => (
                    <button
                      key={it.id || i}
                      onClick={() => setSelectedIndex(i)}
                      className={`text-left p-3 rounded border transition-shadow duration-150 bg-gray-50 hover:shadow-md ${i === selectedIndex ? "ring-2 ring-sky-300" : ""}`}
                    >
                      <div className="font-medium">{it.nombre || "Sin nombre"}</div>
                      <div className="text-xs text-gray-500">{it.comunidad || "Sin comunidad"}</div>
                      <div className="text-xs text-gray-400 mt-1">{it.fecha || "Sin fecha"}</div>
                    </button>
                  ))}
                </div>

                {selected && (
                  <div className="mt-4 bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">Detalles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                      <div><strong>Actividad:</strong> {selected.actividad || "-"}</div>
                      <div><strong>Horas:</strong> {selected.horas ?? "-"}</div>
                      <div><strong>Participantes:</strong> {selected.participantes ?? "-"}</div>
                      <div><strong>Comunidad:</strong> {selected.comunidad || "-"}</div>
                      <div className="md:col-span-2"><strong>Notas:</strong> {selected.notas || "-"}</div>
                    </div>

                    <div className="mt-3">
                      <h3 className="font-medium">Audios / Videos</h3>
                      <div className="text-sm text-gray-600">
                        {selected.audiosVideos?.items?.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {selected.audiosVideos.items.map((m, idx) => (
                              <li key={idx}>{m.titulo} — {m.propietario}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-xs">No hay medios registrados</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <h3 className="font-medium">Consentimientos</h3>
                      <div className="text-sm text-gray-600">
                        {selected.consentimientos?.personas?.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {selected.consentimientos.personas.map((c, idx) => (
                              <li key={idx}>{c.nombre} — {c.cantidad}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-xs">No hay consentimientos registrados</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </FadeSection>
      </div>
    </div>
  )
}
