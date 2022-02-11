const pipeDriveRouter = require('express').Router()
const {fetchData} = require('./get')

pipeDriveRouter.get('/', fetchData)

module.exports = pipeDriveRouter