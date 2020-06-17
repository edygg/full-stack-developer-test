const express = require('express');
const moment = require('moment')
const router = express.Router();

const { Models } = require('../database') 


router.post('/', async function (request, response, next) {
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

    if (!oldArrival) {
        response.status(422).json({
            error: "Unable to register a departure without arrival"
        })
        return
    }

    try {
        const departure = new Models.Departure({
            licensePlate: licensePlate,
            departureTime: moment(), // now
        })
    
        await departure.save()
        result = await departure.handle(oldArrival)

        // Update arrival
        oldArrival.hasDeparture = true
        await oldArrival.save()

        response.status(201).json({
            id: departure._id,
            licensePlate: departure.licensePlate,
            arrivalTime: oldArrival.arrivalTime,
            departureTime: departure.departureTime,
            ...result
        })
    } catch(error) {
        next(error, request, response, next)
    }
});

module.exports = router;