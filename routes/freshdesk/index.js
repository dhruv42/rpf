const freshDeskRouter = require('express').Router()
const {searchTickets} = require('./get')

freshDeskRouter.get('/', searchTickets)

module.exports = freshDeskRouter