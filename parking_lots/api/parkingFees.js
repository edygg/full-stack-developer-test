const axios = require('axios')

const PARKING_FEE_INFO_URL = 'http://parking_fees:3000/parking-fees/:automobileType'

module.exports = {
    getParkingFee: async function(automobileType) {
        const url = PARKING_FEE_INFO_URL.replace(':automobileType', automobileType)
        try {
            const response = await axios.get(url)
            return response.data.fee
        } catch (error) {
            return 0.00
        }
    }
}