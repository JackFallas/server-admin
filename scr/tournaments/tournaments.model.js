'use strict';

import { Schema, model } from "mongoose";

const tournamentSchema = new Schema({
    tournamentName: { 
        type: String, 
        required: [true, 'El nombre del torneo es obligatorio'],
        trim: true 
    },
    description: { 
        type: String, 
        maxLength: [500, 'La descripción es muy larga'] 
    },
    startDate: { 
        type: Date, 
        required: [true, 'La fecha de inicio es obligatoria'] 
    },
    endDate: { 
        type: Date 
    },
    teams: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Team' 
    }],
    maxTeams: { 
        type: Number, 
        required: [true, 'Define el límite de equipos'],
        min: [2, 'Mínimo 2 equipos']
    },
    status: {
        type: String,
        enum: ['UPCOMING', 'IN_PROGRESS', 'FINISHED'],
        default: 'UPCOMING'
    }
}, { timestamps: true });

export default model('Tournament', tournamentSchema);