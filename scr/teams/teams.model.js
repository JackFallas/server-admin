'use strict';

import { Schema, model } from "mongoose";

const teamSchema = new Schema({
    teamName: { 
        type: String, 
        required: [true, 'El nombre del equipo es obligatorio'],
        unique: true,
        trim: true,
        maxLength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    logo: {
        type: String,
        default: 'teams/default_logo'
    },
    captain: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'El equipo debe tener un capitán'] 
    },
    players: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, { timestamps: true });

export default model('Team', teamSchema);