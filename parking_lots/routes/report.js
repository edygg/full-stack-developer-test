const express = require('express');
const moment = require('moment')
const router = express.Router();
const fs = require('fs').promises
const Table = require('easy-table')

const Automobile = require('../api/automobiles')
const ParkingFee = require('../api/parkingFees')
const { Models } = require('../database') 


router.post('/start-month', async function (request, response, next) {
    try {
        // Cleaning official logs
        await Models.OfficialLog.deleteMany({})

        // Restart resident monthly quota
        await Models.ResidentQuota.updateMany({

        }, {
            quota: 0
        })

        response.status(200).json({ message: "Done" })

    } catch(error) {
        next(error, request, response, next)
    }
});

router.get('/resident-monthly-quota', async function (request, response, next) {
    const feePerMin = await ParkingFee.getParkingFee(Automobile.constants.RESIDENT)
    const query = Models.ResidentQuota.find({})
    const residents = await query.exec()

    let tableData = residents.map((resident) => {
        return {
            licensePlate: resident.licensePlate,
            quota: resident.quota,
            payment: ( esident.quota * feePerMin).toFixed(2)
        }
    })

    let fileTable = new Table()

    tableData.forEach((resident) => {
        fileTable.cell("Número de placa", resident.licensePlate)
        fileTable.cell("Tiempo estacionado (min)", resident.quota)
        fileTable.cell("Adeudado", resident.payment)
    })

    const tmpFilePath = '/tmp/resident-monthly-quota.txt'
    await fs.writeFile(tmpFilePath, fileTable.toString())
    response.download(tmpFilePath)
})

module.exports = router;