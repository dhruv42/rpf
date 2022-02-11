const router = require('express').Router()

const { searchOrganizations,listOrganizations, searchDeals } = require('./pipedrive/get');
const {searchTickets} = require('./freshdesk/get')
const {fetchData} = require('./redash/get')

// ===================== PIPEDRIVE ====================
router.get('/pipedrive', listOrganizations)
router.get('/pipedrive/search',searchOrganizations)
router.get('/pipedrive/searchDeals', searchDeals)

// ===================== FRESHDESK ====================
router.get('/freshdesk', searchTickets)

// ===================== REDASH ====================
router.get('/redash', fetchData)

module.exports = router