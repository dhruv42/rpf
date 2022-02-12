const config = require('../../config.json')
const rp = require('request-promise');
const {createListOrganizationResponse, createDealsReponse} = require('../../helpers/requestResponse')
const { messages, statusCode } = require("../../constants/constants.json");
const { responseHandler } = require("../../helpers/requestResponse");

const listOrganizations = async(req, res) => {
    try {
        const options = {
            uri: `${config.PIPEDRIVE_URL}/v1/organizations?api_token=${config.PIPEDRIVE_TOKEN}`,
            method:"GET",
            json:true
        }
        const response = await rp(options)
        const finalResponse = createListOrganizationResponse(response.data)
        res.status(statusCode.OK).json(responseHandler(true, statusCode.OK, messages.SUCCESS, finalResponse))
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER).json(responseHandler(false, statusCode.INTERNAL_SERVER, messages.SOMEHTING_WENT_WRONG, error))
    }
}

const getOrganizationDealsById = async(req, res) => {
    try {
        const id = req.params.id;
        const options = {
            uri: `${config.PIPEDRIVE_URL}/v1/organizations/${id}/deals?api_token=${config.PIPEDRIVE_TOKEN}`,
            method:"GET",
            json:true
        }
        const response = await rp(options)
        const finalResponse = createDealsReponse(response.data)
        res.status(statusCode.OK).json(responseHandler(true, statusCode.OK, messages.SUCCESS, finalResponse))
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER).json(responseHandler(false, statusCode.INTERNAL_SERVER, messages.SOMEHTING_WENT_WRONG, error))
    }
}

const searchOrganizations = async(req, res) => {
    try {
        const name = req.query.name;
        const options = {
            uri: `${config.PIPEDRIVE_URL}/v1/organizations/search?name=${name}&term=${name}&api_token=${config.PIPEDRIVE_TOKEN}`,
            method:"GET",
            json:true
        }
        const response = await rp(options)
        res.status(statusCode.OK).json(responseHandler(true, statusCode.OK, messages.SUCCESS, response.data))
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER).json(responseHandler(false, statusCode.INTERNAL_SERVER, messages.SOMEHTING_WENT_WRONG, error))
    }
}

const getOrganizationById = async(req, res) => {
    try {
        const id = req.params.id;
        const options = {
            uri: `${config.PIPEDRIVE_URL}/v1/organizations/${id}?api_token=${config.PIPEDRIVE_TOKEN}`,
            method:"GET",
            json:true
        }
        const response = await rp(options)
        res.status(statusCode.OK).json(responseHandler(true, statusCode.OK, messages.SUCCESS, response.data))
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER).json(responseHandler(false, statusCode.INTERNAL_SERVER, messages.SOMEHTING_WENT_WRONG, error))
    }
}

const getPersonDetails = async(id) => {
    try {
        const options = {
            uri: `${config.PIPEDRIVE_URL}/v1/persons/${id}?api_token=${config.PIPEDRIVE_TOKEN}`,
            method:"GET",
            json:true
        }
        const response = await rp(options)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

const searchDeals = async(req, res) => {
    try {
        const name = req.query.name;
        const options = {
            uri: `${config.PIPEDRIVE_URL}/v1/deals/search?name=${name}&term=${name}&api_token=${config.PIPEDRIVE_TOKEN}`,
            method:"GET",
            json:true
        }
        const response = await rp(options)
        // const person = await getPersonDetails()
        res.status(statusCode.OK).json(responseHandler(true, statusCode.OK, messages.SUCCESS, response))
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER).json(responseHandler(false, statusCode.INTERNAL_SERVER, messages.SOMEHTING_WENT_WRONG, error))
    }
}

module.exports = {
    listOrganizations,
    searchOrganizations,
    searchDeals,
    getOrganizationDealsById,
    getOrganizationById
}