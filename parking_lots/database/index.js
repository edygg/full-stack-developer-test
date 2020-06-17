const mongoose = require('mongoose')

// Importing models
const ParkingFee = require('./ParkingFee')


const connDatabase = function() {
    return mongoose.connect(process.env.MONGO_STR_CONN)
}

const Models = {
    ParkingFee
}

module.exports = {
    connDatabase,
    Models,
}