const mongoose = require('mongoose')

const officialLogSchema = new mongoose.Schema(
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
        departureTime: {
            type: Date,
            required: true,
        },
    },
    { 
        timestamps: true 
    },
)

const OfficialLog = mongoose.model('OfficialLog', officialLogSchema)

module.exports = OfficialLog