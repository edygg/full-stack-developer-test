const express = require('express')
const moment = require('moment')
const passport = require('passport')
const router = express.Router()

const { Models } = require('../database') 


router.post('/', passport.authenticate('bearer', { session: false }), async function (request, response, next) {
    let { licensePlate } = request.body

    if (!licensePlate) {
        response.status(400).json({
            error: "License plate is required"
        })
        return
    }

    // is there an old arrival without departure?
    const query = Models.Arrival.findOne({
        licensePlate: licensePlate,
        hasDeparture: false
    })
    const oldArrival = await query.exec()

    if (oldArrival) {
        response.status(422).json({
            error: "There is an old arrival without departure"
        })
        return
    }

    try {
        const arrival = new Models.Arrival({
            licensePlate: licensePlate,
            arrivalTime: moment(), // now
            hasDeparture: false,
        })
    
        await arrival.save()
        
        response.status(201).json({
            id: arrival._id,
            licensePlate: arrival.licensePlate,
            arrivalTime: arrival.arrivalTime,
        })
    } catch(error) {
        next(error, request, response, next)
    }
});

module.exports = router;