import axios from './axios'

export const getClienteRequest = () => axios.get('/cliente')

export const getClienteByIdRequest = (id) => axios.get(`/cliente/${id}`)

export const createClienteRequest = (cliente) => axios.post('/cliente', cliente)

export const updateClienteRequest = (id,cliente) => axios.put(`/cliente/${id}`, cliente)

export const deleteClienteRequest = (id) => axios.delete(`/cliente/${id}`)