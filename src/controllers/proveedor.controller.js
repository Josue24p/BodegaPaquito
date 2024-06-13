import {getConnection, sql} from '../database/connection.js';

export const getProveedor = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query("Select * from proveedor")
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al obtener los datos'
        })
    }
}