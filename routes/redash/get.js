const config = require("../../config.json");
const rp = require("request-promise");
const { messages, statusCode } = require("../../constants/constants.json");
const { responseHandler } = require("../../helpers/requestResponse");

const fetchData = async (req, res) => {
    try {
        const options = {
          uri: `${config.REDASH_URL}/api/queries/271/results`,
          method: "GET",
          json: true,
          headers: {
            Authorization: config.REDASH_API_KEY,
          },
        };
        const response = await rp(options);
        res.status(statusCode.OK).json(responseHandler(true, statusCode.OK, messages.SUCCESS, response));
    } catch (error) {
        console.log(error);
        res.status(statusCode.BAD_REQUEST).json(responseHandler(false, statusCode.BAD_REQUEST, messages.BAD_REQUEST, error));
    }
};

module.exports = {
  fetchData,
};
