const constants = require('../../constants.json')
const rp = require('request-promise');

const fetchData = async(req, res) => {
    const options = {
        uri: `${constants.REDASH_URL}/api/queries/271/results`,
        method:"GET",
        json:true,
        headers:{
            'Authorization': constants.REDASH_API_KEY
        }
    }
    const response = await rp(options)
    res.status(200).json(response)
}

module.exports = {
    fetchData
}