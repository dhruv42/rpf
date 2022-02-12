const router = require('express').Router()

const { searchOrganizations,listOrganizations, searchDeals, getOrganizationDealsById, getOrganizationById } = require('./pipedrive/get');
const {searchTickets} = require('./freshdesk/get')
const {fetchData} = require('./redash/get')

// ===================== PIPEDRIVE ====================
router.get('/organizations', listOrganizations)
router.get('/search/organizations',searchOrganizations)
router.get('/organizations/:id', getOrganizationById)
router.get('/organizations/:id/deals',getOrganizationDealsById)
router.get('/search/deals', searchDeals)

// ===================== FRESHDESK ====================
router.get('/freshdesk', searchTickets)

// ===================== REDASH ====================
router.get('/redash', fetchData)

module.exports = router