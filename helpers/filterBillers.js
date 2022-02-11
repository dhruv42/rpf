const { allBillers } = require("./billers.json");

function getMatchingBillers(keyword) {
    const temp = []
    let counter = 0;
    for(let i=0; i<allBillers.length; i++) {
        if(allBillers[i].toLowerCase().includes(keyword.toLowerCase())){
            if(counter < 100) {
                counter+=allBillers[i].length
                temp.push(allBillers[i])
            }
        }
    }
    return temp;
}

module.exports = {
  getMatchingBillers,
};
