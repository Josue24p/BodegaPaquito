import axios from './axios'

export const getProveedorRequest = () => axios.get('/proveedor')

export const getProveedorByIdRequest = (id) => axios.get(`/proveedor/${id}`)

export const createProveedorRequest = (provedors) => axios.post('/proveedor', provedors)

export const updateProveedorRequest = (id,provedors) => axios.put(`/proveedor/${id}`, provedors)

export const deleteProveedorRequest = (id) => axios.delete(`/proveedor/${id}`)