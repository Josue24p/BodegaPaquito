import axios from './axios';

export const getEntradaProductRequest = () => axios.get('/nuevoProducto')

export const getEntradaByIdRequest = (id) => axios.get(`/nuevoProducto/${id}`)

export const createEntradaProductRequest = (entrada) => axios.post('/nuevoProducto',entrada)

export const updateEntradaProductRequest = (id, entrada) => axios.put(`/nuevoProducto/${id}`, entrada)

export const deleteEntradaProductRequest = (id) => axios.delete(`/nuevoProducto/${id}`)