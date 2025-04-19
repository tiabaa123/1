const fs = require("fs");

function logResult(data) {
  const log = {
    timestamp: new Date().toISOString(),
    ...data
  };
  fs.appendFileSync("arbitrage-log.json", JSON.stringify(log) + "\n");
}

module.exports = { logResult };
