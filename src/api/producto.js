import axios from './axios';

export const getProductoRequest = () => axios.get('/producto')
export const createProductoRequest = (producto) => axios.post('/producto', producto)