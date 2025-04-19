# Arbitrázs Bot (Gnosis Chain)
Ez a bot 4 DEX-en figyeli a WETH/USDC és más token párok árát (Uniswap, Sushiswap, CowSwap, Balancer) és arbitrázs lehetőségek után kutat.

## Fő funkciók
- Moduláris kód (index, dex, swapper, logger)
- .env alapú privát kulcskezelés
- Színes CLI jelentés
- Párhuzamos árlekérdezés előkészítve
- Konfigurálható nyereségküszöb, gázlimit, slippage

## Használat
1. Töltsd ki a `.env` fájlt a saját adataiddal
2. `npm install`
3. `node index.js` vagy futtasd `tmux`-ban / `pm2`-vel
