const mongoose = require('mongoose')

const parkingFeeSchema = new mongoose.Schema(
    {
        automobileType: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        fee: {
            type: Number,
            default: 0.0
        },
    },
    { 
        timestamps: true 
    },
)

const ParkingFee = mongoose.model('ParkingFee', parkingFeeSchema)

module.exports = ParkingFee