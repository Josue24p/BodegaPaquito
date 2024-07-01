import axios from './axios';

export const getEntradaProductRequest = () => axios.get('/nuevoProducto')
export const createEntradaProductRequest = (entradaP) => axios.post('/nuevoProducto',entradaP)