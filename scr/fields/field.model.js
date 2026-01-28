'use strict';

// Imporatacioens
import mongoose from "mongoose";

export const fieldSchema = new mongoose.Schema({
    fieldName: { 
        type: String, 
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del campo no puede exceder los 100 caracteres'],
    },
    fieldType: { 
        type: String, 
        required: [true, 'El tipo de campo es obligatorio'],
        enum: {
            values: ['NATURAL', 'SINTETICA', 'CONCRETO'],
            message: 'Tipo de superficie no valida'
        }
    },
    capacity: { 
        type: String, 
        required: [true, 'La capacidad del campo es obligatoria'],
        enum: {
            values: ['FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11'],
            message: 'Capacidad no valida',
        }
    },
    pricePerHour: { 
        type: Number, 
        required: [true, 'El precio por hora es obligatorio'],
        min: [0, 'El precio debe ser mayor a 0'],
    },
    description: { 
        type: String, 
        trim: true,
        maxLength: [500, 'La descripcion no puede exceder los 500 caracteres'],
    },
    photo: { 
        type: String,
        default: 'fields/kinal_sport_nyvo5',
    },
    isActive: { 
        type: Boolean, 
        default: true,
    }
});

// Indices para optimizar consultas  o las busquedas
fieldSchema.index({isActive: 1});
fieldSchema.index({fieldName: 1});
fieldSchema.index({isActive: 1, fieldName: 1});

// Modelo basado en el schema
const Field = mongoose.model('Field', fieldSchema);

export default Field;