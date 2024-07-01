import axios from './axios';

export const getSalidaProductRequest = () => axios.get('/salidaProducto')
export const createSalidaProdRequest = (salidaP) => axios.post('/salidaProducto',salidaP)