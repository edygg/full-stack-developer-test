const express = require('express')
const router = express.Router()
const passport = require('passport')

const Automobile = require('../api/automobiles')
const { Models } = require('../database') 


router.post('/', passport.authenticate('bearer', { session: false }),  async function (request, response, next) {
    let { automobileType, fee } = request.body

    if (!automobileType) {
        response.status(400).json({
            error: "Invalid Automobile Type"
        })
        return
    }
    
    // Fee can be left null, init on zero.
    fee = fee || 0.00

    if (fee < 0) {
        response.status(400).json({
            error: "Fee can be only a positive number"
        })
        return
    }

    // Verify if automobileType is already registered
    const automobileTypeObj = await Automobile.getAutomobileType(automobileType)

    if (automobileTypeObj) {
        try {
            const parkingFee = new Models.ParkingFee({
                automobileType,
                fee
            })

            await parkingFee.save()

            response.status(201).json({
                automobileType: parkingFee.automobileType,
                fee: parkingFee.fee,
            })
        } catch (error) {
            error.status = 422
            next(error, request, response, next)
        }
    } else {
        response.status(404).json({ error: "Automobile Type not found" })
    }

});

router.get('/:automobileType', passport.authenticate('bearer', { session: false }), async function(request, response, next) {
    let { automobileType } = request.params

    try {
        const query = Models.ParkingFee.findOne({ automobileType })
        let parkingFee = await query.exec()

        if (!parkingFee) {
            response.status(404).json({
                error: `Parking Fee for automobile type ${automobileType} not found`
            })
            return
        }

        response.status(200).json({
            automobileType: parkingFee.automobileType,
            fee: parkingFee.fee,
        })
    } catch (error) {
        next(error, request, response, next)
    }
})

module.exports = router;