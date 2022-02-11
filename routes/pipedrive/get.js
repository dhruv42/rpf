const constants = require('../../constants.json')
const rp = require('request-promise');

const listOrganizations = async(req, res) => {
    const options = {
        uri: `${constants.PIPEDRIVE_URL}/v1/organizations?api_token=${constants.PIPEDRIVE_TOKEN}`,
        method:"GET",
        json:true
    }
    const response = await rp(options)
    res.status(200).json(response)
}

const searchOrganizations = async(req, res) => {
    const name = req.query.name;
    const options = {
        uri: `${constants.PIPEDRIVE_URL}/v1/organizations/search?name=${name}&term=${name}&api_token=${constants.PIPEDRIVE_TOKEN}`,
        method:"GET",
        json:true
    }
    const response = await rp(options)
    res.status(200).json(response)
}

const searchDeals = async(req, res) => {
    const name = req.query.name;
    const options = {
        uri: `${constants.PIPEDRIVE_URL}/v1/deals/search?name=${name}&term=${name}&api_token=${constants.PIPEDRIVE_TOKEN}`,
        method:"GET",
        json:true
    }
    const response = await rp(options)
    res.status(200).json(response)
}

module.exports = {
    listOrganizations,
    searchOrganizations,
    searchDeals
}