const { allBillers } = require("./billers.json");
const config = require('../config.json')
const rp = require('request-promise')

function getMatchingBillers(keyword) {
  const temp = [];
  for (let i = 0; i < allBillers.length; i++) {
    if (allBillers[i].toLowerCase().includes(keyword.toLowerCase())) {
      temp.push(allBillers[i]);
    }
  }
  return temp;
}

function formQuery(allPossibleBillers) {
  const parameter = "cf_billermerchant_name";
  let query = "";
  for (let i = 0; i < allPossibleBillers.length; i++) {
    const element = allPossibleBillers[i];
    const singleQuery = `${parameter}:'${element}'`;
    if (query.length + singleQuery.length < 512) {
      query += `${singleQuery} OR `;
    }
  }
  query = query.slice(0, query.lastIndexOf("OR"));
  return query;
}

async function getDealDetailsByOrgId(id) {
  try {
    const options = {
      uri: `${config.PIPEDRIVE_URL}/v1/organizations/${id}/deals?api_token=${config.PIPEDRIVE_TOKEN}`,
      method: "GET",
      json: true,
    };
    const response = await rp(options);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getMatchingBillers,
  formQuery,
  getDealDetailsByOrgId,
};
