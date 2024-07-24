import axios from './axios';

export const getCategoriaRequest = () => axios.get('/categorias')

export const getCategoriaByIdRequest = (id) => axios.get(`/categorias/${id}`)

export const createCategoriaRequest = (categoria) => axios.post('/categorias', categoria)

export const updateCategoriaRequest = (id, categoria) => axios.put(`/categorias/${id}`, categoria)

export const deleteCategoriaRequest = (id) => axios.delete(`/categorias/${id}`)