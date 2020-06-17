const axios = require('axios')

const AUTOMOBILE_TYPES_URL = 'http://automobiles/api/automobile-types/:automobileType' 

module.exports = {
    getAutomobileType: async function(automobileType) {
        const url = AUTOMOBILE_TYPES_URL.replace(':automobileType', automobileType)
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            return {}
        }

    }
}