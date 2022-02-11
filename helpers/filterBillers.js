const { allBillers } = require("./billers.json");

function getMatchingBillers(keyword) {
    const temp = []
    for(let i=0; i<allBillers.length; i++) {
        if(allBillers[i].toLowerCase().includes(keyword.toLowerCase())){
            temp.push(allBillers[i])
        }
    }
    return temp;
}

module.exports = {
  getMatchingBillers,
};
