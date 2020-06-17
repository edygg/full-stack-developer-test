const axios = require('axios')

const PARKING_FEE_INFO_URL = 'http://parking_fees:3000/parking-fees/:automobileType'
const REQUEST_AUTH = { 
    headers: { 'Authorization': 'Bearer E3lb3KP7RKejbyd' } 
}
module.exports = {
    getParkingFee: async function(automobileType) {
        const url = PARKING_FEE_INFO_URL.replace(':automobileType', automobileType)
        try {
            const response = await axios.get(url, REQUEST_AUTH)
            return response.data.fee
        } catch (error) {
            return 0.00
        }
    }
}