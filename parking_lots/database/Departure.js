const mongoose = require('mongoose')
const moment = require('moment')

const Automobile = require('../api/automobiles')

const departureSchema = new mongoose.Schema(
    {
        licensePlate: {
            type: String,
            required: true,
            index: true,
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

departureSchema.methods.handle = async function(arrivalRelated) {
    // Calculate length of stay in minutes
    const arrivalTime = moment(arrivalRelated.arrivalTime)
    const departureTime = moment(this.departureTime)
    const stayInMinutes = Math.ceil(moment.duration(departureTime.diff(arrivalTime)).asMinutes()) // Round to next minute

    let result = {}

    // Check if the automobile's license plate is official, resident or visitor
    if (await Automobile.isResident(this.licensePlate)) {
        const ResidentQuota = mongoose.model('ResidentQuota')

        // Updating existing quota
        const query = ResidentQuota.updateOne({
            licensePlate: this.licensePlate
        }, {   
            $inc: {
                quota: stayInMinutes
            }
        })
        const updateResult = await query.exec()

        // There is no existing quota: init
        if (updateResult.nModified === 0) {
            let residentQuota = new ResidentQuota({
                licensePlate: this.licensePlate,
                quota: stayInMinutes
            })

            await residentQuota.save()
        }

        result.message = "Resident quota accounted"

    } else if (await Automobile.isOfficial(this.licensePlate)) {
        console.log("Official Handler")
    } else {
        // Treated as visitor
        console.log("Visitor Handler")
    }
    return result
}

const Departure = mongoose.model('Departure', departureSchema)

module.exports = Departure