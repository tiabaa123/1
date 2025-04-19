const fs = require("fs");

function loadTokenPairs() {
  const raw = fs.readFileSync("tokenPairs.json");
  return JSON.parse(raw);
}

module.exports = { loadTokenPairs };
