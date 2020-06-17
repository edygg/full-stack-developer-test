const mongoose = require('mongoose')

// Importing models
const Arrival = require('./Arrival')
const Departure = require('./Departure')
const OfficialLog = require('./OfficialLog')
const ResidentQuota = require('./ResidentQuota')


const connDatabase = function() {
    return mongoose.connect(process.env.MONGO_STR_CONN)
}

const Models = {
    Arrival,
    Departure,
    OfficialLog,
    ResidentQuota,
}

module.exports = {
    connDatabase,
    Models,
}