import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SistematizacionCard from "../components/Sistematizacioncard"
import Stats from "../components/Stats"
import { getSistematizaciones } from "../services/api"
import FadeSection from "../components/FadeSection"
import SistematizacionModal from "../components/SistematizacionModal"


const PAGE_SIZE = 6

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [activeTab, setActiveTab] = useState("sistematizaciones")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [orderBy, setOrderBy] = useState("recientes")

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getSistematizaciones()
        if (!mounted) return
        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err?.message || "Error cargando sistematizaciones")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  function handlePrint(item) {
    window.print()
  }

  const filtered = items.filter(it => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      it.actividad?.toLowerCase().includes(q) ||
      it.nombre?.toLowerCase().includes(q) ||
      it.comunidad?.toLowerCase().includes(q)
    )
  })

  // Ordenamiento
  function getDateValue(it) {
    const keys = ["fecha", "fechaPublicacion", "createdAt", "created_at", "fecha_publicacion"]
    for (const k of keys) {
      if (it[k]) return new Date(it[k]).getTime() || 0
    }
    return 0
  }

  const sorted = [...filtered].sort((a, b) => {
    if (orderBy === "recientes") {
      return getDateValue(b) - getDateValue(a)
    }
    if (orderBy === "antiguos") {
      return getDateValue(a) - getDateValue(b)
    }
    if (orderBy === "nombre") {
      return (a.nombre || "").localeCompare(b.nombre || "")
    }
    if (orderBy === "actividad") {
      return (a.actividad || "").localeCompare(b.actividad || "")
    }
    return 0
  })

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paginated = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const modalItem = selectedIndex != null ? sorted[selectedIndex] : null

  // Reset page when search changes
  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(0)
  }

  return (
    <div className="min-h-screen bg-cyan-50 flex flex-col items-center font-google p-6 md:p-10">
      <div className="w-full max-w-5xl">

        {/* Encabezado */}
        <div className="mb-6 pt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-normal text-gray-800 mb-2">
              ¡Hola <span className="text-sky-500">TCU-782</span>!
            </h1>
            <p className="text-gray-500 text-lg">
              Aqui podrás ver e imprimir todas las sistematizaciones del tcu
            </p>
          </div>

          <div className="mt-2">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-sky-600 hover:underline">
              ← Volver al formulario
            </Link>
          </div>
        </div>

        {/* Rectángulo blanco */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">

          {/* Fila superior: tabs + buscador */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
            <div className="flex gap-8 flex-wrap">
              <button
                onClick={() => setActiveTab("sistematizaciones")}
                className={`text-md font-medium pb-2 transition-all ${
                  activeTab === "sistematizaciones"
                    ? "text-green-700 border-b-2 border-green-700"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Sistematizaciones
                <span className="ml-2 bg-gray-100 text-gray-500 text-sm font-semibold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("estadisticas")}
                className={`text-md font-medium pb-1 transition-all mx-1.5 ${
                  activeTab === "estadisticas"
                    ? "text-green-700 border-b-2 border-green-700"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Estadísticas
              </button>
            </div>

            <div className="w-full md:flex-1">
              <input
                type="text"
                placeholder="Buscar actividad..."
                value={search}
                onChange={handleSearch}
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Ordenar por */}
          <div className="flex items-center gap-2 mb-6 flex-wrap sm:flex-nowrap">
            <label className="text-sm text-gray-600 mr-2">Ordenar por</label>
            <select
              value={orderBy}
              onChange={(e) => {
                setOrderBy(e.target.value)
                setPage(0)
              }}
              className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none"
            >
              <option value="recientes">Más recientes</option>
              <option value="antiguos">Más antiguos</option>
              <option value="nombre">Nombre (A–Z)</option>
              <option value="actividad">Actividad (A–Z)</option>
            </select>
          </div>

          {/* Área de cards */}
          {activeTab === "estadisticas" ? (
            <Stats items={sorted} loading={loading} error={error} />
          ) : loading ? (
            <p className="text-sm text-gray-400 py-16 text-center">Cargando sistematizaciones...</p>
          ) : error ? (
            <p className="text-sm text-red-500 py-16 text-center">{error}</p>
          ) : sorted.length === 0 ? (
            <p className="text-sm text-gray-400 py-16 text-center">No hay sistematizaciones disponibles.</p>
          ) : (
            <>
              <FadeSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginated.map((it, i) => {
                  const globalIndex = page * PAGE_SIZE + i
                  return (
                    <SistematizacionCard
                      key={it._id || it.id || i}
                      item={it}
                      isSelected={globalIndex === selectedIndex}
                      onClick={() => setSelectedIndex(globalIndex)}
                      onPrint={handlePrint}
                    />
                  )
                })}
              </FadeSection>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-4 border-t border-gray-100 gap-3">
                  <span className="text-xs text-gray-400">
                    Mostrando {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sorted.length)} de {sorted.length}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="px-3 py-1 text-xs rounded-full border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition"
                    >
                      ← Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPage(idx)}
                        className={`w-8 h-8 text-sm rounded-full border transition ${
                          idx === page
                            ? "bg-green-800 text-white border-green-800"
                            : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={page === totalPages - 1}
                      className="px-3 py-1 text-xs rounded-full border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition"
                    >
                      Siguiente →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
        {modalItem && (
          <SistematizacionModal item={modalItem} onClose={() => setSelectedIndex(null)} />
        )}
      </div>
    </div>
  )
}