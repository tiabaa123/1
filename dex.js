const ROUTER_ABI = [
  {
    constant: true,
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" }
    ],
    name: "getAmountsOut",
    outputs: [
      { name: "amounts", type: "uint256[]" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

const WETH = "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1";
const USDC = "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83";

const ROUTERS = {
  Uniswap: "0x1c232F01118CB8B424793ae03F870aa7D0ac7f77",
  Sushiswap: "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506",
  CowSwap: "0x9008d19f58aabd9ed0d60971565aa8510560ab41",
  Balancer: "0x5c5a4cdd2f823e7e0c9ea0dfb7c6d4fdc7b9a3d6"
};

async function getPrice(web3, router, amountIn) {
  const contract = new web3.eth.Contract(ROUTER_ABI, router);
  try {
    const amounts = await contract.methods.getAmountsOut(amountIn, [WETH, USDC]).call();
    return web3.utils.fromWei(amounts[1]);
  } catch (e) {
    return null;
  }
}

async function getPrices(web3) {
  const amountIn = web3.utils.toWei("1");
  const prices = {};
  for (const [dex, address] of Object.entries(ROUTERS)) {
    const price = await getPrice(web3, address, amountIn);
    if (price) prices[dex] = parseFloat(price);
  }
  return prices;
}

function findArbitrage(prices) {
  const entries = Object.entries(prices);
  let best = null;
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [dexA, priceA] = entries[i];
      const [dexB, priceB] = entries[j];
      const diff = ((priceA - priceB) / priceB) * 100;
      if (Math.abs(diff) > 0.5) {
        best = {
          buyOn: diff > 0 ? dexB : dexA,
          sellOn: diff > 0 ? dexA : dexB,
          priceA,
          priceB,
          diff: diff.toFixed(2)
        };
      }
    }
  }
  return best;
}

module.exports = { getPrices, findArbitrage };
