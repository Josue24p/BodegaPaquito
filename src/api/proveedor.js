import axios from './axios'
export const getProveedorRequest = () => axios.get('/proveedor')
export const createProveedorRequest = (provedors) => axios.post('/proveedor', provedors)