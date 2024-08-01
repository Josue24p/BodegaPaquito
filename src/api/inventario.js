import axios from './axios';

export const getInventarioRequest = () => axios.get('/inventario')

export const getInventarioByIdRequest = (id) => axios.get(`/inventario/${id}`)

export const createInventarioRequest = (inventario) => axios.post('/inventario', inventario)

export const updateInventarioRequest = (id, inventario) => axios.put(`/inventario/${id}`, inventario)

export const deleteInventarioRequest = (id) => axios.delete(`/inventario/${id}`)