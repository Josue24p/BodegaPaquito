import axios from './axios';

export const getSalidaProductRequest = () => axios.get('/salidaProducto')

export const getSalidaById = (id) => axios.get(`/salidaProducto/${id}`)

export const createSalidaProdRequest = (salida) => axios.post('/salidaProducto',salida)

export const updateSalidaProdRequest = (id, salida) => axios.put(`/salidaProducto/${id}`, salida)

export const deleteSalidaProdRequest = (id) => axios.delete(`/salidaProducto/${id}`)