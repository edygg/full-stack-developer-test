const axios = require('axios')

const AUTOMOBILE_TYPES_URL = 'http://automobiles/api/automobile-types/:automobileType' 
const AUTOMOBILE_INFO_URL = 'http://automobiles/api/automobiles/:licensePlate'

// Automobile Types
const RESIDENT = "resident"
const OFFICIAL = "official"
const VISITOR = "visitor"

module.exports = {
    constants: {
        RESIDENT,
        OFFICIAL,
        VISITOR
    },
    getAutomobileType: async function(automobileType) {
        const url = AUTOMOBILE_TYPES_URL.replace(':automobileType', automobileType)
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            return {}
        }

    },
    isResident: async function(licensePlate) {
        const url = AUTOMOBILE_INFO_URL.replace(':licensePlate', licensePlate)
        try {
            const response = await axios.get(url)
            return response.data.automobile_type[0].type === RESIDENT
        } catch (error) {
            console.log(error)
            return false
        }
    },
    isOfficial: async function (licensePlate) {
        const url = AUTOMOBILE_INFO_URL.replace(':licensePlate', licensePlate)
        try {
            const response = await axios.get(url)
            return response.data.automobile_type[0].type === OFFICIAL
        } catch (error) {
            return false
        }
    },
}