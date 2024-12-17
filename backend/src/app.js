import express from "express";
import config from "./config";

import routes from './routes/movies.routes'

const app = express();

// Configuracion
app.set('port', config.port);

// // Midlewars   
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(routes);

export default app;