import React from "react"

export default function Stats({ items = [], loading = false, error = null }) {
  const total = items.length

  const communities = Array.from(new Set(items.map(i => i.comunidad).filter(Boolean)))
  const uniqueCommunities = communities.length

  const activityCounts = items.reduce((acc, it) => {
    const a = (it.actividad || "Desconocida").trim()
    acc[a] = (acc[a] || 0) + 1
    return acc
  }, {})

  const topActivities = Object.entries(activityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="text-sm text-gray-500">Total sistematizaciones</div>
          <div className="text-2xl font-semibold text-green-800">{total}</div>
        </div>
        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-100">
          <div className="text-sm text-gray-500">Comunidades</div>
          <div className="text-2xl font-semibold text-cyan-800">{uniqueCommunities}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-500">Actividades distintas</div>
          <div className="text-2xl font-semibold text-gray-800">{Object.keys(activityCounts).length}</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Actividades más frecuentes</h3>
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            {topActivities.map(([name, count], idx) => (
              <li key={name} className="flex justify-between items-center">
                <span className="truncate mr-2">{name}</span>
                <span className="text-xs text-gray-500">{count}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Listado breve</h3>
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs text-gray-500">
                <th className="py-2">Nombre</th>
                <th className="py-2">Actividad</th>
                <th className="py-2">Comunidad</th>
              </tr>
            </thead>
            <tbody>
              {items.slice(0, 10).map((it, i) => (
                <tr key={it._id || it.id || i} className="border-t border-gray-50">
                  <td className="py-2 pr-4">{it.nombre || "—"}</td>
                  <td className="py-2 pr-4">{it.actividad || "—"}</td>
                  <td className="py-2">{it.comunidad || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
