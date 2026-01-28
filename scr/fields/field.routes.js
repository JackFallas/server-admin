// importar las dependencias 

import { Router } from "express";
import { geFields } from "./field.controller.js";

const router = Router();

// Rutas GET
router.get('/', geFields);

// Rutas POST


// Rutas PUT


// Rutas DELETE

export default router;