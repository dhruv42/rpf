const constants = require("../../constants.json");
const rp = require("request-promise");
const { getMatchingBillers } = require("../../helpers/filterBillers");

const searchTickets = async (req, res) => {
  try {
    const keyword = req.query.name;
    const allPossibleBillers = getMatchingBillers(keyword);
    let uri = `${constants.FRESHDESK_URL}/api/v2/search/tickets`;
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
        Authorization: `Basic ${constants.FRESHDESK_TOKEN}`,
      },
    };
    const response = await rp(options);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

function formQuery(allPossibleBillers) {
    const parameter = 'cf_billermerchant_name';
    let query = '';
    for (let i = 0; i < allPossibleBillers.length; i++) {
        const element = allPossibleBillers[i];
        const singleQuery = `${parameter}:'${element}'`
        if(query.length + singleQuery.length < 512) {
            query+=`${singleQuery} OR `
        }
    }
    query= query.slice(0, query.lastIndexOf("OR"))
    return query
}

module.exports = {
  searchTickets,
};
