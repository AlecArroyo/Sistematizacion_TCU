import { useState, useEffect } from "react"
import { obtenerEstudiantes } from "../services/api"

let cache = null
let inflightPromise = null

function normalizarNombre(estudiante) {
  return `${estudiante?.nombre ?? ""} ${estudiante?.apellido1 ?? ""} ${estudiante?.apellido2 ?? ""}`
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('es')
}

function ordenarEstudiantes(estudiantes) {
  return [...estudiantes].sort((a, b) => normalizarNombre(a).localeCompare(normalizarNombre(b), 'es', { sensitivity: 'base' }))
}

function fetchEstudiantes() {
  if (cache) return Promise.resolve(cache)
  if (!inflightPromise) {
    inflightPromise = obtenerEstudiantes()
      .then(data => {
        cache = ordenarEstudiantes(data.filter(e => e.isActive)) // solo activos y ordenados
        return cache
      })
      .catch(err => {
        inflightPromise = null // permite reintentar si falló
        throw err
      })
  }
  return inflightPromise
}

export default function useEstudiantes() {
  const [estudiantes, setEstudiantes] = useState(cache || [])
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cache) return // ya está en memoria, no hace falta nada más
    let active = true
    fetchEstudiantes()
      .then(data => { if (active) setEstudiantes(ordenarEstudiantes(data)) })
      .catch(err => { if (active) setError(err) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return { estudiantes, loading, error }
}