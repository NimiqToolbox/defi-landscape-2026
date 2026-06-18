/*
 * DEFI_DATA — cleaned, chart-ready datasets for the DeFi Landscape dashboard.
 * Compiled 2026-06-17 from the research output in ../../data/raw/*.json
 * (50 source files; each chart links back to its raw topic file).
 *
 * Primary data sources behind these numbers: DefiLlama (TVL, fees, stablecoins,
 * per-protocol), CoinGecko Research, The Block, Messari, Token Terminal, RWA.xyz,
 * Artemis, a16z State of Crypto, Electric Capital, Chainalysis / CertiK / Immunefi.
 * Values are USD billions unless a series states otherwise. "Current"/latest ≈ 2026-06-16/17.
 * Where trackers disagree, the DefiLlama consistent-methodology series is preferred and
 * caveats are noted inline (e.g. category "gross" sums double-count wrapped assets).
 */
window.DEFI_DATA = {
  meta: {
    compiled: "2026-06-17",
    asOf: "2026-06-16",
    rawDir: "../../data/raw/",
    note: "Cleaned from 98-agent deep-research run. See methodology section for caveats."
  },

  // ---- HEADLINE KPI CARDS ----
  kpis: [
    { label: "Total DeFi TVL (now)", value: "$74.5B", sub: "down from $171B Oct-2025 peak", raw: "quant_total_tvl.json" },
    { label: "All-time-high TVL", value: "$177.5B", sub: "9 Nov 2021", raw: "quant_total_tvl.json" },
    { label: "Stablecoin supply", value: "$313.5B", sub: "ATH ~$321B May-2026", raw: "quant_stablecoins.json" },
    { label: "2025 DEX spot volume", value: "$4.9T", sub: "annual record", raw: "quant_dex_volume.json" },
    { label: "2025 perp-DEX volume", value: "$6.4–7.9T", sub: "Hyperliquid-led", raw: "quant_perps.json" },
    { label: "Tokenized RWA on-chain", value: "$32.6B", sub: "ex-stablecoins, ATH", raw: "quant_rwa.json" },
    { label: "DeFi fees (2025)", value: "$27.2B", sub: "revenue $14.6B", raw: "quant_fees_revenue.json" },
    { label: "ETH staked", value: "~39.5M", sub: "~33% of supply (ATH)", raw: "quant_liquid_staking.json" }
  ],

  // ---- 1. TOTAL TVL (year-end) + intra-year peaks ----
  totalTvl: {
    years: ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    yearEnd: [0.61, 15.1, 163.3, 38.3, 52.8, 115.9, 113.5, 74.5],
    peak: [null, 15.5, 177.5, 167.9, 54.1, 133.1, 171.0, 127.8],
    athValue: 177.5, athDate: "2021-11-09",
    raw: "quant_total_tvl.json"
  },

  // ---- 2. TVL BY CHAIN (year-end, $B) ----
  tvlByChain: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    series: {
      Ethereum:   [14.64, 92.28, 22.36, 28.58, 66.26, 67.32, 39.74],
      BSC:        [0.15, 12.81, 4.68, 3.45, 5.46, 6.49, 5.29],
      Solana:     [0.00, 6.56, 0.21, 1.43, 8.50, 8.20, 4.92],
      Tron:       [0.13, 5.39, 4.31, 7.95, 7.45, 4.37, 4.58],
      "Bitcoin (BTCFi)": [0.00, 0.16, 0.10, 0.31, 6.36, 6.68, 4.33],
      Base:       [0.00, 0.00, 0.00, 0.44, 3.21, 4.47, 4.29],
      Arbitrum:   [0.00, 1.75, 1.00, 2.31, 2.95, 2.82, 1.31],
      Polygon:    [0.00, 4.86, 0.93, 0.88, 0.87, 1.17, 1.05],
      Avalanche:  [0.00, 9.49, 0.77, 0.90, 1.32, 1.16, 0.48]
    },
    raw: "quant_tvl_by_chain.json"
  },

  // current chain market share snapshot ($B, 2026-06-16)
  chainShareNow: {
    asOf: "2026-06-16",
    data: [
      { name: "Ethereum", value: 39.8 },
      { name: "BSC", value: 5.29 },
      { name: "Solana", value: 4.92 },
      { name: "Tron", value: 4.58 },
      { name: "Bitcoin (BTCFi)", value: 4.33 },
      { name: "Base", value: 4.29 },
      { name: "Hyperliquid L1", value: 1.65 },
      { name: "Arbitrum", value: 1.31 },
      { name: "Polygon", value: 1.05 },
      { name: "Avalanche", value: 0.48 },
      { name: "Sui", value: 0.45 },
      { name: "Other chains", value: 6.35 }
    ],
    raw: "quant_tvl_by_chain.json"
  },

  // Ethereum dominance (% of DeFi TVL)
  ethDominance: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    pct: [96.0, 57.0, 58.2, 54.2, 56.8, 59.3, 53.4],
    raw: "quant_tvl_by_chain.json"
  },

  // ---- 3. TVL BY CATEGORY ----
  // historical leader-sum proxies (lower bounds; methodology caveat applies)
  categoryProxy: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    series: {
      DEX:            [4.2, 39.3, 10.0, 7.6, 10.6, 8.2, 11.8],
      Lending:        [3.7, 27.1, 8.8, 16.8, 34.1, 43.4, 38.1],
      "Liquid Staking": [0.01, 12.4, 6.4, 25.4, 43.9, 40.1, 33.9],
      "CDP / Stables":  [5.6, 37.0, 12.6, 12.2, 13.7, 11.8, 8.5],
      Restaking:      [0, 0, 0, 1.3, 14.9, 12.6, 5.0],
      RWA:            [0, 0, 0, 0.3, 8.7, 10.6, 26.2]
    },
    raw: "quant_tvl_by_category.json"
  },
  // current gross category mix ($B, 2026-06-16) — gross sums, double-counting noted for Bridge
  categoryNow: {
    asOf: "2026-06-16",
    data: [
      { name: "Bridge*", value: 46.7, note: "*inflated by wrapped BTC/ETH (double-counts underlying)" },
      { name: "Lending", value: 38.1 },
      { name: "Liquid Staking", value: 33.9 },
      { name: "RWA", value: 26.2 },
      { name: "Restaking (+LRT)", value: 13.3 },
      { name: "DEXes", value: 11.8 },
      { name: "CDP / stable issuance", value: 8.5 },
      { name: "Yield", value: 6.2 },
      { name: "Derivatives (TVL)", value: 2.1 }
    ],
    raw: "quant_tvl_by_category.json"
  },

  // ---- 4. DEX VOLUME ----
  dexVolumeAnnual: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025"],
    valueTrillions: [0.115, 1.0, 1.0, 0.6476, 1.5, 4.9], // USD trillions
    raw: "quant_dex_volume.json"
  },
  dexCexRatio: {
    labels: ["Jan-21", "Jun-21", "Jan-22", "Dec-23", "Dec-24", "Jan-25", "Jun-25", "Nov-25", "2026"],
    pct: [5.98, 13.07, 14.58, 10.86, 13.02, 18.71, 37.40, 21.2, 29.0],
    athNote: "ATH 37.4% in Jun-2025 (Solana memecoin mania)",
    raw: "quant_dex_volume.json"
  },
  dexShareNow: {
    asOf: "2025-08 (monthly spot share)",
    data: [
      { name: "Uniswap", value: 35.9 },
      { name: "PancakeSwap", value: 29.5 },
      { name: "Aerodrome", value: 7.4 },
      { name: "Raydium", value: 4.1 },
      { name: "Curve", value: 2.9 },
      { name: "Others", value: 20.2 }
    ],
    raw: "quant_dex_volume.json"
  },

  // ---- 5. LENDING ----
  lending: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    series: {
      "Aave (family)":  [1.68, 14.19, 3.70, 6.61, 20.39, 30.09, 12.79],
      "MakerDAO / Sky": [2.79, 17.60, 6.07, 5.73, 6.66, 5.74, 5.85],
      Compound:         [1.98, 9.07, 1.65, 2.28, 2.70, 1.90, 1.20],
      Morpho:           [0, 0, 0, 0, 2.85, 5.68, 7.14],
      "8-family total": [6.45, 42.66, 14.08, 22.82, 44.22, 52.19, 34.68]
    },
    note: "Aave family ATH $45.8B (Oct-2025); active borrows ATH $30.6B (Sep-2025).",
    raw: "quant_lending.json"
  },

  // ---- 6. STABLECOINS ----
  stablecoinTotal: {
    years: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    supply: [0.42, 4.17, 27.06, 162.53, 137.46, 130.1, 205.43, 306.7, 313.53],
    ath: 321.38, athDate: "2026-05-17",
    raw: "quant_stablecoins.json"
  },
  stablecoinByIssuer: {
    years: ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    series: {
      "USDT (Tether)": [3.2, 20.07, 79.43, 66.22, 91.77, 137.83, 187.06, 186.32],
      "USDC (Circle)": [0.52, 3.71, 38.09, 44.1, 24.02, 43.8, 75.99, 74.98],
      "DAI + USDS (Sky)": [0, 1.16, 8.97, 5.06, 5.18, 4.42, 4.49, 12.62],
      "BUSD (Paxos)":  [0, 0.9, 14.74, 16.71, 1.01, 0.07, 0.05, 0.04],
      "USDe (Ethena)": [0, 0, 0, 0, 0.09, 5.86, 6.29, 4.49]
    },
    note: "USDe peaked ~$14.8B Oct-2025; BUSD wound down after NYDFS halt (Feb-2023).",
    raw: "quant_stablecoins.json"
  },
  stablecoinShareNow: {
    asOf: "2026-06-16",
    data: [
      { name: "USDT", value: 186.3 },
      { name: "USDC", value: 75.0 },
      { name: "USDS", value: 8.2 },
      { name: "USD1", value: 4.57 },
      { name: "USDe", value: 4.49 },
      { name: "DAI", value: 4.40 },
      { name: "USYC", value: 3.08 },
      { name: "BUIDL", value: 3.03 },
      { name: "PYUSD", value: 2.74 },
      { name: "Others", value: 21.62 }
    ],
    raw: "quant_stablecoins.json"
  },

  // ---- 7. PERPETUALS ----
  perpsVolumeAnnual: {
    years: ["2021", "2022", "2023", "2024", "2025"],
    valueTrillions: [0.4, 0.6, 0.6476, 1.5, 7.9], // 2025 range $6.4–7.9T; using DefiLlama-derived 7.9T
    note: "2025 was the breakout year; monthly volume first crossed $1T in Oct-2025.",
    raw: "quant_perps.json"
  },
  hyperliquidShare: {
    labels: ["Dec-24", "May-25", "Aug-25", "Dec-25", "Jan-26", "Apr-26"],
    pct: [66, 71, 75, 38, 36.4, 44],
    note: "Share of on-chain perp-DEX volume. Compressed by Aster, Lighter, edgeX in late-2025.",
    raw: "quant_perps.json"
  },

  // ---- 8. STAKING / RESTAKING ----
  liquidStaking: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    lido: [0.01, 11.74, 5.88, 21.44, 32.52, 26.09, 16.13],
    rocketPool: [0, 0.625, 0.503, 1.567, 2.5, 1.736, 0.961],
    jito: [0, 0, 0.004, 0.648, 2.78, 1.78, 0.723],
    note: "Whole Liquid Staking category hit a record ~$86B on 14 Aug-2025 (>50% of all DeFi TVL).",
    raw: "quant_liquid_staking.json"
  },
  ethStaked: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    millionEth: [2.1, 8.8, 15.9, 29.7, 34.0, 36.08, 39.5],
    ratioPct: [1.9, null, 13.1, 15.6, 25.0, 29.3, 33.0],
    raw: "quant_liquid_staking.json"
  },
  restaking: {
    years: ["2023", "2024", "2025", "2026·Jun"],
    eigenlayer: [1.32, 14.91, 12.55, 4.99],
    etherfi: [0.10, 8.67, 8.08, 2.99],
    note: "EigenLayer ATH $22.1B (Aug-2025); deep 2026 unwind after points/airdrops ended & slashing went live.",
    raw: "quant_restaking.json"
  },

  // ---- 9. RWA ----
  rwa: {
    labels: ["2021", "2022", "2023", "2024", "2025", "2026·Mar", "2026·Jun"],
    totalExStable: [1.0, 5.0, 5.0, 15.2, 20.0, 25.0, 32.6],
    tokenizedTreasuries: [null, null, 0.845, 2.4, 7.3, null, 14.95],
    raw: "quant_rwa.json"
  },
  rwaLeadersNow: {
    asOf: "2026-06-16",
    data: [
      { name: "Circle USYC", value: 3.08 },
      { name: "Tether Gold (XAUt)", value: 3.07 },
      { name: "BlackRock BUIDL", value: 3.03 },
      { name: "Ondo (USDY+OUSG)", value: 2.70 },
      { name: "Paxos Gold", value: 1.97 },
      { name: "Centrifuge", value: 1.64 },
      { name: "Franklin BENJI", value: 1.98 }
    ],
    raw: "map_rwa.json"
  },

  // ---- 10. YIELD ----
  yield: {
    years: ["2021", "2022", "2023", "2024", "2025", "2026·Jun"],
    pendle: [0.034, 0.015, 0.234, 4.42, 3.73, 1.18],
    convex: [19.19, 3.0, 1.86, 1.24, 0.92, 0.53],
    yearn: [4.09, 0.358, 0.333, 0.243, 0.395, 0.151],
    note: "Pendle ATH $13.4B (Sep-2025). Generational shift from auto-compounders (Yearn/Convex) to yield-tokenization + curated vaults.",
    raw: "quant_yield.json"
  },

  // ---- 11. BRIDGES ----
  bridgesNow: {
    asOf: "2026-06-16",
    data: [
      { name: "LayerZero V2", value: 7.61 },
      { name: "WBTC", value: 7.49 },
      { name: "Hyperliquid Bridge", value: 5.91 },
      { name: "Coinbase Bridge", value: 5.59 },
      { name: "Binance Bitcoin", value: 4.48 },
      { name: "USDT0", value: 3.66 },
      { name: "Wormhole/Portal", value: 2.14 },
      { name: "Chainlink CCIP", value: 1.26 }
    ],
    note: "Total Bridge category ~$46.7B across 166 protocols (mixes custodial/wrapped bridges). Multichain (ATH $10.5B, Jan-2022) collapsed in 2023.",
    raw: "quant_bridges.json"
  },
  bridgeHacks: {
    note: "Cross-chain bridges were ~69% of all crypto theft in 2022 (~$2B).",
    raw: "quant_bridges.json"
  },

  // ---- 12. USERS ----
  users: {
    years: ["2019", "2020", "2021", "2022", "2023", "2024", "2025/26"],
    cumulativeAddressesM: [0.02, 1.0, 20.9, 35.8, 50.4, 150.8, 332.6],
    note: "Cumulative unique addresses (Dune/rchen8). OVERESTIMATES real users — addresses ≠ people.",
    raw: "quant_users.json"
  },
  activeUsers: {
    labels: ["MAA all-crypto 2023", "MAA peak Sep-24", "MAA 2025", "Active users 2024", "Active users 2025"],
    millions: [65, 220, 181, 45, 55],
    note: "a16z: 716M crypto owners (2025) but only ~40–70M monthly active. DeFi ≈ 34% of daily on-chain activity.",
    raw: "quant_users.json"
  },

  // ---- 13. FEES & REVENUE ----
  feesRevenue: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026·YTD"],
    fees: [0.32, 7.37, 7.58, 8.96, 17.38, 27.2, 9.73],
    revenue: [0.017, 2.65, 4.03, 6.19, 10.06, 14.59, 5.96],
    note: "All-time cumulative: $111B fees / $61B protocol revenue. Stablecoin issuers ≈ 39% of current fees.",
    raw: "quant_fees_revenue.json"
  },

  // ---- 14. SECURITY / HACKS ----
  hacksAnnual: {
    years: ["2020", "2021", "2022", "2023", "2024", "2025"],
    totalStolen: [0.52, 3.2, 3.8, 1.7, 2.2, 3.4],          // all crypto (Chainalysis)
    defiOnly: [null, 2.3, 2.62, null, 0.534, 0.680],        // DeFi-protocol only (Immunefi)
    note: "2025 record ($3.4B) driven by the ~$1.5B Bybit hack; DeFi-protocol losses fell to ~$0.68B as security improved.",
    raw: "quant_hacks.json"
  },
  biggestHacks: {
    data: [
      { name: "Bybit (2025)", value: 1500 },
      { name: "Ronin (2022)", value: 625 },
      { name: "Poly Network (2021)", value: 611 },
      { name: "BNB Bridge (2022)", value: 570 },
      { name: "FTX drain (2022)", value: 450 },
      { name: "Wormhole (2022)", value: 325 },
      { name: "Euler (2023)", value: 197 }
    ],
    unit: "USD millions",
    raw: "quant_hacks.json"
  },

  // ---- 15. DEVELOPERS ----
  developers: {
    years: ["2015", "2018", "2020", "2021", "2022", "2023", "2024", "2025"],
    monthlyActive: [1000, 4000, 9000, 18000, 23343, 22411, 23613, 25000],
    defiDevs: [null, null, 606, 2500, 3901, null, 3532, null],
    note: "Electric Capital. Peak monthly-active ~26k (mid-2022). Solana led NEW devs in 2024; India became #1 source of new devs.",
    raw: "quant_developers.json"
  },

  // ---- ERAS (narrative bands for the TVL cycle chart) ----
  eras: [
    { name: "DeFi Summer", period: "2020", summary: "COMP liquidity mining ignites yield farming; UNI airdrop, Yearn, SushiSwap." },
    { name: "2021 Bull / DeFi 2.0", period: "2021", summary: "Uniswap v3, OlympusDAO POL, the Curve Wars; TVL ATH ~$178B." },
    { name: "The Great Unwind", period: "2022", summary: "Terra/UST, 3AC, Celsius and FTX collapse; TVL falls ~78%." },
    { name: "Recovery & LSDfi", period: "2023", summary: "Shapella unlocks staking withdrawals; liquid staking becomes #1 category; Base launches." },
    { name: "Restaking, L2s & ETFs", period: "2024", summary: "EigenLayer + points meta, spot BTC & ETH ETFs, Hyperliquid's HYPE airdrop." },
    { name: "RWA, Stablecoin Law & Institutional DeFi", period: "2025–26", summary: "GENIUS Act, tokenized Treasuries scale, Wall Street goes on-chain; Bybit hack." }
  ],

  // ---- TIMELINE EVENTS (key cycle events) ----
  timeline: [
    { date: "2017-12", title: "MakerDAO launches DAI", desc: "First widely-used decentralized stablecoin and the CDP primitive." },
    { date: "2018-11", title: "Uniswap v1", desc: "AMM model (x·y=k) makes permissionless swaps + liquidity provision trivial." },
    { date: "2020-06", title: "Compound COMP → DeFi Summer", desc: "Liquidity mining invents the yield-farming go-to-market." },
    { date: "2020-09", title: "Uniswap UNI airdrop", desc: "400 UNI to 250k+ past users sets the retroactive-airdrop standard." },
    { date: "2021-05", title: "Uniswap v3", desc: "Concentrated liquidity dramatically improves AMM capital efficiency." },
    { date: "2021-11", title: "DeFi TVL ATH ~$178B", desc: "Curve Wars peak; cyclical top of the 2021 bull market." },
    { date: "2022-05", title: "Terra / UST collapse", desc: "Algorithmic stablecoin death spiral wipes ~$40–50B; contagion begins." },
    { date: "2022-09", title: "Ethereum 'The Merge'", desc: "Switch to proof-of-stake; staked ETH becomes a native yield asset." },
    { date: "2022-11", title: "FTX collapses", desc: "~$8B customer shortfall; defining event of the bear market, boosts self-custody/DeFi thesis." },
    { date: "2023-03", title: "USDC depegs (SVB)", desc: "$3.3B reserves stuck at failed SVB; USDC to ~$0.87, drags DAI; recovers after backstop." },
    { date: "2023-04", title: "Shapella → LSDfi", desc: "Staking withdrawals enabled; liquid staking becomes DeFi's largest category." },
    { date: "2023-06", title: "EigenLayer launches restaking", desc: "New shared-security (AVS) primitive; centerpiece of the 2024 points meta." },
    { date: "2023-08", title: "Coinbase Base mainnet", desc: "Major regulated L2 seeds a wave of consumer DeFi and memecoins." },
    { date: "2024-01", title: "Spot Bitcoin ETFs approved", desc: "Regulated TradFi on-ramp pulls institutional capital into crypto." },
    { date: "2024-03", title: "BlackRock BUIDL", desc: "Tokenized money-market fund validates RWA tokenization at institutional scale." },
    { date: "2024-07", title: "Spot Ethereum ETFs trade", desc: "Regulated access to ETH, the collateral asset of most DeFi." },
    { date: "2024-11", title: "Hyperliquid HYPE airdrop", desc: "~$1.6B airdrop launches the high-performance perp-DEX era." },
    { date: "2025-02", title: "Bybit hacked ~$1.5B", desc: "Largest crypto heist ever (Lazarus); record annual theft year." },
    { date: "2025-07", title: "GENIUS Act signed", desc: "First U.S. federal stablecoin framework; legitimizes dollar stablecoins — DeFi's liquidity layer." },
    { date: "2025-12", title: "RWA tokenization ≈ $20B (ex-stablecoins)", desc: "Institutional DeFi consolidates; tokenized Treasuries are Wall Street's gateway. (Scaled to ~$32B by mid-2026.)" }
  ],

  // ---- REGULATION TIMELINE ----
  regulation: [
    { date: "2022-03", title: "Fed begins aggressive rate hikes", impact: "Risk-free yields rise above on-chain returns; capital flees DeFi, TVL collapses toward ~$40B." },
    { date: "2022-08", title: "OFAC sanctions Tornado Cash", impact: "First time immutable smart contracts were sanctioned; existential question for DeFi privacy tools." },
    { date: "2023-06", title: "SEC sues Coinbase; EU MiCA in force", impact: "Peak 'regulation by enforcement' in the US; EU gets the first comprehensive crypto framework." },
    { date: "2024-01", title: "Spot BTC ETFs approved", impact: "Institutional on-ramp; new bull cycle lifts DeFi liquidity." },
    { date: "2024-04", title: "SEC Wells notice to Uniswap Labs", impact: "Most direct enforcement threat ever aimed at core DeFi infrastructure." },
    { date: "2024-06", title: "MiCA stablecoin rules apply", impact: "EU venues pushed toward compliant stablecoins; pressure on USDT in Europe." },
    { date: "2024-11", title: "5th Circuit: OFAC overstepped on Tornado Cash", impact: "Ownerless code is not sanctionable 'property' — landmark DeFi win." },
    { date: "2025-01", title: "Gensler departs; EO 14178; SAB 121 rescinded", impact: "Policy pivot: CBDC ban clears the field for private stablecoins; banks can custody crypto." },
    { date: "2025-02", title: "SEC drops Coinbase case & Uniswap probe", impact: "Removes the broadest securities-law threat to DeFi tokens." },
    { date: "2025-03", title: "OFAC delists Tornado Cash", impact: "First reversal of smart-contract sanctions." },
    { date: "2025-07", title: "GENIUS Act signed; House passes CLARITY Act", impact: "Federal stablecoin law + market-structure bill advancing — DeFi gets a friendlier US regime." },
    { date: "2025-08", title: "Roman Storm partial verdict", impact: "Developer-liability uncertainty persists for open-source DeFi builders." }
  ],

  regulationEras: [
    { name: "Macro Reckoning & Crypto Winter", period: "2022-03 → 2023-01" },
    { name: "Regulation by Enforcement", period: "2022-08 → 2024-12" },
    { name: "The Great Policy Pivot", period: "2025-01 → 2025-12" }
  ],

  // ---- PROTOCOL / CATEGORY LEADERSHIP MAP ----
  categoryMap: [
    { key: "dex", title: "DEXs", raw: "map_dex.json",
      leaders: "Uniswap (v2/v3/v4), PancakeSwap, Aerodrome (Base), Curve, Jupiter (Solana agg.), Raydium, Orca, Fluid, Hyperliquid spot",
      shift: "2021 Uniswap-dominant → 2024-26 multi-chain: PancakeSwap rivals Uniswap, Aerodrome owns Base, Solana stack surges via Jupiter routing; DEX/CEX spot ratio at record highs (~29%)." },
    { key: "lending", title: "Lending & borrowing", raw: "map_lending.json",
      leaders: "Aave (~60% of borrows / ~36–42% of lending-category TVL), Spark (Sky), Morpho, Compound, JustLend (Tron), Kamino (Solana), Euler V2",
      shift: "MakerDAO/Compound pioneers → Aave entrenched as pooled incumbent; growth shifts to modular/isolated markets (Morpho Blue + curated Vaults, Euler V2)." },
    { key: "stablecoins", title: "Stablecoins", raw: "map_stablecoins.json",
      leaders: "USDT (~58%), USDC (~24%), USDS+DAI (Sky), USDe (Ethena), USD1, PYUSD; tokenized-Treasury dollars BUIDL/USYC/USDY",
      shift: "Algo experiments died (Terra 2022); USDC's SVB scare reset trust to USDT (2023); post-2024 = fiat duopoly at the top with a Cambrian explosion of yield-bearing/synthetic/RWA challengers." },
    { key: "staking_restaking", title: "Liquid staking & restaking", raw: "map_staking_restaking.json",
      leaders: "Lido (~$16B), Binance staked ETH, Rocket Pool, Jito (Solana); EigenLayer (~90% of restaking), ether.fi (LRT leader), Symbiotic",
      shift: "Lido dominates LSTs (share down to ~24%); restaking exploded to ~$22B (2024) then unwound as points ended and real AVS yield lagged." },
    { key: "perps", title: "Perpetuals & derivatives", raw: "map_perps_derivs.json",
      leaders: "Hyperliquid (~38–44% share), Aster, dYdX, GMX, Jupiter Perps, Drift, Vertex, Lighter; options: Aevo, Lyra/Derive",
      shift: "dYdX/GMX duopoly (2021-23) → Hyperliquid dominance (flipped both by 2024); on-chain orderbooks displace oracle-pool AMMs; new venues fragment the top in 2026." },
    { key: "rwa", title: "RWA & tokenization", raw: "map_rwa.json",
      leaders: "Circle USYC, BlackRock BUIDL, Ondo, Franklin BENJI, Tether/Paxos Gold, Centrifuge, Maple; xStocks (equities)",
      shift: "DeFi-native originators (Centrifuge/MakerDAO) → TradFi giants (BlackRock, Franklin, Invesco, Circle). USYC overtook BUIDL in Mar-2026." },
    { key: "yield", title: "Yield, vaults & structured products", raw: "map_yield.json",
      leaders: "Pendle (yield tokenization), Ethena USDe (synthetic-dollar yield), Morpho Vaults (curated), Convex, Yearn, Beefy",
      shift: "Auto-compounders (Yearn/Convex) → vote-aggregation (Curve Wars) → yield tokenization + synthetic-dollar yield + curator vaults; points/airdrops drove 2024-25 demand." },
    { key: "bridges", title: "Bridges & interoperability", raw: "map_bridges_interop.json",
      leaders: "LayerZero (+Stargate), Wormhole, Chainlink CCIP, Axelar, Hyperlane; Across + Circle CCTP for transfers",
      shift: "Lock-and-mint bridges (2021) → 2022 hack crisis → messaging + native rollup bridges + intents/solvers (ERC-7683). CCIP is the breakout institutional rail." },
    { key: "cdp_synth", title: "CDP & synthetics", raw: "map_cdp_synth.json",
      leaders: "Sky (USDS/DAI, ~$5.9B), USDD (Tron), Liquity, crvUSD, GHO (Aave), Frankencoin; Synthetix pivoted to perps",
      shift: "Maker (DAI) + Synthetix (synths) led 2020-21; algo/leverage stables died in 2022; today a one-giant (Sky) CDP market and the synthetic-asset thesis dissolved into perps." },
    { key: "aggregators", title: "Aggregators, intents & frontends", raw: "map_aggregators_frontends.json",
      leaders: "Jupiter (Solana, ~30% of all-chain agg.), KyberSwap (Ethereum lead), CoW Swap, 1inch, OKX Swap, 0x, DFlow",
      shift: "1inch king (2021-22) → Jupiter dominates by volume on Solana; intents (CoW, Fusion) go mainstream; EVM leadership is incentive-volatile and chain-segmented." }
  ],

  // ---- CONFERENCES (last 12 months: Jun-2025 → Jun-2026) ----
  conferenceThemeTally: {
    note: "Editor's tally of how many of the surveyed conferences foregrounded each DeFi theme.",
    data: [
      { name: "Stablecoins", value: 21 },
      { name: "RWA / Tokenization", value: 20 },
      { name: "Institutional DeFi / TradFi convergence", value: 20 },
      { name: "Regulation & policy", value: 13 },
      { name: "AI agents / DeFAI", value: 11 },
      { name: "Lending & on-chain credit", value: 9 },
      { name: "Perps / derivatives", value: 7 },
      { name: "Restaking / staking", value: 6 }
    ]
  },
  conferences: [
    { key: "ethcc8", name: "EthCC[8]", loc: "Cannes, France", dates: "Jun 30–Jul 3, 2025", inWindow: true, attendance: "~6.5k (10k week)",
      themes: ["Stablecoins as infrastructure", "Institutional 'onchain finance'", "Aave V4 hub-and-spoke", "RWA Summit", "DeFAI"],
      speakers: "Vitalik Buterin, Stani Kulechov, Sergey Nazarov, Vlad Tenev (Robinhood), SG-Forge", raw: "conf_ethcc8.json" },
    { key: "permissionless", name: "Permissionless IV", loc: "Brooklyn, NY", dates: "Jun 24–26, 2025", inWindow: true, attendance: "~5k",
      themes: ["DeFi Renaissance track", "Aave V4 Horizon (permissioned RWA)", "Stablecoins 'first PMF'", "Prediction markets (Kalshi)", "DAT companies"],
      speakers: "Hayden Adams, Stani Kulechov, Sreeram Kannan, Samara Cohen (BlackRock), Tarek Mansour", raw: "conf_permissionless.json" },
    { key: "bbw_dappcon25", name: "DappCon (Berlin BW)", loc: "Berlin, Germany", dates: "Jun 16–18, 2025", inWindow: true, attendance: "~900",
      themes: ["Capital efficiency", "Balancer V3 / ReCLAMM", "Aave V4 routing", "Regulated stablecoins (Monerium)"],
      speakers: "Stani Kulechov, Vitalik Buterin, Joseph Lubin, Martin Köppelmann", raw: "conf_bbw_dappcon25.json" },
    { key: "kbw25", name: "Korea Blockchain Week", loc: "Seoul, Korea", dates: "Sep 22–28, 2025", inWindow: true, attendance: "~12–13k",
      themes: ["Stablecoins (KRW)", "RWAfi", "Digital Asset Treasuries", "AI × DeFi", "US+Korea policy"],
      speakers: "Justin Sun, Charles Hoskinson, Jeff Yan (Hyperliquid), Arthur Hayes, Lily Liu", raw: "conf_kbw25.json" },
    { key: "mainnet25", name: "Mainnet 2025 (Messari)", loc: "New York, USA", dates: "Sep 30–Oct 2, 2025", inWindow: true, attendance: "~3k (2024)",
      themes: ["DeFi headline track", "RWAs & yield-bearing stablecoins", "Restaking repricing", "Institutional adoption"],
      speakers: "Not publicly itemized for 2025 (low confidence)", raw: "conf_mainnet25.json" },
    { key: "t2049_sg", name: "TOKEN2049 Singapore", loc: "Singapore", dates: "Oct 1–2, 2025", inWindow: true, attendance: "~25k (record)",
      themes: ["Stablecoins (>$45T volume)", "RWA mainstream", "Institutional DeFi", "Perp DEXs (Hyperliquid)", "DATs"],
      speakers: "Paolo Ardoino, Jeff Yan, Kain Warwick, Jesse Pollak, Arthur Hayes, Donald Trump Jr.", raw: "conf_t2049_sg.json" },
    { key: "money2020_25", name: "Money20/20 USA", loc: "Las Vegas, USA", dates: "Oct 26–29, 2025", inWindow: true, attendance: "~11k",
      themes: ["Stablecoins as payment rails (>$27T)", "TradFi × digital-asset convergence", "Tokenization", "GENIUS Act tailwinds"],
      speakers: "Michael Saylor, Circle, J.P. Morgan Kinexys, Mastercard, Western Union (USDPT)", raw: "conf_money2020_25.json" },
    { key: "cosmoverse25", name: "Cosmoverse 2025", loc: "Split, Croatia", dates: "Oct 30–Nov 1, 2025", inWindow: true, attendance: "n/a",
      themes: ["Stablecoins (Visa pilot)", "Digital Euro / CBDCs", "RWA tokenization", "Sovereign infra / IBC"],
      speakers: "ECB & Croatian National Bank advisors, Visa, Cosmos Labs, Fetch.ai", raw: "conf_cosmoverse25.json" },
    { key: "smartcon25", name: "Chainlink SmartCon", loc: "New York, USA", dates: "Nov 4–5, 2025", inWindow: true, attendance: "~1.7k",
      themes: ["TradFi-DeFi 'AllFi'", "RWA tokenization (UBS, Securitize)", "CCIP cross-chain settlement (DvP)", "Perp economy", "Compliance (ACE)"],
      speakers: "Sergey Nazarov, Stani Kulechov, Swift CIO, UBS, JPMorgan Kinexys, VanEck", raw: "conf_smartcon25.json" },
    { key: "cardano_summit25", name: "Cardano Summit 2025", loc: "Berlin, Germany", dates: "Nov 12–13, 2025", inWindow: true, attendance: "~800 (25k online)",
      themes: ["Stablecoins (institutional)", "DeFi liquidity (2026 roadmap)", "RWA tokenization", "Regulated stablecoins (Brale)"],
      speakers: "Charles Hoskinson / Frederik Gregaard, Mastercard, Crypto.com, EMURGO, Tim Draper", raw: "conf_cardano_summit25.json" },
    { key: "devconnect_ba", name: "Devconnect Argentina", loc: "Buenos Aires", dates: "Nov 17–22, 2025", inWindow: true, attendance: "~14k",
      themes: ["Stablecoins as the consumer 'front-end'", "Consumer DeFi (Aave App)", "On-chain credit", "DeFi Security Summit", "DeFAI"],
      speakers: "Vitalik Buterin, Stani Kulechov, Danny Ryan, Merlin Égalité (Morpho), Mike Silagadze", raw: "conf_devconnect_ba.json" },
    { key: "breakpoint25", name: "Solana Breakpoint", loc: "Abu Dhabi, UAE", dates: "Dec 11–13, 2025", inWindow: true, attendance: "~7k",
      themes: ["Yield-bearing stablecoins (JupUSD)", "Institutional on-chain capital markets", "RWA >$2B on Solana", "Jupiter Lend $1B/8d", "Phoenix Perps"],
      speakers: "Anatoly Yakovenko, Jeremy Allaire (Circle), Multicoin, Ellipsis Labs, Paxos", raw: "conf_breakpoint25.json" },
    { key: "consensus", name: "Consensus (HK + Miami)", loc: "Hong Kong / Miami", dates: "Feb 10–12 & May 5–7, 2026", inWindow: true, attendance: "~20k (Miami)",
      themes: ["'Internet Capital Markets'", "RWA engine (>$31B)", "Stablecoin University", "Agentic commerce (x402)", "Wall Street arrives"],
      speakers: "SEC Chair Paul Atkins, CFTC Chair Selig, BlackRock, Morgan Stanley, Ripple, Solana", raw: "conf_consensus.json" },
    { key: "ethdenver26", name: "ETHDenver 2026", loc: "Denver, USA", dates: "Feb 18–21, 2026", inWindow: true, attendance: "~25k (smaller)",
      themes: ["'Less degen, more boardroom'", "Stablecoins as payment rails", "RWA / RealFi", "Vitalik on DeFi resilience", "AI × DeFi"],
      speakers: "Vitalik Buterin, SEC Comm. Hester Peirce, White House (Patrick Witt), Jesse Pollak, Caitlin Long", raw: "conf_ethdenver26.json" },
    { key: "das", name: "Digital Asset Summit (DAS)", loc: "London 2025 / NYC 2026", dates: "Oct 13–15, 2025 & Mar 24–26, 2026", inWindow: true, attendance: "~2.5k ($4.2T AUM)",
      themes: ["Onchain institutional finance", "RWA (BlackRock, JPMorgan settling onchain)", "Stablecoins & payments", "DeFi & risk management"],
      speakers: "SEC Chair Atkins, Fed Gov. Miran, BNY CEO, BlackRock, Morgan Stanley, Tether, Binance", raw: "conf_das.json" },
    { key: "hkw3_26", name: "Hong Kong Web3 Festival", loc: "Hong Kong", dates: "Apr 20–23, 2026", inWindow: true, attendance: "~20k",
      themes: ["TradFi × crypto convergence", "Stablecoins & Web3 payments", "Compliant RWA", "Institutional digital wealth", "AI × crypto"],
      speakers: "Vitalik Buterin, Yi He & Richard Teng (Binance), Lily Liu, BlackRock, Ondo, HK SFC", raw: "conf_hkw3_26.json" },
    { key: "pbw26", name: "Paris Blockchain Week", loc: "Paris, France", dates: "Apr 15–16, 2026", inWindow: true, attendance: "~10k",
      themes: ["Stablecoins & 24/7 settlement", "RWA 'trillion-dollar layer'", "TradFi-DeFi convergence", "MiCA / EU-vs-US regulation", "Tokenized IPO/equities"],
      speakers: "Pres. Emmanuel Macron, BlackRock, J.P. Morgan, Deutsche Bank, Circle, Amundi, 1inch", raw: "conf_pbw26.json" },
    { key: "t2049_dubai", name: "TOKEN2049 Dubai", loc: "Dubai, UAE", dates: "Apr 29–30, 2026", inWindow: true, attendance: "~15k",
      themes: ["Stablecoins (~$250B)", "RWA tokenization", "'DeFi eating CeFi'", "Decentralized AI", "Capital discipline"],
      speakers: "CZ, Richard Teng, Paolo Ardoino, Jeremy Allaire, Arthur Hayes, Dan Morehead", raw: "conf_t2049_dubai.json" },
    { key: "stablecon25", name: "Stablecon (EMEA)", loc: "Amsterdam, NL", dates: "May 19–20, 2026", inWindow: true, attendance: "~600",
      themes: ["TradFi-DeFi convergence", "Stablecoins as 'invisible infrastructure'", "Yield-bearing stablecoins", "RWA collateral", "Emerging-market payments"],
      speakers: "Deutsche Bank, Visa, Citi, Mastercard, Ripple, Coinbase, Bank of Ghana", raw: "conf_stablecon25.json" },
    { key: "avax_summit", name: "Avalanche Summit (London)", loc: "London, UK", dates: "May 20–22, 2025", inWindow: false, attendance: "~1.5k",
      themes: ["Aave V4 unveil", "Institutional DeFi liquidity", "Scaling DeFi beyond billions", "DeFi regulation (Owl Explains)"],
      speakers: "Emin Gün Sirer, Stani Kulechov, Anthony Scaramucci, Dragonfly", raw: "conf_avax_summit.json", note: "Just before window (nearest completed flagship)." },
    { key: "sui_basecamp26", name: "Sui Basecamp", loc: "Dubai 2025 / Singapore 2026?", dates: "May 1–2, 2025 (2026: Oct 7–8)", inWindow: false, attendance: "~2k (2025)",
      themes: ["DeFi on Sui (DEX/lending)", "Stablecoins (FDUSD, suiUSDe)", "BTCfi (Babylon)", "Institutional adoption"],
      speakers: "Evan Cheng, NAVI Protocol, Babylon Labs, Raoul Pal", raw: "conf_sui_basecamp26.json", note: "2026 edition officially set for Oct 7–8 (Singapore, with TOKEN2049); 2025 edition just before window." },
    { key: "others_catchall", name: "Others (catch-all)", loc: "Global", dates: "Jun-2025 → Jun-2026", inWindow: true, attendance: "varies",
      themes: ["Consensus Toronto, ETHGlobal, DeFi Security Summit, regional Web3 weeks", "BTCFi", "DeFi Renaissance"],
      speakers: "Cross-event; see raw file", raw: "conf_others_catchall.json" }
  ]
};

/* ---- Source provenance + raw-file manifest (compiled 2026-06-16; see CORRECTIONS_AUDIT.md) ---- */
window.DEFI_DATA.sourcesByRaw = {
  "conf_avax_summit.json": [
    {
      "name": "Avalanchesummitlondon",
      "url": "https://www.avalanchesummitlondon.com/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Intelligenthq",
      "url": "https://www.intelligenthq.com/avalanche-london-summit-2025-a-gathering-of-blockchain-innovators-and-visionaries/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Chainwire",
      "url": "https://chainwire.org/2025/03/12/avalanche-london-summit-first-speakers-announced/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Ainvest",
      "url": "https://www.ainvest.com/news/avalanche-london-summit-2025-gather-1500-blockchain-leaders-2503/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_bbw_dappcon25.json": [
    {
      "name": "Cryptoevents",
      "url": "https://cryptoevents.global/dappcon-25/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Coinpedia",
      "url": "https://events.coinpedia.org/dappcon-2025-6389/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Dappcon",
      "url": "https://dappcon.io/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Icoholder",
      "url": "https://icoholder.com/en/events/dappcon-berlin-2025-29269",
      "asOf": "2026-06-16"
    }
  ],
  "conf_breakpoint25.json": [
    {
      "name": "Solana",
      "url": "https://solana.com/news/solana-breakpoint-2025",
      "asOf": "2026-06-16"
    },
    {
      "name": "Incrypted",
      "url": "https://incrypted.com/en/solana-breakpoint-2025-key-announcements-and-speeches-from-day-one/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Coinpedia",
      "url": "https://coinpedia.org/news/jupiter-unveils-jupusd-stablecoin-and-major-defi-upgrades-at-solana-breakpoint-2025/",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/web3/2025/10/08/solana-s-jupiter-to-develop-jupusd-stablecoin-with-backing-from-ethena-labs",
      "asOf": "2026-06-16"
    }
  ],
  "conf_cardano_summit25.json": [
    {
      "name": "Cardanofoundation",
      "url": "https://cardanofoundation.org/blog/cardano-summit-2025-berlin",
      "asOf": "2026-06-16"
    },
    {
      "name": "Business Wire",
      "url": "https://www.businesswire.com/news/home/20251117496852/en/Cardano-Summit-2025-Concludes-In-Berlin-Trust-Emerges-As-The-Winner-with-Traditional-Financial-Firms-Feeling-Blockchain-FOMO",
      "asOf": "2026-06-16"
    },
    {
      "name": "Crypto-reporter",
      "url": "https://www.crypto-reporter.com/press-releases/cardano-summit-day-two-recap-trust-and-digital-identity-to-drive-blockchain-towards-enterprise-adoption-116717/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Cardano",
      "url": "https://summit.cardano.org/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_consensus.json": [
    {
      "name": "CoinDesk",
      "url": "https://consensus.coindesk.com/agenda-at-a-glance/",
      "asOf": "2026-06-16"
    },
    {
      "name": "KuCoin",
      "url": "https://www.kucoin.com/blog/consensus-Miami-2026",
      "asOf": "2026-06-16"
    },
    {
      "name": "Cryptotimes",
      "url": "https://www.cryptotimes.io/2026/05/02/20000-expected-in-miami-the-wall-street-crypto-convergence-at-consensus-2026/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Theblockverse",
      "url": "https://www.theblockverse.co/consensus-miami/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_cosmoverse25.json": [
    {
      "name": "Cryptonomist",
      "url": "https://en.cryptonomist.ch/2025/12/06/cosmoverse-2025-web3-conferences/",
      "asOf": "2026-06-16"
    },
    {
      "name": "BeInCrypto",
      "url": "https://beincrypto.com/cosmoverse-2025-split-croatia/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Coinpedia",
      "url": "https://events.coinpedia.org/cosmoverse-balkans-2025-7095/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Cosmoverse",
      "url": "https://www.cosmoverse.org/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_das.json": [
    {
      "name": "Business Wire",
      "url": "https://www.businesswire.com/news/home/20260304059961/en/US-SEC-Chairman-to-Headline-Blockworks-Digital-Asset-Summit-New-York",
      "asOf": "2026-03-04"
    },
    {
      "name": "Blockworks",
      "url": "https://blockworks.com/event/digital-asset-summit-nyc-2026",
      "asOf": "2026-06-16"
    },
    {
      "name": "SEC",
      "url": "https://www.sec.gov/newsroom/speeches-statements/atkins-remarks-digital-asset-summit-032426",
      "asOf": "2026-03-24"
    },
    {
      "name": "Natlawreview",
      "url": "https://natlawreview.com/press-releases/us-sec-chairman-headline-blockworks-digital-asset-summit-new-york",
      "asOf": "2026-06-16"
    }
  ],
  "conf_devconnect_ba.json": [
    {
      "name": "Devconnect",
      "url": "https://devconnect.org/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Ethereum",
      "url": "https://blog.ethereum.org/en/2025/03/05/devconnect-2025",
      "asOf": "2026-06-16"
    },
    {
      "name": "Luma",
      "url": "https://luma.com/lklh3u0v",
      "asOf": "2026-06-16"
    },
    {
      "name": "Fortune",
      "url": "https://fortune.com/2025/11/17/aave-app-stani-kulechov-defi-lending-borrowing-protocol/",
      "asOf": "2025-11-17"
    }
  ],
  "conf_ethcc8.json": [
    {
      "name": "EthCC",
      "url": "https://ethcc.io/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Palaisdesfestivals",
      "url": "https://en.palaisdesfestivals.com/press-area/press-releases/the-ethereum-community-conference-chooses-cannes-for-its-8th-edition-from-30-june-to-3-july-2025/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Mexc",
      "url": "https://www.mexc.com/learn/article/ethcc-cannes-everything-you-need-to-know-about-the-ethereum-conference/1",
      "asOf": "2026-06-16"
    },
    {
      "name": "Aicoin",
      "url": "https://www.aicoin.com/en/article/473355",
      "asOf": "2026-06-16"
    }
  ],
  "conf_ethdenver26.json": [
    {
      "name": "ETHDenver",
      "url": "https://ethdenver.com/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Nationalwesterncenter",
      "url": "https://nationalwesterncenter.com/event/ethdenver-2026/2026-02-21/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Coinpedia",
      "url": "https://events.coinpedia.org/ethdenver-2026-7876/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Blockchainreporter",
      "url": "https://blockchainreporter.net/eth-denver/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_hkw3_26.json": [
    {
      "name": "GlobeNewswire",
      "url": "https://www.globenewswire.com/news-release/2026/04/13/3272776/0/en/Hong-Kong-Web3-Festival-Unveils-2026-Full-Schedule-4-Days-of-Insight-Driven-Forums-with-Vitalik-Yi-He-Justin-Sun-Lily-Liu-and-More.html",
      "asOf": "2026-04-13"
    },
    {
      "name": "Web3festival",
      "url": "https://www.web3festival.org/hongkong2026/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Mexc",
      "url": "https://www.mexc.com/news/1022836",
      "asOf": "2026-06-16"
    },
    {
      "name": "Milantribune",
      "url": "https://milantribune.com/hong-kong-web3-festival-2026-concludes-a-resounding-success-for-global-web3-collaboration/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_kbw25.json": [
    {
      "name": "Korea Blockchain Week",
      "url": "https://koreablockchainweek.com/blogs/blog/korea-blockchain-week-2025-returns-to-seoul-in-september",
      "asOf": "2026-06-16"
    },
    {
      "name": "PR Newswire",
      "url": "https://www.prnewswire.com/news-releases/kbw-2025-presents-convergence-of-washington-policymakers-institutions-and-aicrypto-innovation-in-seoul-302543041.html",
      "asOf": "2026-06-16"
    },
    {
      "name": "KuCoin",
      "url": "https://www.kucoin.com/news/flash/korea-blockchain-week-2025-attracts-12-000-attendees-and-300-speakers-sets-new-collaboration-benchmarks",
      "asOf": "2025-09"
    },
    {
      "name": "Lksbrothers",
      "url": "https://www.lksbrothers.com/post/highlights-from-korea-blockchain-week-2025-decentralization-innovation-and-unexpected-standouts",
      "asOf": "2026-06-16"
    }
  ],
  "conf_mainnet25.json": [
    {
      "name": "Messari",
      "url": "https://events.messari.io/mainnet2025 (official Mainnet 2025 event site; not retrievable / 404 at time of research)",
      "asOf": "2026-06-16"
    },
    {
      "name": "Luma",
      "url": "https://luma.com/mainnet (Mainnet calendar: New York City, Sept 30 – Oct 2; host @messaricrypto)",
      "asOf": "2026-06-16"
    },
    {
      "name": "Silicon",
      "url": "https://silicon.nyc/mainnet-an-immersive-trend-setting-crypto-summit-in-nyc-sept-21-23/ (NYC summit, dates header 'Sept 30 - Oct 2nd')",
      "asOf": "2026-06-16"
    },
    {
      "name": "Pier36nyc",
      "url": "https://pier36nyc.com/private-events/messari-mainnet/ (venue: Pier 36 NYC hosts Messari Mainnet)",
      "asOf": "2026-06-16"
    }
  ],
  "conf_money2020_25.json": [
    {
      "name": "Money20/20",
      "url": "https://us.money2020.com/media/newsroom/pr-10-30-2025-money2020-usa-closes",
      "asOf": "2026-06-16"
    },
    {
      "name": "Western Union",
      "url": "https://ir.westernunion.com/news/archived-press-releases/press-release-details/2025/Western-Union-Announces-USDPT-Stablecoin-on-Solana-and-Digital-Asset-Network/default.aspx",
      "asOf": "2026-06-16"
    },
    {
      "name": "Business Wire",
      "url": "https://www.businesswire.com/news/home/20251030444503/en/Money2020-USA-2025-Closes-With-a-Future-Ready-Fintech-Ecosystem-AI-Stablecoins-and-Infrastructure-Take-the-Lead",
      "asOf": "2026-06-16"
    },
    {
      "name": "Biztechmagazine",
      "url": "https://biztechmagazine.com/article/2025/10/money2020-2025-increasing-use-stablecoins-shows-no-sign-slowing-down",
      "asOf": "2026-06-16"
    }
  ],
  "conf_others_catchall.json": [
    {
      "name": "Business Wire",
      "url": "https://www.businesswire.com/news/home/20250603416817/en/Blockworks-Permissionless-IV-to-Unite-DeFis-Top-Developers-and-Builders-in-Brooklyn",
      "asOf": "2026-06-16"
    },
    {
      "name": "PR Newswire",
      "url": "https://www.prnewswire.com/news-releases/consensus-2025-wraps-in-toronto-with-eric-trump-302458221.html",
      "asOf": "2026-06-16"
    },
    {
      "name": "BeInCrypto",
      "url": "https://beincrypto.com/token2049-singapore-2025-sells-out/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Blockworks",
      "url": "https://blockworks.com/event/permissionless",
      "asOf": "2026-06-16"
    }
  ],
  "conf_pbw26.json": [
    {
      "name": "Paris Blockchain Week",
      "url": "https://www.parisblockchainweek.com/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Chainwire",
      "url": "https://chainwire.org/2026/03/03/paris-blockchain-week-2026-returns-to-bridge-institutions-and-digital-assets/",
      "asOf": "2026-06-16"
    },
    {
      "name": "KuCoin",
      "url": "https://www.kucoin.com/blog/Paris-blockchain-week-2026",
      "asOf": "2026-06-16"
    },
    {
      "name": "Cointribune",
      "url": "https://www.cointribune.com/en/macron-at-paris-blockchain-week-2026-a-historic-first-in-the-world-of-digital-assets/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_permissionless.json": [
    {
      "name": "Blockworks",
      "url": "https://blockworks.com/event/permissionless",
      "asOf": "2026-06-16"
    },
    {
      "name": "Business Wire",
      "url": "https://www.businesswire.com/news/home/20250603416817/en/Blockworks-Permissionless-IV-to-Unite-DeFis-Top-Developers-and-Builders-in-Brooklyn",
      "asOf": "2026-06-16"
    },
    {
      "name": "OurCryptoTalk",
      "url": "https://ourcryptotalk.com/news/permissionless-iv-in-brooklyn",
      "asOf": "2026-06-16"
    },
    {
      "name": "cryptoevents.global",
      "url": "https://cryptoevents.global/permissionless-iv-brooklyn/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_smartcon25.json": [
    {
      "name": "Chainlinktoday",
      "url": "https://chainlinktoday.com/chainlink-previews-smartcon-2025-agenda/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Vendelux",
      "url": "https://vendelux.com/insights/smartcon-2025-attendee-list/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Panewslab",
      "url": "https://www.panewslab.com/en/articles/60f6ab14-ff2d-47e3-9342-c46b5672fe3a",
      "asOf": "2026-06-16"
    },
    {
      "name": "Phemex",
      "url": "https://phemex.com/news/article/chainlink-smartcon-2025-to-explore-tradfi-and-defi-convergence-in-nyc-32437",
      "asOf": "2026-06-16"
    }
  ],
  "conf_stablecon25.json": [
    {
      "name": "Stablecon",
      "url": "https://stablecon.com/faq/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Coinpedia",
      "url": "https://events.coinpedia.org/stablecon-amesterdam-2026-7840/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Gdf",
      "url": "https://www.gdf.io/events/stablecon/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Arkrepublic",
      "url": "https://www.arkrepublic.com/2026/05/27/a-seat-at-stablecon/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_sui_basecamp26.json": [
    {
      "name": "Sui",
      "url": "https://blog.sui.io/sui-basecamp-2025-lands-in-dubai/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Chainwire",
      "url": "https://chainwire.org/2025/03/28/sui-basecamp-2025-lands-in-dubai-with-hands-on-access-to-suiplay0x1-and-other-unveils/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Financemagnates",
      "url": "https://www.financemagnates.com/thought-leadership/sui-reveals-initial-wave-of-speakers-famed-venue-for-first-annual-basecamp-event/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Cryptoevents",
      "url": "https://cryptoevents.global/sui-basecamp-2025-dubai/",
      "asOf": "2026-06-16"
    }
  ],
  "conf_t2049_dubai.json": [
    {
      "name": "TOKEN2049",
      "url": "https://www.token2049.com/dubai/agenda",
      "asOf": "2026-06-16"
    },
    {
      "name": "Coinpedia",
      "url": "https://events.coinpedia.org/token2049-dubai-2026-7329/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Tiger-research",
      "url": "https://reports.tiger-research.com/p/token2049-dubai-eng",
      "asOf": "2026-06-16"
    },
    {
      "name": "Odaily",
      "url": "https://www.odaily.news/en/post/5203814",
      "asOf": "2026-06-16"
    }
  ],
  "conf_t2049_sg.json": [
    {
      "name": "TOKEN2049",
      "url": "https://www.token2049.com/singapore",
      "asOf": "2026-06-16"
    },
    {
      "name": "Drofa-ra",
      "url": "https://www.drofa-ra.com/insider/token2049-singapore-2025-takeaways-stablecoins-tokenization-and-rwas",
      "asOf": "2026-06-16"
    },
    {
      "name": "Marinabaysands",
      "url": "https://www.marinabaysands.com/expo-and-convention/gallery/event-highlights/2025/10/highlights-from-token2049-singapore-2025.html",
      "asOf": "2026-06-16"
    },
    {
      "name": "Coinrank",
      "url": "https://www.coinrank.io/market/%E3%80%90token2049-singapore%E3%80%91rwas-bringing-global-markets-on-chain/",
      "asOf": "2026-06-16"
    }
  ],
  "map_aggregators_frontends.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/dex-aggregators",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Block",
      "url": "https://www.theblock.co/post/397278/ethereum-dex-aggregator-competitive-kyber-cowswap-gain",
      "asOf": "2025-01"
    },
    {
      "name": "Phemex",
      "url": "https://phemex.com/news/article/kyber-and-cowswap-gain-ground-in-ethereum-dex-aggregator-market-73616",
      "asOf": "2026-04-15"
    },
    {
      "name": "Solana",
      "url": "https://solanafloor.com/news/jupiter-reclaims-dominance-with-93-6-market-share-in-solana-s-aggregator-landscape",
      "asOf": "2025-11"
    }
  ],
  "map_bridges_interop.json": [
    {
      "name": "Openpr",
      "url": "https://www.openpr.com/news/4548823/chainlink-link-ccip-volume-jumps-1-972-to-18-billion-while",
      "asOf": "2026-03"
    },
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/bridges",
      "asOf": "2026-06-16"
    },
    {
      "name": "eco.com",
      "url": "https://eco.com/support/en/articles/11802670-best-cross-chain-intent-protocols-2026-how-intents-are-replacing-bridges",
      "asOf": "2026-04"
    },
    {
      "name": "Stablecoininsider",
      "url": "https://www.stablecoininsider.com/layerzero/",
      "asOf": "2026-04-01"
    }
  ],
  "map_cdp_synth.json": [
    {
      "name": "DefiLlama",
      "url": "https://stablecoins.llama.fi/stablecoins",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Block",
      "url": "https://www.theblock.co/post/313235/makerdao-mkr-sky-dai-stablecoin-usds",
      "asOf": "2024-09"
    },
    {
      "name": "Cointelegraph",
      "url": "https://cointelegraph.com/news/magic-internet-money-token-depegs-as-terra-luna-domino-effect-persists",
      "asOf": "2025-04"
    },
    {
      "name": "CoinGecko",
      "url": "https://www.coingecko.com/en/coins/frankencoin",
      "asOf": "2026-06-16"
    }
  ],
  "map_dex.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/dexs",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinGecko",
      "url": "https://www.coingecko.com/research/publications/cex-dex-trading-activity-report-2026",
      "asOf": "2026-01 / 2026-04"
    },
    {
      "name": "The Block",
      "url": "https://www.theblock.co/data/decentralized-finance/dex-non-custodial/dex-to-cex-spot-trade-volume",
      "asOf": "2025-11"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/tech/2025/11/13/leading-base-dex-aerodrome-merges-into-aero-in-major-overhaul",
      "asOf": "2025-11-13"
    }
  ],
  "map_lending.json": [
    {
      "name": "eco.com",
      "url": "https://eco.com/support/en/articles/14800882-best-defi-lending-protocols-2026-tvl-rates-risk",
      "asOf": "2026-04"
    },
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/protocol/morpho",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Defiant",
      "url": "https://thedefiant.io/news/defi/euler-finance-tvl-rises-38x-in-3-months",
      "asOf": "2026-04 (headline)"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/business/2025/03/14/euler-looks-to-build-on-v2-s-defi-lending-comeback-story",
      "asOf": "2026-06-16"
    }
  ],
  "map_perps_derivs.json": [
    {
      "name": "CoinGecko",
      "url": "https://www.coingecko.com/research/publications/state-of-crypto-perpetuals-report-2026",
      "asOf": "2026-06-16"
    },
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/perps",
      "asOf": "2026-06-16"
    },
    {
      "name": "Yellow",
      "url": "https://yellow.com/research/hyperliquid-perp-volume-dominance-how-2026",
      "asOf": "2026-06-16"
    },
    {
      "name": "Cointelegraph",
      "url": "https://cointelegraph.com/news/perpetuals-dex-volume-2025-onchain-derivatives-growth",
      "asOf": "2026-06-16"
    }
  ],
  "map_rwa.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/protocols/RWA",
      "asOf": "2026-06-16"
    },
    {
      "name": "Cryptopolitan",
      "url": "https://www.cryptopolitan.com/rwa-displace-dex-defi-tvl-rankings/",
      "asOf": "2025-12"
    },
    {
      "name": "Coincentral",
      "url": "https://coincentral.com/circle-usyc-overtakes-blackrock-buidl-as-largest-tokenized-treasury-fund/",
      "asOf": "2026-03-14"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/markets/2026/03/13/circle-overtakes-blackrock-in-tokenized-treasuries-as-market-hits-record-usd11-billion",
      "asOf": "2026-03-13"
    }
  ],
  "map_stablecoins.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/stablecoins",
      "asOf": "2026-06-16"
    },
    {
      "name": "Fool",
      "url": "https://www.fool.com/research/largest-stablecoins/",
      "asOf": "2026-06"
    },
    {
      "name": "CoinLaw",
      "url": "https://coinlaw.io/aave-statistics/",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinGecko",
      "url": "https://www.coingecko.com/en/coins/crvusd",
      "asOf": "2026-06-16"
    }
  ],
  "map_staking_restaking.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/protocol/lido",
      "asOf": "2026-06-16"
    },
    {
      "name": "Datawallet",
      "url": "https://www.datawallet.com/crypto/ethereum-staking-statistics-and-trends",
      "asOf": "2026-01-06"
    },
    {
      "name": "CCN",
      "url": "https://www.ccn.com/analysis/crypto/lido-loses-ground-staked-eth-market-share-falls/",
      "asOf": "2026-03"
    },
    {
      "name": "The Defiant",
      "url": "https://thedefiant.io/news/defi/liquid-staking-tvl-hits-record-usd86b-amid-eth-rally-and-growing-institutional-adoption",
      "asOf": "2026-06-16"
    }
  ],
  "map_yield.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/protocols/yield",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/markets/2025/08/09/pendle-s-tvl-hits-record-usd8-3b-after-yield-trading-platform-debut",
      "asOf": "2026-06-09"
    },
    {
      "name": "Crypto News Navigator",
      "url": "https://www.cryptonewsnavigator.com/academy/article/morpho-tvl-institutional-distribution-thesis",
      "asOf": "2026-05"
    },
    {
      "name": "Phemex",
      "url": "https://phemex.com/news/article/pendles-tvl-soars-to-58-billion-in-2025-up-79-yearonyear-42499",
      "asOf": "2026-06-16"
    }
  ],
  "narrative_regulation.json": [
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/policy/2024/05/21/uniswap-labs-urges-sec-to-drop-pending-enforcement-action-in-wells-response",
      "asOf": "2026-06-16"
    },
    {
      "name": "SEC",
      "url": "https://www.sec.gov/newsroom/speeches-statements/atkins-digital-finance-revolution-073125",
      "asOf": "2026-06-16"
    },
    {
      "name": "Mayerbrown",
      "url": "https://www.mayerbrown.com/en/insights/publications/2024/05/sec-approves-listings-of-spot-ether-etfs-waiting-is-the-hardest-part",
      "asOf": "2026-06-16"
    },
    {
      "name": "Thestreet",
      "url": "https://www.thestreet.com/fed/fed-rate-hikes-2022-2023-timeline-discussion",
      "asOf": "2026-06-16"
    }
  ],
  "narrative_timeline.json": [
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/business/2020/10/20/with-comp-below-100-a-look-back-at-the-defi-summer-it-sparked",
      "asOf": "2026-06-16"
    },
    {
      "name": "RWA.xyz",
      "url": "https://app.rwa.xyz/treasuries",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinMarketCap",
      "url": "https://coinmarketcap.com/academy/article/deep-dive-into-the-astronomic-growth-of-yearn-finance-yfi",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Block",
      "url": "https://www.theblock.co/post/256106/a-complete-timeline-of-ftx-from-alamedas-spiraling-debt-to-its-dramatic-implosion",
      "asOf": "2026-06-16"
    }
  ],
  "quant_bridges.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/protocols/Bridge",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/tech/2022/03/29/axie-infinitys-ronin-network-suffers-625m-exploit",
      "asOf": "2025-08-21"
    },
    {
      "name": "Chainalysis",
      "url": "https://www.chainalysis.com/blog/poly-network-hack-august-2021/",
      "asOf": "2022-08-04"
    },
    {
      "name": "Yellow",
      "url": "https://yellow.com/research/cross-chain-bridge-exploits-security-risks-2026",
      "asOf": "2026-06"
    }
  ],
  "quant_developers.json": [
    {
      "name": "PR Newswire",
      "url": "https://www.prnewswire.com/news-releases/electric-capital-releases-2022-crypto-developer-report-301723401.html",
      "asOf": "2022-06-16"
    },
    {
      "name": "Chaincatcher",
      "url": "https://www.chaincatcher.com/en/article/2156880",
      "asOf": "2026-06-16"
    },
    {
      "name": "Yahoo Finance",
      "url": "https://finance.yahoo.com/news/ethereum-leads-16-000-developers-054251913.html",
      "asOf": "2026-06-16"
    },
    {
      "name": "Electric Capital 2024",
      "url": "https://www.chaincatcher.com/en/article/2156880",
      "asOf": "2026-06-16"
    }
  ],
  "quant_dex_volume.json": [
    {
      "name": "CoinGecko",
      "url": "https://www.coingecko.com/research/publications/2025-annual-crypto-report",
      "asOf": "2026-01"
    },
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/dexs",
      "asOf": "2026-06-16"
    },
    {
      "name": "Observers",
      "url": "https://www.observers.com/defi/raydium-trading-volume-hits-124-6b-on-solana-outpaces-uniswap-again/",
      "asOf": "2024-11-30"
    },
    {
      "name": "The Block",
      "url": "https://www.theblock.co/linked/148465/dex-protocol-uniswap-hits-1-trillion-cumulative-trading-volume",
      "asOf": "2025-11-30"
    }
  ],
  "quant_fees_revenue.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/fees",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/business/2025/10/30/1kx-onchain-economy-hits-usd20b-as-fees-signal-real-demand",
      "asOf": "2025-10-30"
    },
    {
      "name": "1kx",
      "url": "https://1kx.capital/writing/2025-onchain-revenue-report ; https://www.coingecko.com/research/publications/blockchain-fee-earnings",
      "asOf": "2025-10-30"
    },
    {
      "name": "CoinGecko",
      "url": "https://www.coingecko.com/research/publications/blockchain-fee-earnings",
      "asOf": "2026-04-20"
    }
  ],
  "quant_hacks.json": [
    {
      "name": "Chainalysis",
      "url": "https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2026/",
      "asOf": "2025-12"
    },
    {
      "name": "CertiK",
      "url": "https://www.certik.com/blog/hack3d-the-web3-security-report-2025",
      "asOf": "2026-01"
    },
    {
      "name": "DefiLlama",
      "url": "https://bitcoinfoundation.org/news/defi/defillama-q1-crypto-hacks/",
      "asOf": "2026-06"
    },
    {
      "name": "Cryptonews",
      "url": "https://cryptonews.com/news/crypto-industry-lost-1-49b-to-hacks-and-fraud-in-2024-a-17-decline-yoy-immunefi/",
      "asOf": "2025-01"
    }
  ],
  "quant_lending.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/",
      "asOf": "2026-06-16"
    },
    {
      "name": "eco.com",
      "url": "https://eco.com/support/en/articles/15254000-best-defi-lending-protocols-2026-tvl-rates-risk-compared ; https://eco.com/support/en/articles/14800882-best-defi-lending-protocols-2026-tvl-rates-risk",
      "asOf": "2026-05"
    },
    {
      "name": "FXStreet",
      "url": "https://www.fxstreet.com/amp/cryptocurrencies/news/defi-is-waking-up-again-active-loans-return-to-2022-levels-202408011033",
      "asOf": "2024-08"
    },
    {
      "name": "Phemex News",
      "url": "https://phemex.com/news/article/morpho-tvl-reaches-1178b-secures-second-place-in-defi-lending-80656",
      "asOf": "2026-05"
    }
  ],
  "quant_liquid_staking.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/protocols/Liquid%20Staking",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Defiant",
      "url": "https://thedefiant.io/news/defi/liquid-staking-tvl-hits-record-usd86b-amid-eth-rally-and-growing-institutional-adoption",
      "asOf": "2025-08-14"
    },
    {
      "name": "beaconcha.in",
      "url": "https://beaconcha.in/charts/staked_ether",
      "asOf": "2026-06-16"
    },
    {
      "name": "Everstake",
      "url": "https://everstake.one/resources/crypto-reports/ethereum-staking-insights-protocol-analysis-annual-2025",
      "asOf": "2026-06-16"
    }
  ],
  "quant_perps.json": [
    {
      "name": "CoinGecko",
      "url": "https://www.coingecko.com/research/publications/state-of-crypto-perpetuals-2024",
      "asOf": "2026-06-16"
    },
    {
      "name": "Cointelegraph",
      "url": "https://cointelegraph.com/news/perpetuals-dex-volume-2025-onchain-derivatives-growth",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Block",
      "url": "https://www.theblock.co/post/360239/hyperliquid-volume-revenue",
      "asOf": "2022-2024"
    },
    {
      "name": "Yellow",
      "url": "https://yellow.com/news/hyperliquid-perpetual-dex-volume-share",
      "asOf": "2024-2026"
    }
  ],
  "quant_restaking.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/protocols/Liquid%20restaking",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Block",
      "url": "https://www.theblock.co/post/298796/eigenlayers-total-value-locked-surpasses-20-billion-for-the-first-time",
      "asOf": "2024-06"
    },
    {
      "name": "Phemex News",
      "url": "https://phemex.com/news/article/eigenlayer-tvl-hits-record-22-billion-in-august-17380",
      "asOf": "2025-08"
    },
    {
      "name": "Messari",
      "url": "https://x.com/MessariCrypto/status/1968773679472374028",
      "asOf": "2025-08"
    }
  ],
  "quant_rwa.json": [
    {
      "name": "RWA.xyz",
      "url": "https://app.rwa.xyz/",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/markets/2026/03/08/tokenized-assets-exceed-usd25-billion-after-nearly-quadrupling-in-a-year",
      "asOf": "2026-03-08"
    },
    {
      "name": "The Defiant",
      "url": "https://thedefiant.io/news/defi/private-credit-leads-rwa-tokenization-boom-report",
      "asOf": "2025-12"
    },
    {
      "name": "Cointelegraph",
      "url": "https://cointelegraph.com/news/tokenized-us-treasuries-845-market-cap-2023-coingecko",
      "asOf": "2024-03"
    }
  ],
  "quant_stablecoins.json": [
    {
      "name": "DefiLlama",
      "url": "https://stablecoins.llama.fi/stablecoincharts/all",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinMarketCap",
      "url": "https://coinmarketcap.com/view/stablecoin/",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinGecko",
      "url": "https://www.coingecko.com/en/categories/stablecoins",
      "asOf": "2026-06-16"
    },
    {
      "name": "Visual Capitalist",
      "url": "https://www.visualcapitalist.com/charted-stablecoins-are-now-bigger-than-visa-or-mastercard/",
      "asOf": "2026-06-16"
    }
  ],
  "quant_total_tvl.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/business/2025/09/18/defi-tvl-rebounds-to-usd170b-erasing-terra-era-bear-market-losses",
      "asOf": "2025-09-18"
    },
    {
      "name": "KuCoin",
      "url": "https://www.kucoin.com/news/flash/defi-tvl-drops-to-72-5b-amid-stablecoin-growth-and-security-concerns",
      "asOf": "2026-06-14"
    },
    {
      "name": "AMBCrypto",
      "url": "https://ambcrypto.com/defi-tvl-sinks-despite-315b-in-stablecoins-heres-why/",
      "asOf": "2026-06-16"
    }
  ],
  "quant_tvl_by_category.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/categories",
      "asOf": "2026-06-16"
    },
    {
      "name": "RWA.xyz",
      "url": "https://app.rwa.xyz/networks",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Defiant",
      "url": "https://thedefiant.io/news/defi/liquid-staking-tvl-hits-record-usd86b-amid-eth-rally-and-growing-institutional-adoption",
      "asOf": "2026-06-16"
    },
    {
      "name": "The Block",
      "url": "https://www.theblock.co/post/298796/eigenlayers-total-value-locked-surpasses-20-billion-for-the-first-time",
      "asOf": "2026-06-16"
    }
  ],
  "quant_tvl_by_chain.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/",
      "asOf": "2026-06-16"
    },
    {
      "name": "Portals.fi",
      "url": "https://blog.portals.fi/defi-tvl-may-12-2026-weekly-movers-market-data/",
      "asOf": "2026-05-12"
    },
    {
      "name": "Bitcoin.com",
      "url": "https://news.bitcoin.com/ethereums-defi-tvl-dominance-drops-to-53-approaching-multi-year-low/",
      "asOf": "2026-05"
    },
    {
      "name": "Mexc",
      "url": "https://www.mexc.com/news/1079996",
      "asOf": "2026-05-07"
    }
  ],
  "quant_users.json": [
    {
      "name": "a16z",
      "url": "https://a16zcrypto.com/posts/article/state-of-crypto-report-2024/",
      "asOf": "2025-10"
    },
    {
      "name": "Dune Analytics",
      "url": "https://dune.com/rchen8/defi-users-over-time",
      "asOf": "2026-06-16"
    },
    {
      "name": "Crypto Briefing",
      "url": "https://cryptobriefing.com/defi-million-users-ethereum-surging/",
      "asOf": "2021-07-13"
    },
    {
      "name": "CryptoRank",
      "url": "https://cryptorank.io/insights/reports/crypto-market-recap-q-3-2025",
      "asOf": "2026-06-16"
    }
  ],
  "quant_yield.json": [
    {
      "name": "DefiLlama",
      "url": "https://defillama.com/protocols/yield",
      "asOf": "2026-06-16"
    },
    {
      "name": "CoinDesk",
      "url": "https://www.coindesk.com/markets/2025/08/09/pendle-s-tvl-hits-record-usd8-3b-after-yield-trading-platform-debut",
      "asOf": "2026-06 (mid)"
    },
    {
      "name": "FalconX newsroom",
      "url": "https://www.falconx.io/newsroom/pendle-one-venue-all-of-fixed-income",
      "asOf": "2026-06-16"
    },
    {
      "name": "Coinfomania",
      "url": "https://coinfomania.com/morpho-surpasses-10b-in-deposits-with-6-7b-tvl-across-chains/",
      "asOf": "2025-08-22"
    }
  ]
};

window.DEFI_DATA.sourceProviders = [
  {
    "name": "DefiLlama",
    "url": "https://defillama.com/dex-aggregators",
    "files": 24
  },
  {
    "name": "CoinDesk",
    "url": "https://www.coindesk.com/web3/2025/10/08/solana-s-jupiter-to-develop-jupusd-stablecoin-with-backing-from-ethena-labs",
    "files": 23
  },
  {
    "name": "The Block",
    "url": "https://www.theblock.co/post/397278/ethereum-dex-aggregator-competitive-kyber-cowswap-gain",
    "files": 17
  },
  {
    "name": "CoinGecko",
    "url": "https://www.coingecko.com/en/coins/wormhole",
    "files": 12
  },
  {
    "name": "Cointelegraph",
    "url": "https://cointelegraph.com/explained/vitalik-s-take-on-decentralized-stablecoins-what-it-means-for-defi",
    "files": 10
  },
  {
    "name": "KuCoin",
    "url": "https://www.kucoin.com/blog/consensus-Miami-2026",
    "files": 10
  },
  {
    "name": "The Defiant",
    "url": "https://thedefiant.io/newsletter/defi-daily/robinhoods-cannes-token-festival",
    "files": 10
  },
  {
    "name": "CoinMarketCap",
    "url": "https://coinmarketcap.com/currencies/wormhole/",
    "files": 9
  },
  {
    "name": "Coinpedia",
    "url": "https://events.coinpedia.org/dappcon-2025-6389/",
    "files": 9
  },
  {
    "name": "Yellow",
    "url": "https://yellow.com/research/jupiter-solana-dex-aggregator-market-cap-2026",
    "files": 9
  },
  {
    "name": "Messari",
    "url": "https://events.messari.io/mainnet2025 (official Mainnet 2025 event site; not retrievable / 404 at time of research)",
    "files": 8
  },
  {
    "name": "Phemex",
    "url": "https://phemex.com/news/article/chainlink-smartcon-2025-to-explore-tradfi-and-defi-convergence-in-nyc-32437",
    "files": 8
  },
  {
    "name": "Crypto Briefing",
    "url": "https://cryptobriefing.com/hong-kong-web3-festival-unveils-2026-full-schedule-4-days-of-insight-driven-forums-with-vitalik-yi-he-justin-sun-lily-liu-and-more-2/",
    "files": 7
  },
  {
    "name": "eco.com",
    "url": "https://eco.com/support/en/articles/11802670-best-cross-chain-intent-protocols-2026-how-intents-are-replacing-bridges",
    "files": 7
  },
  {
    "name": "PR Newswire",
    "url": "https://www.prnewswire.com/news-releases/coindesk-unveils-consensus-hong-kong-2025-302083599.html",
    "files": 7
  },
  {
    "name": "Ainvest",
    "url": "https://www.ainvest.com/news/avalanche-london-summit-2025-gather-1500-blockchain-leaders-2503/",
    "files": 6
  },
  {
    "name": "BeInCrypto",
    "url": "https://beincrypto.com/consensus-miami-2026-speaker-lineup/",
    "files": 6
  },
  {
    "name": "Blockworks",
    "url": "https://blockworks.com/event/digital-asset-summit-nyc-2026",
    "files": 6
  },
  {
    "name": "Yahoo Finance",
    "url": "https://finance.yahoo.com/news/cardano-summit-2025-concludes-berlin-132300666.html",
    "files": 6
  },
  {
    "name": "Bitcoin.com",
    "url": "https://news.bitcoin.com/tron-network-integrated-into-hyperlane-expanding-interoperability-to-over-150-chains/",
    "files": 5
  },
  {
    "name": "Business Wire",
    "url": "https://www.businesswire.com/news/home/20251117496852/en/Cardano-Summit-2025-Concludes-In-Berlin-Trust-Emerges-As-The-Winner-with-Traditional-Financial-Firms-Feeling-Blockchain-FOMO",
    "files": 5
  },
  {
    "name": "Chainwire",
    "url": "https://chainwire.org/2025/03/12/avalanche-london-summit-first-speakers-announced/",
    "files": 5
  },
  {
    "name": "Cryptoevents",
    "url": "https://cryptoevents.global/topic/avalanche-summit/",
    "files": 5
  },
  {
    "name": "Mexc",
    "url": "https://www.mexc.com/learn/article/ethcc-cannes-everything-you-need-to-know-about-the-ethereum-conference/1",
    "files": 5
  },
  {
    "name": "Solana",
    "url": "https://solana.com/news/solana-breakpoint-2025",
    "files": 5
  },
  {
    "name": "Chainalysis",
    "url": "https://www.chainalysis.com/blog/wormhole-hack-february-2022/",
    "files": 4
  },
  {
    "name": "Cryptonomist",
    "url": "https://en.cryptonomist.ch/2025/12/06/cosmoverse-2025-web3-conferences/",
    "files": 4
  },
  {
    "name": "CryptoPotato",
    "url": "https://cryptopotato.com/solana-lending-tvl-soars-to-3-6b-as-new-protocols-battle-for-market-dominance/",
    "files": 4
  },
  {
    "name": "Cryptoslate",
    "url": "https://cryptoslate.com/data-shows-how-aave-overtook-compound-in-defi-lending/",
    "files": 4
  },
  {
    "name": "Luma",
    "url": "https://luma.com/bbw2025",
    "files": 4
  },
  {
    "name": "Blockeden",
    "url": "https://blockeden.xyz/blog/2026/01/12/chainlink-ccip-cross-chain-interoperability-tradfi-bridge/",
    "files": 3
  },
  {
    "name": "Coinfomania",
    "url": "https://coinfomania.com/morpho-surpasses-10b-in-deposits-with-6-7b-tvl-across-chains/",
    "files": 3
  },
  {
    "name": "CoinLaw",
    "url": "https://coinlaw.io/aave-statistics/",
    "files": 3
  },
  {
    "name": "Coinspeaker",
    "url": "https://www.coinspeaker.com/events/korea-blockchain-week-2025/",
    "files": 3
  },
  {
    "name": "Cryptonews",
    "url": "https://cryptonews.net/news/ethereum/32514342/",
    "files": 3
  },
  {
    "name": "CryptoNewsNavigator",
    "url": "https://www.cryptonewsnavigator.com/academy/article/three-scenarios-for-axelar-as-cross-chain-demand-explodes",
    "files": 3
  },
  {
    "name": "Cryptotimes",
    "url": "https://www.cryptotimes.io/2026/05/02/20000-expected-in-miami-the-wall-street-crypto-convergence-at-consensus-2026/",
    "files": 3
  },
  {
    "name": "Datawallet",
    "url": "https://www.datawallet.com/crypto/stablecoin-statistics",
    "files": 3
  },
  {
    "name": "Elliptic",
    "url": "https://www.elliptic.co/blog/drift-protocol-exploited-for-286-million-in-suspected-dprk-linked-attack",
    "files": 3
  },
  {
    "name": "FXStreet",
    "url": "https://www.fxstreet.com/cryptocurrencies/news/anchorage-digital-kamino-finance-solana-company-team-up-to-strengthen-institutional-borrowing-with-sol-202602132226",
    "files": 3
  }
];

window.DEFI_DATA.rawFiles = [
  {
    "file": "quant_bridges.json",
    "group": "quant",
    "title": "Cross-chain bridges over time",
    "desc": "Cross-chain bridges scaled from near-zero in early 2020 to a peak of well over $50B in locked value during the 2021-Q1 2022 bull market, dominated by Multichain (peak ~$10.5B Ja.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_developers.json",
    "group": "quant",
    "title": "Developer activity for DeFi & chains over time",
    "desc": "Authoritative time-series of crypto/Web3 developer activity, primarily from the Electric Capital Developer Report (the industry-standard open-source dev tracker, analyzing 900M+.",
    "asOf": "2022-06-16"
  },
  {
    "file": "quant_dex_volume.json",
    "group": "quant",
    "title": "DEX trading volume over time",
    "desc": "Decentralized exchange (DEX) spot trading volume has grown from roughly $115B in 2020 and ~$1T in 2021 to a record ~$4.9 trillion in 2025, with 2024 (~$1.5T) up 138% over 2023 (.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_fees_revenue.json",
    "group": "quant",
    "title": "DeFi fees & revenue over time",
    "desc": "Aggregate DeFi fees (total fees paid by users, equivalent to gross revenue) and protocol revenue (the subset retained by protocols/token holders) have grown roughly 100x since 2020.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_hacks.json",
    "group": "quant",
    "title": "DeFi hacks & exploit losses over time (2020-2026)",
    "desc": "Crypto/DeFi theft losses grew explosively from ~$0.5B in 2020 to a then-record ~$3.8B in 2022 (Chainalysis, all crypto sectors).",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_lending.json",
    "group": "quant",
    "title": "DeFi lending markets over time",
    "desc": "Historical and current quantitative data for the major DeFi lending/borrowing protocols, sourced primarily from the DefiLlama API (per-protocol historical TVL and 'borrowed' ser.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_liquid_staking.json",
    "group": "quant",
    "title": "Liquid staking over time",
    "desc": "Liquid staking grew from near-zero in 2020 into the single largest DeFi category.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_perps.json",
    "group": "quant",
    "title": "Perpetuals & derivatives DEX volume over time",
    "desc": "On-chain perpetual/derivatives DEX trading volume has grown from a near-rounding-error share of crypto derivatives in 2020-2021 into a multi-trillion-dollar annual market.",
    "asOf": "2024-2026"
  },
  {
    "file": "quant_restaking.json",
    "group": "quant",
    "title": "Restaking over time",
    "desc": "Restaking lets staked ETH (and other assets) be re-pledged to secure additional services, pioneered by EigenLayer (mainnet 2023, deposits opened broadly in 2024).",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_rwa.json",
    "group": "quant",
    "title": "Real-world assets (RWA) on-chain over time",
    "desc": "Tokenized real-world assets (RWA) on-chain — excluding fiat stablecoins — grew from roughly $5B in 2022 to about $15.2B at end-2024, ~$20B at end-2025, ~$25B by March 2026, and .",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_stablecoins.json",
    "group": "quant",
    "title": "Stablecoin supply over time",
    "desc": "Stablecoin total supply (circulating market cap) grew from roughly $4B at end-2019 to an all-time high of ~$321B in May 2026, per DefiLlama.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_total_tvl.json",
    "group": "quant",
    "title": "Total DeFi TVL over time",
    "desc": "Total Value Locked (TVL) across all of DeFi grew from effectively zero in 2018-2019 (~$0.6B end-2019) to ~$15B at the end of 2020 during 'DeFi Summer', then exploded to an all-t.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_tvl_by_category.json",
    "group": "quant",
    "title": "DeFi TVL by category over time",
    "desc": "Total Value Locked (TVL) in DeFi grew from under ~$1B at the start of 2020 to a first all-time high of ~$177.5B on 2021-11-09 (DefiLlama 'headline' DeFi TVL, which excludes liqu.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_tvl_by_chain.json",
    "group": "quant",
    "title": "DeFi TVL by blockchain over time",
    "desc": "Total DeFi Total Value Locked (TVL) grew from ~$15B at end-2020 to an all-time high of ~$177B on 9 Nov 2021, then collapsed to ~$38B by end-2022 during the bear market (Terra/Lu.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_users.json",
    "group": "quant",
    "title": "DeFi users / active addresses over time (2020 to 2026)",
    "desc": "DeFi participation, measured by cumulative unique wallet addresses, grew from roughly 1 million (Dec 2020) to over 330 million by mid-2026 according to Richard Chen's widely cit.",
    "asOf": "2026-06-16"
  },
  {
    "file": "quant_yield.json",
    "group": "quant",
    "title": "Yield products & aggregators over time",
    "desc": "Historical and current TVL for the major DeFi yield aggregators and yield-trading protocols, sourced primarily from the DefiLlama protocol TVL API (as-of 2026-06-17).",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_aggregators_frontends.json",
    "group": "map",
    "title": "Aggregators, intents & DeFi frontends — protocol map",
    "desc": "As of mid-June 2026, the DEX-aggregator landscape is split by chain family rather than dominated by a single global leader.",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_bridges_interop.json",
    "group": "map",
    "title": "Bridges & interoperability — protocol map",
    "desc": "The cross-chain landscape has split into two layers: generalized messaging protocols (LayerZero, Wormhole, Chainlink CCIP, Axelar, Hyperlane) that secure and route arbitrary dat.",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_cdp_synth.json",
    "group": "map",
    "title": "CDP & synthetics — protocol map",
    "desc": "The CDP (collateralized-debt-position stablecoin) and synthetic-asset sector is overwhelmingly dominated by MakerDAO's successor, Sky.",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_dex.json",
    "group": "map",
    "title": "Decentralized exchanges (DEX) — protocol map",
    "desc": "Spot DEXs are a maturing, multi-chain market.",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_lending.json",
    "group": "map",
    "title": "Lending & borrowing — protocol map",
    "desc": "DeFi lending is a ~$40-54B deposit category (DefiLlama lending category, April 2026) dominated by Aave, which holds roughly 60-63% of active borrows (Token Terminal), about 36-4.",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_perps_derivs.json",
    "group": "map",
    "title": "Perpetuals & derivatives — protocol map",
    "desc": "On-chain perpetuals are the largest revenue-generating DeFi vertical and one of its most concentrated.",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_rwa.json",
    "group": "map",
    "title": "RWA & tokenization — protocol map",
    "desc": "As of June 2026 the on-chain RWA category sits around $17B+ TVL on DefiLlama (the sum of all 149 RWA-tagged protocols is ~$26B including tokenized gold), having overtaken DEXs t.",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_stablecoins.json",
    "group": "map",
    "title": "Stablecoins (incl. yield-bearing) — protocol map",
    "desc": "The total stablecoin market sits at roughly $315B-$321B in mid-2026, an all-time high (DefiLlama API top-line; the sector topped $321B in April 2026).",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_staking_restaking.json",
    "group": "map",
    "title": "Liquid staking & restaking — protocol map",
    "desc": "Liquid staking remains DeFi's largest single category, anchored by Lido (~$16.1B TVL per DefiLlama, mid-2026), which still dwarfs all rivals but has ceded share over time (peake.",
    "asOf": "2026-06-16"
  },
  {
    "file": "map_yield.json",
    "group": "map",
    "title": "Yield, vaults & structured products — protocol map",
    "desc": "As of mid-2026 the yield/vaults/structured-products landscape is led by a new generation of protocols built around yield tokenization and synthetic-dollar yield rather than the .",
    "asOf": "2026-06-16"
  },
  {
    "file": "narrative_regulation.json",
    "group": "narrative",
    "title": "DeFi Regulation & Macro Milestones: A Chronological History (2022-2025)",
    "desc": "DeFi Regulation & Macro Milestones: A Chronological History (2022-2025).",
    "asOf": "2026-06-16"
  },
  {
    "file": "narrative_timeline.json",
    "group": "narrative",
    "title": "DeFi Cycles & Key Events Timeline (2017-2026)",
    "desc": "DeFi Cycles & Key Events Timeline (2017-2026).",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_avax_summit.json",
    "group": "conf",
    "title": "Avalanche Summit London 2025 — Hatfield House, Hatfield, England (just outside London), UK",
    "desc": "May 20-22, 2025 (main summit). Associated events: Owl Explains Crypto Summit policy day May 22; Avalanche Hackathon May 23-25; Codebase incubator Demo Day May 29. · Over 1,500 in-person attendees (developers, founders, investors, former policymakers); the summit engaged 50+ EMEA partners across DeFi, institutional, and gaming. · themes: DeFi lending protocol architecture (Aave V4 unveiled in a fireside chat by Stani Kulechov), Institutional adoption of DeFi / institutional liquidity onchain, Scaling DeFi beyond billions in TVL (next-generation lending models)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_bbw_dappcon25.json",
    "group": "conf",
    "title": "DappCon (Berlin Blockchain Week) — Radialsystem, Holzmarktstrasse 33, 10243 Berlin, Germany (Friedrichshain-Kreuzberg)",
    "desc": "June 16-18, 2025 · ~800-1,000+ builders/attendees, 80+ speakers, 15+ sessions (sources vary: Coinpedia cites 800+ attendees/80+ speakers; multiple listings cite 900+ builders; one Gnosis-ecosystem recap cites 1,000+ builders and 100+ speakers). Hosted/organized by Gnosis. · themes: DEX / AMM liquidity infrastructure and capital efficiency (Balancer V3 modular architecture, ReCLAMM concentrated liquidity), Lending protocol evolution and multi-protocol capital coordination (Aave V4), Protocol composability and liquidity routing across DeFi venues (Aave + Balancer + KPK)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_breakpoint25.json",
    "group": "conf",
    "title": "Solana Breakpoint — Etihad Arena, Yas Island, Abu Dhabi, UAE (first Breakpoint held in the Middle East)",
    "desc": "December 11-13, 2025 · 7,000+ attendees from 100+ countries (sold out; ~1,800 founders present) — the largest Breakpoint to date · themes: Stablecoins (USDC dominance on Solana; new yield-bearing stablecoins JupUSD, Streamflow USD+, Abra USDAF), Institutional DeFi / TradFi convergence ('Everything Chain' / 'Revenue and Returns' framing), Real-world asset (RWA) tokenization (>$2B tokenized RWAs by end-2025; gold, uranium, equities, domains, sovereign reserves)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_cardano_summit25.json",
    "group": "conf",
    "title": "Cardano Summit 2025 — Gasometer Schöneberg, Berlin, Germany (Day Zero hackathon/pitch on 11 November at w3.hub Berlin)",
    "desc": "12-13 November 2025 (Day Zero: 11 November 2025) · ~800 in-person attendees from 70+ countries, 140 speakers, and 25,000+ online participants · themes: Stablecoins for institutional finance (cross-border payments, payroll, treasury management, trading), DeFi liquidity expansion as a 2026 Cardano roadmap priority, Real-world asset (RWA) tokenization for enterprise adoption",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_consensus.json",
    "group": "conf",
    "title": "Consensus by CoinDesk — Miami Beach Convention Center, Miami Beach, Florida, USA",
    "desc": "May 5-7, 2026 (Consensus Miami 2026). Companion in-window edition: Consensus Hong Kong 2026, February 10-12, 2026. · Marketed/expected at 20,000+ attendees from 100+ countries (some recaps cite a 15,000-20,000 range), including representatives from 200+ Fortune 500 companies. Program scale: 6 stages, 3-4 summits, 6 content tracks, 200+ sessions, and 500+ speakers. Institutional Summit (May 5) was application-only; previous editions cited participants representing roughly $4 trillion+ in AUM, with one recap estimating ~35% of attendees from institutional capital. Exact independently audited headcount not published. · themes: Stablecoins as core financial infrastructure - dedicated multi-day Stablecoin Track / 'Stablecoin University'; reserve management, yield-bearing stablecoin products, cross-border payments and remittances, regulatory uncertainty, competition with CBDCs, Real-world asset (RWA) tokenization - real estate, treasury bills, bonds, private equity, commodities; fractional ownership and near-instant 24/7 settlement; RWA market cited crossing ~$31B (ex-stablecoins); 'Internet Capital Markets' framing, Institutional DeFi / TradFi-DeFi convergence - JPMorgan (Kinexys), Morgan Stanley, DTCC, Fidelity, Mastercard, State Street as sponsors/speakers; old 'TradFi vs DeFi' framing largely absent",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_cosmoverse25.json",
    "group": "conf",
    "title": "Cosmoverse 2025 — Le Méridien Lav, Split, Croatia",
    "desc": "October 30 - November 1, 2025 · Marketing pre-event materials cited 10,000+ attendees and 500+ speakers; post-event recaps describe 60+ curated sessions across ~10 tracks plus a 100-builder Hackmos x DoraHacks hackathon. Exact verified headcount not published in independent coverage. · themes: Stablecoins and institutional stablecoin infrastructure (Visa pilot for a stablecoin liquidity and funding model with global banks), CBDCs / Digital Euro and on-chain finance (ECB and Croatian National Bank; Cosmos Labs building two Latin American CBDCs), Real-world asset (RWA) tokenization across banking, gaming, government, and asset management",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_das.json",
    "group": "conf",
    "title": "Digital Asset Summit (DAS) by Blockworks — Javits Center North, 445 11th Ave, New York, NY (DAS NYC 2026). DAS London 2025 was at Old Billingsgate, London, UK.",
    "desc": "March 24-26, 2026 (DAS NYC 2026). DAS London 2025: October 13-15, 2025. · DAS NYC 2026: reported as 2,500+ attendees from 35+ countries, 150+ speakers, 45 curated sessions, with $4.2t+ in AUM represented (third-party listing). Blockworks/press materials cite $3t+ in AUM represented at past DAS events. DAS London 2025: hundreds of institutions / large audience representing ~£1.2t+ in AUM (third-party listing). · themes: Onchain institutional finance and securities settlement (BlackRock, JPMorgan moving onchain to settle treasuries, equities, private credit and other securities), Real-world asset (RWA) tokenization of treasuries, equities, private credit and securities, Stablecoins and global payments infrastructure (institutional and consumer use cases)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_devconnect_ba.json",
    "group": "conf",
    "title": "Devconnect Argentina (The First Ethereum World's Fair) — La Rural, Palermo, Buenos Aires, Argentina",
    "desc": "November 17-22, 2025 · 14,000+ attendees from 130+ countries (45% from Argentina; 53% first-time EF event attendees); 80+ exhibiting teams across 8 districts; 40+ events inside La Rural plus 500+ community-run side events across the city. (Pre-event organizer/press estimates ranged from 10,000-15,000.) · themes: Stablecoins as the breakout / front-end story of crypto (on-the-ground payments in BA, inflation hedge in Argentina ~19.8% crypto ownership), Argentine peso-pegged stablecoin wARS launched on Ethereum, Base and World Chain, Consumer-facing DeFi / bringing direct DeFi access to retail (Aave App launch)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_ethcc8.json",
    "group": "conf",
    "title": "EthCC (Ethereum Community Conference) — Palais des Festivals et des Congres, Cannes, France",
    "desc": "June 30 - July 3, 2025 · ~6,400-6,500 accredited attendees at the main conference; ~10,000 total participants across EthCC Week including ~250-300 parallel/side events. 390-400+ speakers and 64-72 sponsors. · themes: Stablecoins as core financial infrastructure (payments, settlement, lending, cash management) with regulatory clarity (MiCA, US CLARITY/GENIUS context) driving institutional adoption, Institutional DeFi / 'onchain finance' - traditional banks and TradFi firms moving their own business on-chain (first-time official participation by Bloomberg, S&P Global, BNP Paribas, Euroclear, Amundi, Societe Generale-Forge, Tradeweb), Real-World Asset (RWA) tokenization moving from concept to implementation - tokenized treasuries, RWA-collateralized lending, tokenized stocks/ETFs (dedicated RWA Summit)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_ethdenver26.json",
    "group": "conf",
    "title": "ETHDenver — Denver, Colorado, USA — LVC at the National Western Center / Stockyards Event Center, 4850 National Western Dr, Denver, CO 80216",
    "desc": "Main event Feb 18-21, 2026 (some sources cite Feb 17-21); BUIDLWeek + Camp BUIDL Feb 15-17; SporkDAO Community Mountain Retreat Feb 22-27 · Reported 25,000+ participants from 125+ countries (organizer/recap figures); however post-event coverage emphasized a notably smaller, more intimate event than prior years — side events dropped roughly 68-85% (from ~668 in 2025 to ~215 in 2026) and international attendance declined (Lunar New Year timing, industry cooling, competing events). · themes: Stablecoins as payment rails and cross-border infrastructure (legislation, GENIUS-style provisions, institutional adoption), Real-world assets (RWA) tokenization and RealFi, Institutional DeFi / institutional ETH and Wall Street + Main Street adoption (\"less degen, more boardroom\")",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_hkw3_26.json",
    "group": "conf",
    "title": "Hong Kong Web3 Festival — Hong Kong Convention and Exhibition Centre (HKCEC), Hong Kong",
    "desc": "April 20-23, 2026 · 20,000+ attendees (200+ speakers, 100+ partners, 4 stages, 20+ sessions); billed as Asia's largest crypto event · themes: TradFi x crypto finance convergence / institutional adoption, Stablecoins and cross-border / Web3 payments, Real-World Assets (RWA) and compliant asset tokenization",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_kbw25.json",
    "group": "conf",
    "title": "Korea Blockchain Week 2025 (KBW2025: IMPACT) — Seoul, South Korea. Festival week spread across the city; flagship IMPACT conference held at Walkerhill Hotel & Resort (Vista Walkerhill / Grand Walkerhill), Gwangjin-gu, Seoul.",
    "desc": "Festival week: September 22-28, 2025. Flagship IMPACT conference: September 23-24, 2025. · Approximately 12,000-13,000+ attendees and ~300 speakers across the IMPACT conference, with 80+ official side events across Seoul (some promotional sources cited up to 17,000 for the broader week). For comparison, KBW2024 reported ~17,000 attendees at the main conference. Figures vary by source. · themes: Stablecoins as core crypto infrastructure (settlement, payments, liquidity, cross-border remittance), KRW-denominated (Korean won) stablecoins and the evolving Korean/US regulatory frameworks (GENIUS Act-era US policy, FSC engagement), Real-world asset (RWA) tokenization and RWAfi (real-world-asset finance) - RWAs as programmable DeFi collateral, liquidity-pool assets, and media of exchange",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_mainnet25.json",
    "group": "conf",
    "title": "Mainnet 2025 (Messari) — New York City, USA — Pier 36 (299 South Street, Manhattan)",
    "desc": "September 30 – October 2, 2025 (3-day summit; some aggregators list Sept 30 – Oct 3, 2025) · Not verifiable for 2025. Billed as 'the largest annual crypto event in New York.' Prior-edition benchmark: Mainnet 2024 drew 3,000+ attendees and 200+ speakers (not confirmed for 2025). · themes: DeFi listed by Messari as a core focus area of the summit (alongside macro, regulation, and infrastructure), Regulation / regulatory clarity for digital assets (stablecoin frameworks, custody, market structure), Stablecoins (including the rise of yield-bearing stablecoins)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_money2020_25.json",
    "group": "conf",
    "title": "Money20/20 USA — The Venetian Expo / Venetian Convention and Expo Center, Las Vegas, Nevada, USA",
    "desc": "October 26-29, 2025 · 11,000+ attendees from 85 countries; 630+ speakers across 300+ sessions; 380+ sponsors. Theme: \"Create the Future\". · themes: Stablecoins as mainstream payment rails (cross-border, programmable money) - dominant theme, TradFi x digital-asset convergence ('frenemies' to partners; shared infrastructure over competition), Tokenization of assets and tokenized infrastructure as the next growth backbone for finance",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_others_catchall.json",
    "group": "conf",
    "title": "Permissionless IV (Blockworks) — headline of a catch-all of other notable DeFi-relevant conferences not separately covered — Permissionless IV: Industry City, 220 36th St, Brooklyn, NY, USA. (TOKEN2049: Marina Bay Sands, Singapore; Consensus 2025: Metro Toronto Convention Centre, Toronto, Canada.)",
    "desc": "Permissionless IV: June 24-26, 2025 (hackathon June 22-23, 2025). TOKEN2049 Singapore: Oct 1-2, 2025. Consensus 2025 Toronto: May 14-16, 2025 (just before the window; next in-window edition is Consensus 2026). · Permissionless IV: ~5,000+ attendees expected; 215 confirmed speakers (some sources cite 100+ headline speakers, all ticket tiers sold out). For reference within the catch-all: TOKEN2049 Singapore 2025 ~25,000+ attendees / 500+ side events; Consensus 2025 Toronto ~14,771 attendees from 102 countries, 500 speakers, 1,000+ hackathon devs. · themes: DeFi Renaissance (Blockworks track): RWAs, US capital formation, reshoring DeFi talent/American Dynamism, next-gen DeFi apps, Institutional DeFi & permissioned lending (e.g., Aave's Horizon: institutions borrow stablecoins against tokenized MMFs / US Treasuries while keeping permissionless liquidity), Real-world asset (RWA) tokenization (grew from ~$5B in 2022 to >$24B by June 2025; crypto's 2nd fastest-growing sector after stablecoins)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_pbw26.json",
    "group": "conf",
    "title": "Paris Blockchain Week 2026 — Carrousel du Louvre, Paris, France (VIP dinner April 14 at Chateau de Versailles)",
    "desc": "April 15-16, 2026 · ~10,000 expected attendees from 100+ countries; 320+ speakers, 450+ journalists, 300 sponsors (2025 edition drew 9,500+ attendees and 420+ speakers) (forward-dated projection, not a realized figure; official sources vary as of 2026-06-18: live homepage cites 7,500+ attendees and 360+ journalists, other official listings cite 10,000 and 450+ journalists) · themes: Stablecoins and stablecoin-powered payments (24/7 settlement, euro-indexed stablecoins, MiCA e-money tokens vs asset-referenced tokens), Real World Asset (RWA) tokenization as institutional infrastructure (tokenized bonds, funds, fractional real estate), Institutional DeFi / TradFi-DeFi convergence (banks integrating blockchain rails, closing the liquidity gap)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_permissionless.json",
    "group": "conf",
    "title": "Permissionless (Blockworks) — Industry City, Brooklyn, New York, USA",
    "desc": "June 24-26, 2025 (36-hour hackathon June 22-23, 2025) · 5,000+ attendees expected; 215 confirmed speakers (Blockworks/press materials). Organized by Blockworks in collaboration with Bankless. · themes: DeFi Renaissance (one of six core tracks: RWAs, U.S. capital formation, American Dynamism), Stablecoins as the first real product-market fit in crypto (and U.S. regulatory tailwinds, e.g. GENIUS Act era), Real-world assets (RWA) and asset tokenization, including permissioned RWA collateral",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_smartcon25.json",
    "group": "conf",
    "title": "Chainlink SmartCon 2025 — Metropolitan Pavilion, Manhattan, New York City, USA",
    "desc": "November 4-5, 2025 · ~1,700 in-person attendees (reported; the precise '1,701 confirmed guests' figure came from a Vendelux attendee-list page now returning HTTP 410 Gone and is no longer independently verifiable — secondary sources cite only 'thousands of attendees'); Chainlink cited 275+ speakers, thousands of registrations, and millions of online views. (Note: the official agenda page lists overlapping session times across multiple stages, consistent with a multi-track event.) · themes: TradFi-DeFi convergence ('AllFi') and institutional adoption of onchain finance, Real-world asset (RWA) tokenization (funds, securities, treasuries) at institutional scale, Stablecoins for payments and as a financial-stack primitive",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_stablecon25.json",
    "group": "conf",
    "title": "Stablecon — In-window edition: IPG Mediabrands Netherlands, 7 Peter van Anrooystraat, Amsterdam, Noord-Holland 1076 DA, Netherlands. (Original Stablecon NYC 2025: Metropolitan Pavilion, 125 W 18th St, New York, NY 10011, USA.)",
    "desc": "Stablecon EMEA 2026: May 19-20, 2026 (in window). Stablecon NYC 2025: May 29, 2025 (just before the window). For reference, the next edition is Stablecon USA 2026: September 9-11, 2026, National Harbor Resort, Washington DC (after the window). · Conflicting figures. Promotional materials for both editions claim 1,500+ attendees, 750+ C-suite leaders, and 100-125+ speakers. Independent sources are lower: a Turnkey recap of Stablecon NYC 2025 cited 460+ attendees, and an Ark Republic recap of Stablecon EMEA 2026 cited 'nearly 600 registrants.' The EMEA 2026 published speaker list contains roughly 100 named speakers, consistent with the 100+ speaker claim. · themes: Convergence of TradFi and crypto/DeFi - banks and institutions integrating stablecoins rather than competing ('the future of finance was not crypto vs institutions, it was their convergence'), Stablecoins as programmable global payment rails and 'invisible financial infrastructure' rather than speculative crypto assets, Yield-bearing stablecoins and yield embedded 'under the hood' of fintech apps (typically 4-8% USD-denominated yield)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_sui_basecamp26.json",
    "group": "conf",
    "title": "Sui Basecamp 2026 — 2026: officially announced Singapore, co-located with TOKEN2049 (per Sui Network X announcement); supersedes the earlier unofficial 'Registration Test' page (test.buildonsui.io) guess. 2025 (verified): InterContinental Dubai Festival City, Dubai, UAE. 2024 (verified): Paris, France.",
    "desc": "2026: officially announced October 7-8, 2026, Singapore, co-located with TOKEN2049 (per Sui Network X announcement). Supersedes the earlier unofficial 'September 15-17' test-page date. Still falls AFTER the June-2025-to-June-2026 window, so in_window remains false. 2025 (verified): May 1-2, 2025 (falls just BEFORE the window start). 2024: Paris. · 2026: '3K+ attendees' claimed on the unofficial test page (UNCONFIRMED). 2025 (verified): 2,000+ attendees from 90+ countries. 2024 inaugural: ~1,100 attendees from 65 countries. · themes: DeFi on Sui ecosystem builders (DEXs, lending, liquidity) — a 'DeFi on Sui' Ecosystem Builders Panel is listed on the unofficial 2026 test agenda (UNCONFIRMED), Stablecoins on Sui — FDUSD native deployment by First Digital; suiUSDe stablecoin expansion (verified, 2025 edition), Bitcoin Finance / BTCfi — Babylon Labs Bitcoin staking & restaking integration (verified, 2025 edition)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_t2049_dubai.json",
    "group": "conf",
    "title": "TOKEN2049 Dubai — Madinat Jumeirah, Dubai, UAE",
    "desc": "29-30 April 2026 · Billed for 15,000+ attendees from 4,000+ companies across 160+ countries, 200+ speakers, 200+ exhibitors, >70% C-level (same scale as the 2025 edition, which drew ~15,000 attendees and 500+ side events during TOKEN2049 Week, 27 Apr-3 May 2026). · themes: Stablecoins as core on-chain infrastructure (regulatory-compliant, yield-bearing, multi-chain models; surging demand approaching ~$250B), Real-world asset (RWA) tokenization (real estate, bonds, private credit; trillion-dollar market cap projected by ~2026), Institutional DeFi and on-chain finance (banks/asset managers entering trading, lending, tokenization)",
    "asOf": "2026-06-16"
  },
  {
    "file": "conf_t2049_sg.json",
    "group": "conf",
    "title": "TOKEN2049 Singapore — Marina Bay Sands Expo & Convention Centre, Singapore",
    "desc": "October 1-2, 2025 · Record ~25,000 attendees from 160+ countries; sold out. ~500 exhibitors, 300+ speakers. Surrounding TOKEN2049 Week (Sep 29 - Oct 5) featured 500+ side events. · themes: Stablecoins as financial infrastructure / cross-border settlement rails (>$45T in annual stablecoin transaction volume cited; market cap ~$300B, up ~50% in 2025), Real-world asset (RWA) tokenization going mainstream (tokenized US Treasuries from BlackRock/Franklin Templeton; tokenized equities and real-world debt instruments), Institutional DeFi: move from speculative yield farms to institutional-grade infrastructure (custody, audited proof-of-reserves, compliance, regulatory wrappers)",
    "asOf": "2026-06-16"
  }
];
