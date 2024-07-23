import axios from './axios';

export const getProductoRequest = () => axios.get('/producto')
export const createProductoRequest = (producto) => axios.post('/producto', producto)

export const updateProductoRequest = (id, producto) => axios.put(`/producto/${id}`, producto)

export const deleteProductoRequest = (id) => axios.delete(`/producto/${id}`)