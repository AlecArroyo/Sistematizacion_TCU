import axios from 'axios';

const API = axios.create({
  baseURL: 'https://sistematizacion-web-api.azurewebsites.net/api'
});

// GET - obtener todas
export const getSistematizaciones = async () => {
  const { data } = await API.get('/sistematizacion');
  return data;
};

// GET - obtener una por ID
export const getSistematizacion = async (id) => {
  const { data } = await API.get(`/sistematizacion/${id}`);
  return data;
};

// POST - crear
export const crearSistematizacion = async (sistematizacion) => {
  const { data } = await API.post('/sistematizacion', sistematizacion);
  return data;
};

// PUT - actualizar
export const actualizarSistematizacion = async (id, sistematizacion) => {
  const { data } = await API.put(`/sistematizacion/${id}`, sistematizacion);
  return data;
};

// DELETE - eliminar
export const eliminarSistematizacion = async (id) => {
  await API.delete(`/sistematizacion/${id}`);
};