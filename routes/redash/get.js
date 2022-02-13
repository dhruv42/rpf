const config = require("../../config.json");
const rp = require("request-promise");
const { messages, statusCode } = require("../../constants/constants.json");
const { responseHandler } = require("../../helpers/requestResponse");

const fetchData = async (req, res) => {
  const biller = req.params['biller'];
  try {
    const options = {
      //  uri: `${config.REDASH_URL}/api/queries/271/results`,
      uri: `${config.REDASH_URL}/api/queries/714/results`,
      method: "GET",
      json: true,
      headers: {
        Authorization: config.REDASH_API_KEY,
      },
    };
    const response = await rp(options);
    const dataRows = response.query_result.data.rows;
    const responseRows = {}
    for (const row of dataRows) {
      if (row.biller.toUpperCase().includes(biller.toUpperCase())) {
        const dataPoint = {};
        dataPoint["product"] = row.ui_product_type;
        dataPoint["txns"] = row.total_txns;
        dataPoint["month"] = row.txn_date;
        dataPoint["monthNumber"] = row.txn_month;
        if (row.biller in responseRows) {
          if (row.ui_product_type in responseRows[row.biller])
            responseRows[row.biller][row.ui_product_type].push(dataPoint)
          else {
            responseRows[row.biller][row.ui_product_type] = []
            responseRows[row.biller][row.ui_product_type].push(dataPoint)
          }
        } else {
          responseRows[row.biller] = {}
          responseRows[row.biller][row.ui_product_type] = []
          responseRows[row.biller][row.ui_product_type].push(dataPoint)
        }
      }
    }
    res.status(statusCode.OK).json(responseHandler(true, statusCode.OK, messages.SUCCESS, responseRows));
  } catch (error) {
    console.log(error);
    res.status(statusCode.BAD_REQUEST).json(responseHandler(false, statusCode.BAD_REQUEST, messages.BAD_REQUEST, error));
  }
};
module.exports = {
  fetchData,
};
