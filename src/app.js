import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import './database/connection.js';

import proveedorRoutes from './routes/proveedor.routes.js';


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(proveedorRoutes)


export default app