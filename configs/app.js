'use strict';

// Imporatacioens
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOption } from './Cors-configuration.js';

const BASE_URL = '/kinalSportAdmin/v1';

// Configuracion de los middlewares
// Confiruracion de mi aplicacion
// Se almacena en una funciona paar que pueda ser exportada y usada al crear la instancia e la aplicacion
const middlewares = (app) => {
    // Configuracion para el limite de tamaño de las peticiones y el permitirlas
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    // Configuracion para el parseo de JSON (le dice a app que puede usar json con limite de 10mb)
    app.use(express.json({ limit: '10mb' }));
    // Configuracion de CORS
    app.use(cors(corsOption));
    // Configuracion de Morgan para el logueo de peticiones HTTP (usar el morgan en modo desarrollador)
    app.use(morgan('dev'));
}

// Funcion para iniciar el servidor
const initServer = async (app) => {
    // Crreacion de la instancia de la aplicacion
    app = express();
    const PORT = process.env.PORT || 3001;
    try {
        // Configuracion de los middlewares (Mi aplicacion)
        middlewares(app);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`URL base: http://localhost:${PORT}${BASE_URL}`);
        });

        // Primera ruta 
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json(
                {
                    statys: 'ok',
                    service: 'Kinal Sport Admin',
                    version: '1.0.0'
                }
            );
        });
    } catch (error) {
        console.log(error);  
    }
}

export { initServer };
