'use strict';

import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    date: { 
        type: Date,
        required: [true, 'La fecha de la reservacion es obligatoria'],
    },
    timeSlot: {
        type: String,
        required: [true, 'El horario de la reservacion es obligatorio'],
        enum: {
            values: ['08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'],
            message: 'Horario no valido',
        }
    },
    field: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: [true, 'La cancha es obligatorio'],
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'El precio total es obligatorio'],
        min: [0, 'El precio debe ser mayor a 0'],
    },
    status: {
        type: String,
        enum:['PENDIENTE', 'CONFIRMADO', 'CANCELADO'],
        default: 'PENDIENTE',
    },
}, { timestamps: true });

export default model('Reservation', reservationSchema);
        