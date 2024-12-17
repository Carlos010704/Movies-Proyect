import sql from 'mssql';
import config from '../config';


const dbConfig = {
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

export async function getConnection() {
    const pool = await sql.connect(dbConfig);
    sql.connect(dbConfig)
        .then(() => console.log('Conexión exitosa!'))
        .catch(() => console.log('Error al conectar!'))

    return pool;
}

export {sql}