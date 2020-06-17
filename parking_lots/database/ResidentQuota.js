const mongoose = require('mongoose')

const residentQuotaSchema = new mongoose.Schema(
    {
        licensePlate: {
            type: String,
            required: true,
            index: true,
        },
        quota: {
            type: Number,
            required: true,
            default: 0
        },
    },
    { 
        timestamps: true 
    },
)

const ResidentQuota = mongoose.model('ResidentQuota', residentQuotaSchema)

module.exports = ResidentQuota