const mongoose = require('mongoose')

const arrivalSchema = new mongoose.Schema(
    {
        licensePlate: {
            type: String,
            required: true,
            index: true,
        },
        arrivalTime: {
            type: Date,
            required: true,
        },
        hasDeparture: {
            type: Boolean,
            default: false,
        }
    },
    { 
        timestamps: true 
    },
)

const Arrival = mongoose.model('Arrival', arrivalSchema)

module.exports = Arrival