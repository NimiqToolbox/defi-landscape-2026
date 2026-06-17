# The DeFi Landscape, 2017 → 2026

An interactive, single-page dashboard tracing decentralized finance from a ~$0.6B experiment in 2019 to its multi-cycle peaks — and the structural shift in *what DeFi is*: liquid staking, restaking, perps, stablecoins, and real-world assets.

**🔗 Live site: https://nimiqtoolbox.github.io/defi-landscape-2026/**

Built with [Apache ECharts](https://echarts.apache.org) and styled with the [Nimiq design system](https://nimiq.com).

## What's inside

28 charts across, section by section:

- **Cycles** — total TVL 2017–2026 and the four market cycles
- **Chains** — TVL by blockchain, Ethereum dominance
- **Categories** — how the TVL mix inverted over time
- **DEXs** — spot volume, DEX/CEX ratio, market share
- **Stablecoins** — supply, issuers, trajectories
- **Perps** — perp-DEX volume, Hyperliquid's rise
- **Staking** — liquid staking, ETH staked & ratio, the restaking boom/bust
- **RWA** — tokenized treasuries and other real-world assets
- **Yield & bridges** — yield protocols, bridge TVL
- **Users & economics** — fees vs revenue, developers, addresses
- **Security** — hacks & exploits (all crypto vs DeFi-only)
- **Protocol map**, a **regulation timeline**, and **12 months of conferences**

## Data

All underlying data lives in [`data/`](data/) and is downloadable from the site — every chart links to its source file:

- [`data/defi_data.js`](data/defi_data.js) — the chart-ready datasets used by the page
- [`data/raw/`](data/raw/) — ~50 source snapshots (`quant_*`, `map_*`, `narrative_*`, `conf_*`)
- [`data/timeseries_long.csv`](data/timeseries_long.csv) · [`data/conferences.csv`](data/conferences.csv) — tabular exports

Figures are compiled from public sources — primarily [DefiLlama](https://defillama.com)'s consistent cross-chain methodology, with CoinGecko, The Block, Messari, Token Terminal, RWA.xyz, Artemis, Electric Capital, Chainalysis/CertiK/Immunefi and official conference agendas cited per chart. Data is a snapshot **as of 16 June 2026**. Other trackers report higher peaks under broader inclusion rules — see the in-page methodology section for caveats. The written narrative is in [`defi-landscape.md`](defi-landscape.md).

## Run locally

A static site with no build step — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Tech

- Vanilla HTML / CSS / JavaScript — no build, no framework
- [Apache ECharts](https://echarts.apache.org) 5.5.1 (vendored, with CDN fallback)
- [Nimiq design system](https://nimiq.com) — palette, gradients, components
- Fonts: **Mulish (Muli)** and **Fira Mono**, both under the SIL Open Font License (see [`assets/fonts/`](assets/fonts/))

## License

Code and site: [MIT](LICENSE). Bundled fonts: SIL OFL. Underlying market data is aggregated from third-party providers (e.g. DefiLlama) and remains subject to their respective terms.

> **Not financial advice.** A research and visualization project; figures are approximate and methodology-dependent.
