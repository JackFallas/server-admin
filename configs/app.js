`use strict`;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { helmetConfiguration } from './helmet-configuration.js';
import { corsOption } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { requestLimit } from '../middlewares/request-limit.js';
 
 
import fieldRoutes from '../scr/fields/field.routes.js'
import { errorHandler } from '../middlewares/handle-errors.js';
 
const BASE_URL = '/kinalSportAdmin/v1';
 
// Configuracion de los middlewares (el orden es alamente importante)
// Se almacenan en una funcion para ser exportados y usados
const miiddlewares = (app) => {
    // Relizamos la implementacion de seguridad a nuestra app.
    app.use(helmet(helmetConfiguration));
    // Configuracion de CORS la cual se define en un archivo aparte y se importa, la cual permite definir los origenes permitidos
    app.use(cors(corsOption));
    // Permite el uso de formulario y su limite de tamaño es de 10mb
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    // Permite el uso de JSON y su limite de tamaño es de 10mb
    app.use(express.json({ limit: '10mb' }));
    // Configuracion de filtros de seguridad
    app.use(requestLimit);
    // Permite el uso de morgan en modo desarrollo
    app.use(morgan('dev'));
}
 
//Integracion de rutas
const routes = (app) => {
    app.use(`${BASE_URL}/fields`, fieldRoutes);
}
 
// Funcion para iniciar el servidor
const initServer = async (app) => {
    // Creacion de la instancia de la aplicacion
    app = express();
    const PORT = process.env.PORT || 3001;
    try {
        // Configuracion de los middlewares (Mi aplicacion)
        dbConnection();
        miiddlewares(app);
        routes(app);
        app.use(errorHandler)
 
        app.listen( PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`URL Base: http://localhost:${PORT}${BASE_URL}`);
        });
 
        app.get(`${BASE_URL}/HEAD`, (req, res) => {
            res.status(200).json({
                status: 'success',
                service: 'KinalSport Admin',
                version: '1.0.0'
             }
            );
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
       
    }
}
export { initServer};