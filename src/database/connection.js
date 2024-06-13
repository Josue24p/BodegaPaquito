import sql from 'mssql';
import config from '../config.js';
const dbSettings = {
    user : config.dbUser,
    password : config.dbPassword,
    server : config.dbServer,
    database : config.dbDatabase,
    options :{
        encrypt: true,
        trustServerCertificate: true
    }
}

export const getConnection = async () =>{
    try {
      const pool  = await sql.connect(dbSettings);
      
     console.log("db is connected")
      return pool;
    } catch (error) {
        console.log(error)
    }
}
export {sql}
