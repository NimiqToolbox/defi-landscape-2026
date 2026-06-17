# The DeFi Landscape — Historical & Current State (2017 → 2026)

*Compiled 17 June 2026 · data as of 16 June 2026 · ~50 sourced datasets from a 98-agent deep-research run.*
*Companion to the interactive dashboard at `report/index.html`. Cleaned chart data: `report/data/defi_data.js`; raw per-topic JSON: `data/raw/`.*

> **One-line summary.** Decentralized finance grew from ~$0.6B at end-2019 to a **$177.5B all-time-high TVL on 9 Nov 2021** (DefiLlama), collapsed ~78% in the 2022 Terra→FTX unwind, re-approached its peak at **~$171B in Oct-2025**, and sits at **~$74.5B** today after a sharp 2026 drawdown. The *dollar* level round-tripped; the *composition* did not — liquid staking, restaking, perps, stablecoins and real-world assets are now the centre of gravity.

---

## 1. Headline numbers (as of mid-June 2026)

| Metric | Value | Note |
|---|---|---|
| Total DeFi TVL (now) | **$74.5B** | down from $171B Oct-2025 peak |
| All-time-high TVL | **$177.5B** | 9 Nov 2021 (DefiLlama) |
| Stablecoin supply | **$313.5B** | ATH ~$321B May-2026 |
| 2025 DEX spot volume | **$4.9T** | annual record |
| 2025 perp-DEX volume | **$6.4–7.9T** | Hyperliquid-led (source range) |
| Tokenized RWA (ex-stables) | **$32.6B** | ATH; tokenized Treasuries $14.95B |
| DeFi fees (2025) | **$27.2B** | protocol revenue $14.6B |
| ETH staked | **~39.5M (~33%)** | staking-ratio ATH |
| All crypto theft (2025) | **~$3.4B** | record, but ~$1.5B was the single Bybit hack |

*Headline TVL uses DefiLlama's consistent cross-chain methodology; other trackers cite ~$202–237B peaks under broader inclusion rules. Raw: `quant_total_tvl.json`, `quant_stablecoins.json`, `quant_dex_volume.json`, `quant_perps.json`, `quant_rwa.json`, `quant_fees_revenue.json`, `quant_liquid_staking.json`, `quant_hacks.json`.*

---

## 2. The cycles: total value locked, 2019 → 2026

Year-end DeFi TVL ($B, DefiLlama): **2019 $0.61 → 2020 $15.1 → 2021 $163.3 → 2022 $38.3 → 2023 $52.8 → 2024 $115.9 → 2025 $113.5 → Jun-2026 $74.5.** Intra-year peaks: 2021 **$177.5B** (ATH), 2025 **$171B**, 2026 $127.8B (Jan).

Six eras (raw: `narrative_timeline.json`):

1. **Genesis / Early DeFi (2017–19)** — MakerDAO's DAI (Dec-2017) and Uniswap v1 (Nov-2018) establish the stablecoin, lending and AMM money-legos.
2. **DeFi Summer (2020)** — Compound's COMP liquidity mining (Jun-2020) invents yield farming; Yearn, SushiSwap's vampire attack, and the Uniswap UNI airdrop follow.
3. **2021 Bull / DeFi 2.0** — Uniswap v3 concentrated liquidity, OlympusDAO protocol-owned liquidity, the Curve Wars; TVL ATH ~$178B.
4. **The Great Unwind (2022)** — Terra/UST (May), 3AC, Celsius, then FTX (Nov) cut TVL ~78%. The Merge (Sep) sets up the staking economy.
5. **Recovery & LSDfi (2023)** — USDC's SVB depeg scare (Mar); Shapella unlocks staking withdrawals (Apr); liquid staking becomes #1; Base launches.
6. **RWA, Stablecoin Law & Institutional DeFi (2024–26)** — spot BTC/ETH ETFs, EigenLayer restaking + points meta, Hyperliquid's HYPE airdrop (2024); then the GENIUS Act, tokenized Treasuries, and Wall Street going on-chain (2025–26), against the backdrop of the record Bybit hack.

**The key insight:** dollar TVL re-approached its 2021 high in 2025, but the application mix inverted. In 2020–21 DEXs, lending and MakerDAO dominated. From 2023, **liquid staking became the single largest category** (record ~$86B in Aug-2025, >50% of all DeFi TVL), restaking went 0→$22B→back down, and RWAs + yield-bearing stablecoins emerged as entirely new verticals.

---

## 3. TVL by chain

Ethereum has always anchored DeFi: ~**96%** of TVL in 2020, falling to ~**53.4%** today (`quant_tvl_by_chain.json`). Ethereum DeFi TVL: 2020 $14.6B → 2021 $92.3B → 2022 $22.4B → 2024 $66.3B → Jun-2026 $39.7B (ATH ~$107.5B, Nov-2021).

Current chain snapshot (16 Jun 2026, $B): **Ethereum 39.8 · BSC 5.29 · Solana 4.92 · Tron 4.58 · Bitcoin/BTCFi 4.33 · Base 4.29 · Hyperliquid L1 1.65 · Arbitrum 1.31 · Polygon 1.05 · Avalanche 0.48 · Sui 0.45.** The non-Ethereum field is now bunched and *specialized*: BSC leads DEX flow, Tron leads stablecoin settlement (USDT ~$87.7B on Tron), Solana leads trading activity, Base leads consumer apps, and **Bitcoin DeFi (BTCFi)** is a genuine 2024 newcomer (peaked ~$9.1B Oct-2025). Arbitrum, Polygon, Avalanche and Sui have faded from prior peaks.

---

## 4. TVL by category — the composition flip

Current gross category TVL (16 Jun 2026, $B, DefiLlama; gross sums double-count wrapped/restaked assets): **Bridge ~46.7\* · Lending 38.1 · Liquid Staking 33.9 · RWA 26.2 · Restaking+LRT 13.3 · DEXes 11.8 · CDP 8.5 · Yield 6.2 · Derivatives (TVL) 2.1.** (\*Bridge is inflated by wrapped BTC/ETH that double-counts the underlying.)

The structural story (`quant_tvl_by_category.json`): liquid staking **overtook DEX/lending as DeFi's single largest application from ~2023** (Lido became #1 by TVL); restaking exploded from ~0 (early 2024) to a ~$20–22B peak and back to ~$5B; RWA grew from ~$0.3B (2023) to a top-5 category. Lending (~$38B) is the largest non-staking category.

---

## 5. DEXs — on-chain trading goes mainstream

Annual DEX spot volume ($T): 2020 ~0.12 → 2021 ~1.0 → 2023 0.65 → 2024 1.5 → **2025 4.9 (record)** (`quant_dex_volume.json`). The **DEX-to-CEX spot ratio** more than tripled in five years, from ~6% (Jan-2021) to an **ATH 37.4% (Jun-2025)** during Solana memecoin mania, settling ~21% (Nov-2025) and ~29% (2026).

Spot DEX market share (Aug-2025): **Uniswap 35.9% · PancakeSwap 29.5% · Aerodrome 7.4% · Raydium 4.1% · Curve 2.9%.** Uniswap (v2/v3/v4) remains #1 by combined volume+TVL, but PancakeSwap and Aerodrome (Base) are genuine peers, the Solana stack (Raydium/Orca/Meteora, routed via **Jupiter**) surged on the Pump.fun cycle (Raydium briefly overtook Uniswap on monthly volume in Nov-2025), and Hyperliquid's on-chain orderbook is a new force (`map_dex.json`).

---

## 6. Lending — incumbent + the modular wave

Aave is the entrenched leader (~60–63% share), peaking at **$45.8B TVL (Oct-2025)** with active borrows ~$30.6B; ~$13B now after the 2026 drawdown (`quant_lending.json`, `map_lending.json`). MakerDAO led the 2021 cycle ($19.8B ATH) then rebranded to **Sky** and externalized lending into **Spark**. Compound stagnated. The growth story is **modular/isolated markets**: **Morpho** (Blue primitive + curated Vaults) went 0 → top-3 (~$7–10B deposits at peak; $175M from a16z/Paradigm), with a recovering **Euler V2**. Chain leaders: JustLend (Tron), Kamino (~75% of Solana lending).

---

## 7. Stablecoins — the quiet giant & DeFi's base layer

Total supply reached an **ATH ~$321B (May-2026)**, ~$313.5B now (`quant_stablecoins.json`). Year-end ($B): 2019 4.2 → 2020 27.1 → 2021 162.5 → 2022 137.5 → 2023 130.1 → 2024 205.4 → 2025 306.7. A **USDT/USDC duopoly holds ~83%** (USDT ~$186B/~58%, USDC ~$75B/~24%). Below them: Sky's USDS+DAI (~$12.6B), Ethena's synthetic USDe (peaked ~$14.8B Oct-2025, now ~$4.5B), World Liberty's USD1, and tokenized-Treasury "dollars" (BUIDL, USYC, USDY).

Risk lessons are visible in the issuer trajectories: Terra/UST's 2022 collapse killed algorithmic designs; USDC's **2023 SVB depeg** (to ~$0.87) handed USDT a durable trust advantage; **BUSD was wound down** to ~zero after the NYDFS halt (Feb-2023). Stablecoin *transfer* volume hit ~$18.4T (adjusted, 2024), exceeding Visa and Mastercard; "true" payment volume was ~$390B in 2025.

---

## 8. Perpetuals — the breakout vertical

On-chain perps went from a rounding error to a multi-trillion market: **~$6.4–7.9T in 2025** (source-dependent), up from $0.65T (2023) and $1.5T (2024); monthly volume first crossed **$1T in Oct-2025** (`quant_perps.json`). **Hyperliquid** — a fully on-chain orderbook on its own L1 — flipped GMX (2023) and dYdX (2024) and reached **~70–80% of on-chain perp-DEX volume** mid-2025, traded ~$2.9T in 2025, then saw its share compress to ~36% (Jan-2026) as Aster, Lighter and edgeX rose, rebounding toward ~44% (Apr-2026). The former leaders dYdX and GMX are now single-digit share (`map_perps_derivs.json`).

---

## 9. Liquid staking & restaking

**Liquid staking** is DeFi's largest category; the whole sector hit a record **~$86B (Aug-2025)**. Lido leads (~$16B now; ATH $42.5B Aug-2025) but its share of staked ETH fell from >32% (2023) to ~24%. Staked ETH rose steadily to **~39.5M (~33% of supply, ATH)** — note that USD TVL swings are largely *ETH price*, not unstaking (`quant_liquid_staking.json`).

**Restaking** was the most dramatic boom-and-bust: EigenLayer 0 → **~$22.1B ATH (Aug-2025)** → ~$5.0B now, as points/airdrop incentives ended, slashing went live (Apr-2025), and real AVS yields lagged the shared-security thesis. ether.fi leads liquid restaking (~$3.0B; >75% LRT share); Renzo and Karak collapsed >90% from peaks (`quant_restaking.json`, `map_staking_restaking.json`).

---

## 10. Real-world assets — Wall Street's gateway

Tokenized RWAs (ex-stablecoins) grew from ~$5B (2022) to **$32.6B (Jun-2026, ATH)**, led by tokenized US Treasuries (**$14.95B**, from $845M end-2023) and private credit (`quant_rwa.json`, `map_rwa.json`). Leaders today ($B): **Circle USYC 3.08 · Tether Gold 3.07 · BlackRock BUIDL 3.03 · Ondo (USDY+OUSG) 2.70 · Franklin BENJI 2.40 · Paxos Gold 1.97 · Centrifuge 1.64.** The defining 2026 event: **Circle's USYC overtook BlackRock's BUIDL in Mar-2026**, and leadership shifted from DeFi-native originators (Centrifuge, MakerDAO) to TradFi giants (BlackRock, Franklin, Invesco, Circle). Tokenized gold surged on the 2025 metals rally.

---

## 11. Yield & bridges

**Yield** leadership turned over completely (`quant_yield.json`): Convex peaked ~$21B in the 2022 Curve Wars; the 2024–25 cycle belonged to **yield-tokenization (Pendle**, ATH ~$13.4B Sep-2025, now ~$1.2B), **synthetic-dollar yield (Ethena)** and **curated vaults (Morpho)**. Legacy auto-compounders (Yearn $0.15B, Beefy $0.11B) are a fraction of their 2021 size.

**Bridges** pivoted from custody-heavy lock-and-mint to messaging + intents (`quant_bridges.json`, `map_bridges_interop.json`). Total Bridge category ~$46.7B (mixes custodial/wrapped bridges); top names: LayerZero V2 $7.6B, WBTC $7.5B, Hyperliquid Bridge $5.9B, Coinbase Bridge $5.6B, Chainlink CCIP $1.3B. Multichain (ATH $10.5B, Jan-2022) **collapsed in 2023**. Bridges were ~**69% of all 2022 crypto theft (~$2B)** — the worst single vector — driving the shift to generalized messaging (LayerZero, Wormhole, CCIP), native rollup bridges, and intent/solver standards (ERC-7683).

---

## 12. Users, builders & economics

**Fees & revenue** (`quant_fees_revenue.json`): DeFi fees hit a record **$27.2B (2025)**, with $14.6B kept as protocol revenue; all-time cumulative ~$111B fees / ~$61B revenue. Stablecoin issuers (Tether, Circle) are ~39% of current fees; the largest non-stablecoin generators are Hyperliquid, Aave and Lido.

**Developers** (`quant_developers.json`, Electric Capital): monthly-active crypto devs peaked ~26k (mid-2022), ~23–25k now; experienced devs (2+ yrs) write ~70% of code. **Solana led NEW developers in 2024** (first time since 2016); India became the #1 source of new devs. DeFi-specific devs peaked ~3,900 (2022).

**Users — with caveats** (`quant_users.json`): cumulative unique DeFi addresses reached ~333M, but that metric only rises and **overstates** real users. a16z estimates just **~40–70M monthly-active crypto users** worldwide (of 716M owners), with DeFi ≈ 34% of daily on-chain activity.

---

## 13. Security — record headline, improving fundamentals

2025 set a record for total crypto theft (**~$3.4B**, Chainalysis) — but **almost entirely because of the single ~$1.5B Bybit hack** (largest crypto heist ever, attributed to North Korea's Lazarus Group). Strip Bybit out and 2025 declined YoY. Crucially, **DeFi-protocol-only losses fell** from a $2.62B peak (2022) to ~$0.68B (2025), with median loss per incident down ~75% — genuine security improvement even as TVL grew (`quant_hacks.json`). Biggest incidents ($M): Bybit 1,500 · Ronin 625 · Poly Network 611 · BNB Bridge 570 · FTX drain 450 · Wormhole 325 · Euler 197. Theft has shifted from DeFi protocols toward centralized services and individual wallets.

---

## 14. Protocol & category leadership map

| Category | Leaders now | The shift |
|---|---|---|
| **DEXs** | Uniswap, PancakeSwap, Aerodrome, Curve, Jupiter (Solana) | Uniswap-dominant (2021) → multi-chain; DEX/CEX spot ratio at record highs |
| **Lending** | Aave (~60%), Spark, Morpho, Compound, Kamino | Pooled incumbent (Aave) vs modular/isolated (Morpho, Euler V2) |
| **Stablecoins** | USDT, USDC, USDS/DAI, USDe, BUIDL/USYC | Algo died (2022); fiat duopoly + yield-bearing/RWA challengers |
| **Staking/restaking** | Lido, Binance, Rocket Pool; EigenLayer, ether.fi | Lido leads LSTs; restaking boomed then unwound |
| **Perps** | Hyperliquid (~40%), Aster, dYdX, GMX | dYdX/GMX duopoly → Hyperliquid dominance |
| **RWA** | Circle USYC, BUIDL, Ondo, Franklin, Maple | DeFi-native → TradFi giants; USYC > BUIDL (Mar-2026) |
| **Yield** | Pendle, Ethena, Morpho Vaults, Convex | Auto-compounders → yield tokenization + curator vaults |
| **Bridges** | LayerZero, Wormhole, CCIP, Across | Lock-and-mint → messaging + intents (ERC-7683) |
| **CDP/synthetics** | Sky (USDS/DAI), Liquity, crvUSD, GHO | One-giant CDP market; synthetics dissolved into perps |
| **Aggregators** | Jupiter, KyberSwap, CoW Swap, 1inch | 1inch king → Jupiter by volume; intents mainstream |

*Raw: `map_*.json` (10 files).*

---

## 15. Regulation & macro — from enforcement to a US pivot

The policy backdrop drove the cycle as much as code did (`narrative_regulation.json`):

- **2022:** Fed rate hikes drained on-chain yield; OFAC **sanctioned Tornado Cash** (first sanctioning of immutable smart contracts).
- **2023–24:** Peak "regulation by enforcement" in the US (SEC sues Coinbase; Wells notice to Uniswap) while the **EU's MiCA** and **US spot BTC/ETH ETFs** built the first formal on-ramps; the 5th Circuit later ruled OFAC overstepped on Tornado Cash.
- **2025 — the Great Policy Pivot:** Gensler departs; EO 14178 bans a US CBDC; SAB 121 rescinded (banks can custody crypto); SEC drops the Coinbase case and Uniswap probe; OFAC delists Tornado Cash; the **GENIUS Act** (first US federal stablecoin law) is signed and the **CLARITY** market-structure bill advances. Developer-liability risk persists (Roman Storm partial verdict).

---

## 16. The discourse: 12 months of conferences (Jun-2025 → Jun-2026)

Across **20+ major and regional flagship conferences**, four themes dominated every stage. Editor's tally of how many foregrounded each theme: **Stablecoins 21 · RWA/Tokenization 20 · Institutional DeFi 20 · Regulation 13 · AI agents/DeFAI 11 · Lending/credit 9 · Perps 7 · Restaking 6.** The recurring framing: *"less degen, more boardroom."*

Selected events (full list + speakers in `report/data/conferences.csv`; per-event detail in `data/raw/conf_*.json`):

- **EthCC[8]** (Cannes, Jun 30–Jul 3 2025): first official TradFi participation (BNP Paribas, SG-Forge, Euroclear); **Aave V4** hub-and-spoke reveal; RWA Summit; DeFAI.
- **Permissionless IV** (Brooklyn, Jun 24–26 2025): a dedicated **"DeFi Renaissance"** track; Aave's Horizon (permissioned RWA collateral); stablecoins as "first PMF"; Kalshi on prediction markets.
- **TOKEN2049 Singapore** (Oct 1–2 2025, ~25k record): stablecoins (>$45T volume cited), RWA mainstream, perp DEXs, Digital Asset Treasuries.
- **Money20/20 USA** (Las Vegas, Oct 26–29 2025): stablecoins as payment rails (>$27T); Western Union's USDPT announcement; GENIUS Act tailwinds.
- **Chainlink SmartCon** (NYC, Nov 4–5 2025): TradFi-DeFi **"AllFi"**; UBS production tokenized fund; CCIP cross-chain settlement (DvP).
- **Devconnect Argentina** (Buenos Aires, Nov 17–22 2025, ~14k): stablecoins as the consumer "front-end" (used on the street); Aave App launch; 4th DeFi Security Summit.
- **Solana Breakpoint** (Abu Dhabi, Dec 11–13 2025): yield-bearing stablecoins (JupUSD), JPMorgan commercial paper on mainnet, Jupiter Lend ($1B in 8 days).
- **Consensus** (Hong Kong Feb + **Miami May 2026**, ~20k): "Internet Capital Markets"; SEC Chair Atkins & CFTC Chair Selig on stage; agentic commerce (x402).
- **ETHDenver 2026** (Feb 18–21): "less degen, more boardroom"; first sitting SEC Commissioner (Peirce) to speak; Vitalik on DeFi resilience to crashes.
- **DAS** (London Oct-2025 + NYC Mar-2026): the institutional flagship — SEC Chair, Fed Governor, BlackRock, JPMorgan, BNY moving securities settlement on-chain.
- **Paris Blockchain Week 2026** (Apr 15–16): **President Macron keynote** (first G7 head of state at a blockchain conference); RWA as a "trillion-dollar layer"; MiCA.
- **TOKEN2049 Dubai** (Apr 29–30 2026): "DeFi eating CeFi"; stablecoins (~$250B); capital discipline.
- Also in-window: **Korea Blockchain Week** (KRW stablecoins, RWAfi), **Cardano Summit** (Berlin), **Cosmoverse** (Digital Euro/CBDCs), **Hong Kong Web3 Festival**, **Stablecon EMEA**, **DappCon/Berlin**. *(Avalanche Summit London and Sui Basecamp 2025 fall just before the window and are flagged accordingly.)*

---

## 17. Sources, methodology & caveats

**How this was built.** A multi-agent deep-research run (98 agents, ~2.7M tokens) fanned out across the open web, extracted falsifiable claims with source URLs and as-of dates, and adversarially fact-checked the load-bearing numbers (3-vote verification). Each topic's findings are in `data/raw/` (50 JSON files); cleaned chart series are in `report/data/defi_data.js`; downloadable tidy data is in `report/data/timeseries_long.csv` and `report/data/conferences.csv`.

**Primary providers.** DefiLlama (TVL, fees, stablecoins, per-protocol), CoinGecko Research, The Block, Messari, Token Terminal, RWA.xyz, Artemis, a16z State of Crypto, Electric Capital, Chainalysis / CertiK / Immunefi, and official conference agendas.

**Caveats — read before quoting any number:**
- **Methodology divergence.** Headline TVL uses DefiLlama's consistent series (ATH ~$177.5B); other trackers cite ~$202–237B under broader inclusion/double-counting.
- **Gross category sums double-count** wrapped/restaked assets (Bridge ~$46.7B, restaking+LRTs). Treat as upper bounds.
- **TVL is price-driven** — much of the 2026 USD drawdown is falling ETH/SOL prices, not withdrawals (staked-ETH *count* kept rising).
- **Addresses ≠ people** — cumulative-address counts (~333M) massively overstate the ~40–70M real monthly-active users.
- **Volume figures vary by source/scope** (spot-only vs incl. perps; CoinGecko vs DefiLlama); ranges are shown where sources disagree.
- **Conference detail confidence varies** — future-dated 2026 events and thin-agenda events are lower-confidence; speakers/panels are never fabricated; adjacent-but-out-of-window events are flagged.

*For research/educational purposes — not investment advice.*
