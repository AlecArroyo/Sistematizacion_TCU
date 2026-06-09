import React from "react"

export default function Stats({ items = [], loading = false, error = null }) {
  const total = items.length

  // Horas acumuladas y promedio de horas
  const totalHorasAcumuladas = items.reduce((sum, it) => sum + (parseFloat(it.horas) || 0), 0)
  const promedioHoras = total > 0 ? (totalHorasAcumuladas / total).toFixed(2) : 0

  // Participantes promedio por gira
  const totalParticipantes = items.reduce((sum, it) => sum + (parseFloat(it.participantes) || 0), 0)
  const promedioParticipantes = total > 0 ? (totalParticipantes / total).toFixed(2) : 0

  // Comunidades: conteo y top
  const communityCounts = items.reduce((acc, it) => {
    const c = (it.comunidad || "Sin comunidad").trim()
    acc[c] = (acc[c] || 0) + 1
    return acc
  }, {})
  const topCommunities = Object.entries(communityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  if (loading) {
    return <p className="text-sm text-gray-400 py-16 text-center">Cargando estadísticas...</p>
  }

  if (error) {
    return <p className="text-sm text-red-500 py-16 text-center">{error}</p>
  }

  if (items.length === 0) {
    return <p className="text-sm text-gray-400 py-16 text-center">No hay datos para generar estadísticas.</p>
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="text-sm text-gray-500">Total sistematizaciones</div>
          <div className="text-2xl font-semibold text-green-800">{total}</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
          <div className="text-sm text-gray-500">Promedio de horas</div>
          <div className="text-2xl font-semibold text-purple-800">{promedioHoras}</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-sm text-gray-500">Promedio participantes por gira</div>
          <div className="text-2xl font-semibold text-blue-800">{promedioParticipantes}</div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="text-sm text-gray-500">Horas acumuladas</div>
          <div className="text-2xl font-semibold text-yellow-800">{totalHorasAcumuladas}</div>
        </div>
      </div>
      
      {/* Tabla: Comunidades más visitadas */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Comunidades más visitadas</h3>
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs text-gray-500">
                <th className="py-2">Comunidad</th>
                <th className="py-2">Visitas</th>
              </tr>
            </thead>
            <tbody>
              {topCommunities.map(([name, count], idx) => (
                <tr key={name} className="border-t border-gray-50">
                  <td className="py-2 pr-4">{name}</td>
                  <td className="py-2 pr-4">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
