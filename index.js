const Web3 = require("web3");
const chalk = require("chalk");
const { getPrices, findArbitrage } = require("./dex");
const { executeSwap } = require("./swapper");
const { logResult } = require("./logger");

const RPC_URL = "http://localhost:8545";
const web3 = new Web3(RPC_URL);

function printReport(arbitrage) {
  console.clear();
  const now = new Date().toLocaleString();
  const boxTop = "╭─────────────────────── " + chalk.bold("📈 Arbitrázs Jelentés") + " ───────────────────────╮";
  const boxBottom = "╰" + "─".repeat(boxTop.length - 2) + "╯";

  console.log(boxTop);
  console.log("│ Dátum:      ", chalk.cyan(now).padEnd(55), "│");
  console.log("│ Vásárlás:   ", chalk.green.bold(arbitrage.buyOn), " @ ", chalk.green(`${arbitrage.priceB} USDC`), "│");
  console.log("│ Eladás:     ", chalk.red.bold(arbitrage.sellOn), " @ ", chalk.red(`${arbitrage.priceA} USDC`), "│");
  console.log("│ Különbség:  ", chalk.yellow.bold(`${arbitrage.diff}%`), "                                   │");
  console.log(boxBottom);
}

async function monitor() {
  const prices = await getPrices(web3);
  const arbitrage = findArbitrage(prices);

  if (arbitrage) {
    printReport(arbitrage);
    await executeSwap(web3, arbitrage);
    logResult(arbitrage);
  } else {
    console.log(chalk.dim("🔍 Nincs arbitrázs lehetőség jelenleg..."));
  }
}

setInterval(monitor, 30000);
