function generateStrategies(tokenPairs) {
  const hops = [];
  for (const base of tokenPairs) {
    for (const quote of tokenPairs) {
      if (base.base !== quote.quote) {
        hops.push([base.base, quote.quote]);
      }
    }
  }
  return hops;
}

module.exports = { generateStrategies };
