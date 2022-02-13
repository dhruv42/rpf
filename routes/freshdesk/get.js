const config = require("../../config.json");
const rp = require("request-promise");
const { getMatchingBillers, formQuery } = require("../../helpers/common");
const { messages, statusCode } = require("../../constants/constants.json");
const { responseHandler,createTicketResponse } = require("../../helpers/requestResponse");

const searchTickets = async (req, res) => {
  try {
    const keyword = req.query.name;
    const allPossibleBillers = getMatchingBillers(keyword);
    let uri = `${config.FRESHDESK_URL}/api/v2/search/tickets`;
    let query = formQuery(allPossibleBillers);
    if (query) {
        uri+=`?query="${query}"`
    } else {
        return res.status(200).json([]);
    }
    const options = {
      uri: uri,
      method: "GET",
      json: true,
      headers: {
        Authorization: `Basic ${config.FRESHDESK_TOKEN}`,
      },
    };
    const response = await rp(options);
    const filteredResponse = createTicketResponse(response)
    const finalResponse = {
      results:filteredResponse,
      total:response.total
    }
    res.status(statusCode.OK).json(responseHandler(true, statusCode.OK, messages.SUCCESS, finalResponse))
  } catch (error) {
    console.log(error);
    res.status(statusCode.BAD_REQUEST).json(responseHandler(false, statusCode.BAD_REQUEST, messages.BAD_REQUEST, error));
  }
};


module.exports = {
  searchTickets,
};
