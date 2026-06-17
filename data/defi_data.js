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
      { name: "Franklin BENJI", value: 2.40 }
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
    { date: "2025-12", title: "RWA tokenization ≈ $33B", desc: "Institutional DeFi consolidates; tokenized Treasuries are Wall Street's gateway." }
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
      leaders: "Aave (~60–63% share), Spark (Sky), Morpho, Compound, JustLend (Tron), Kamino (Solana), Euler V2",
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
    { key: "sui_basecamp26", name: "Sui Basecamp", loc: "Dubai 2025 / Singapore 2026?", dates: "May 1–2, 2025 (2026 unconfirmed)", inWindow: false, attendance: "~2k (2025)",
      themes: ["DeFi on Sui (DEX/lending)", "Stablecoins (FDUSD, suiUSDe)", "BTCfi (Babylon)", "Institutional adoption"],
      speakers: "Evan Cheng, NAVI Protocol, Babylon Labs, Raoul Pal", raw: "conf_sui_basecamp26.json", note: "2026 edition unconfirmed; 2025 edition just before window." },
    { key: "others_catchall", name: "Others (catch-all)", loc: "Global", dates: "Jun-2025 → Jun-2026", inWindow: true, attendance: "varies",
      themes: ["Consensus Toronto, ETHGlobal, DeFi Security Summit, regional Web3 weeks", "BTCFi", "DeFi Renaissance"],
      speakers: "Cross-event; see raw file", raw: "conf_others_catchall.json" }
  ]
};
