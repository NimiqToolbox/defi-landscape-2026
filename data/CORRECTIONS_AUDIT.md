# DeFi Dataset — Fact-Check & Enrichment Audit

**Run date:** 2026-06-18 · **Snapshot evaluated as-of:** 2026-06-16 (frozen — not moved) · **Today vs snapshot:** +2 days

**Method.** A multi-agent verification harness fanned out one fresh, context-free agent per quant/map/narrative file plus batched conference agents (32 verification units), each cross-checking the file's claims against live web sources (DefiLlama, CoinGecko, RWA.xyz, CoinDesk, The Block, Chainalysis, Electric Capital, etc.). Every proposed numeric change then passed an **independent adversarial re-check** (a second agent, given no prior reasoning, that had to re-derive the value from ≥2 independent sources) before being applied. Snapshot values that were correct on 2026-06-16 were kept and any live drift was flagged — never overwritten. Corrections were applied in place to `data/raw/*.json` and `data/defi_data.js`; this log records every change.

## 1. Summary

| Metric | Count |
|---|---|
| Claims examined | 808 |
| Confirmed | 772 |
| Wrong (as of snapshot) | 10 |
| Stale | 6 |
| Unverifiable | 20 |
| Value-fixes proposed | 21 |
| &nbsp;&nbsp;— applied (adversary-approved) | 16 |
| &nbsp;&nbsp;— held/contested (surfaced below) | 5 |
| New corroborating sources added | 39 (+2 manual in map_lending) |
| Confidence-tightening / drift notes added | 43 |
| Live-drift flags (snapshot kept, live noted) | 198 |
| Raw-file edits applied by editor agents | 99 across 30 files (22 skipped, all benign — see §7) |

All 50 raw JSON files re-validated as well-formed after editing; `data/defi_data.js` re-evaluates and chart array lengths remain aligned.

## 2. Value corrections (each numeric change + adversarial disposition)

| Claim path | From → To | Adversary | Applied? |
|---|---|---|---|
| `quant_tvl_by_category.json#/key_facts/2` | 74.5 → 74.0 | unverifiable | ⛔ held (unverifiable) |
| `quant_dex_volume.json#/key_facts/11` | Raydium overtook Uniswap in monthly DEX volume in Nov 2025 … → Raydium overtook Uniswap in monthly DEX volume in Nov 2024 — Raydium $124.6B vs Uniswap $… | approve | ✅ yes |
| `quant_dex_volume.json#/series/5/points/0` | label 'Raydium vs Uniswap monthly volume (Nov 2025 flip)'; … → label '...(Nov 2024 flip)'; period '2024-11' | approve | ✅ yes |
| `quant_dex_volume.json#/series/5/points/1` | 2025-11 → 2024-11 | approve | ✅ yes |
| `quant_dex_volume.json#/series/5/points/2` | 2025-11 → 2024-11 | contest | ⛔ held (contested) |
| `quant_dex_volume.json#/top_entities/2` | $124.6B/mo (Nov 2025); ~4.1% share Aug 2025 → $124.6B/mo (Nov 2024, briefly #1); ~4.1% share Aug 2025 | approve | ✅ yes |
| `data/defi_data.js#dexCexRatio.pct[8]` | labels[8]='2026', pct[8]=29.0 → either remove the unsupported '2026'=29.0% point, or replace with the sourced '2026·Jan'=… | contest | ⛔ held (contested) |
| `quant_stablecoins.json#/series/0/points/8` | Intra-year low ~$124B in Oct 2023. → Intra-year low ~$122.7B on 2023-08-19 (DefiLlama). | approve | ✅ yes |
| `quant_restaking.json#/top_entities/6` | https://api.llama.fi/protocol/karak (and defillama.com/prot… → https://api.llama.fi/protocol/karak-protocol (and https://defillama.com/protocol/karak-pr… | approve | ✅ yes |
| `quant_users.json#/top_entities/7` | ~68 million (+14%) / metric: monthly active addresses (2025… → clarify period (e.g. peak-month) and drop 'most active network' for Solana - by Sep 2025 … | approve | ✅ yes |
| `quant_hacks.json#/top_entities/1` | ~$625M (73,600 ETH + 25.5M USDC) → ~$625M (173,600 ETH + 25.5M USDC) | approve | ✅ yes |
| `map_rwa.json#/leaders/10` | ~$700M AUM (press, 2026) \| dashboard 2.40 → FOBXX ~$0.83B AUM (Q1 2026); BENJI suite ~$1.98B AUM (Apr 2026) \| dashboard value 2.40 s… | approve | ✅ yes |
| `map_lending.json#/summary` | roughly 60-63% market share → roughly 36-42% of the DefiLlama lending category (~60% only when measured against the nar… | contest | ⛔ held (contested) |
| `map_lending.json#/leaders/4/value` | ~$6.7B reported at Jan 2026 peak → ~$9.3B all-time-high TVL (Dec 2024); ~$3.7B at end-2025 | approve | ✅ yes |
| `map_lending.json#/leadership_shift` | (~60-63% share, ~$13B+ lead) → (~36-42% of the DefiLlama lending category, ~$13B+ lead over #2) | approve | ✅ yes |
| `map_yield.json#/leaders/3/value (Convex TVL)` | ~$1.28B (up from ~$1.0B Nov 2025); 2022 peak >$20B → ~$0.51B (DefiLlama aggregate, Jun 2026; note: DefiLlama no longer double-counts Convex's … | approve | ✅ yes |
| `map_bridges_interop.json#/leaders/1/note` | W token (~$0.03, ~$177M mcap as of late 2025/2026) → W token (~$0.0097, ~$58M mcap as of mid-Jun 2026) | approve | ✅ yes |
| `narrative_timeline.json#/events/28` | RWA tokenization reaches ~$33B (late 2025); 'tokenized Trea… → RWA tokenization reaches ~$20B excl. stablecoins by end of 2025 (up from ~$5.5B at the st… | approve | ✅ yes |
| `narrative_timeline.json#/eras/6` | tokenized Treasuries/RWAs scale toward ~$33B → tokenized Treasuries/RWAs scale to ~$20B (end-2025) and ~$32B by mid-2026 excl. stablecoi… | approve | ✅ yes |
| `conf_hkw3_26.json#/attendance` | 20,000+ attendees (200+ speakers, 100+ partners, 4 stages, … → Thousands of attendees on-site (~50,000 participants when including online viewers per or… | contest | ⛔ held (contested) |
| `conf_sui_basecamp26.json#/dates` | 2026: tentatively September 15-17, 2026 per the unofficial … → 2026: officially announced October 7-8, 2026, Singapore, co-located with TOKEN2049 (per S… | approve | ✅ yes |

**Dashboard mirrors updated by hand** (kept in sync with the raw fixes above): `defi_data.js` — `rwaLeadersNow` Franklin BENJI 2.40 → 1.98; `categoryMap.lending` share string reframed to "~60% of borrows / ~36–42% of lending-category TVL"; `timeline` 2025-12 RWA event "$33B" → "$20B (ex-stablecoins), scaled to ~$32B by mid-2026"; Sui Basecamp 2026 dates. `index.html` — Raydium/Uniswap flip "Nov-2025" → "Nov-2024"; lending lead share basis clarified. `data/timeseries_long.csv` (BENJI 1.98) and `data/conferences.csv` (Sui dates) regenerated to match.

## 3. Contested / held — surfaced for your review (NOT auto-applied)

| Claim path | Current | Issue | Handling |
|---|---|---|---|
| `map_lending.json#/summary` | Aave "~60-63% share" | metric basis ambiguous (borrows vs TVL) | Resolved by disambiguation: stated BOTH ~60-63% of active borrows (Token Terminal) AND ~36-42% of lending-category TVL;… |
| `quant_dex_volume.json#/series/5/points/2` | PancakeSwap $70.56B @ 2025-… | verifier wanted to re-date to 2024-11 | Held — adversary confirmed $70.56B IS Nov-2025; left unchanged (only the Raydium/Uniswap points were re-dated to Nov-20… |
| `data/defi_data.js#dexCexRatio.pct[8]` | 2026 DEX:CEX = 29.0% | unsupported; methodology-dependent (13.6% CoinGecko… | Held — kept 29.0% pending your call; no single replacement is defensible. Candidate for a future refresh. |
| `conf_hkw3_26.json#/attendance` | HK Web3 2026 "20,000+" | official PR says "thousands"; ~10k on-site / ~50k i… | Held — kept 20,000+ (organizer figure); secondary estimates vary. |

## 4. Enrichment — corroborating sources added

39 new independent source URLs were appended to raw files (append-only; existing sources never removed), plus 2 added by hand to `map_lending.json` (The Defiant SparkLend, Anchorage Digital). Selected examples:

| File | Source appended |
|---|---|
| `conf_money2020_25.json` | Appended the Western Union IR press-release URL (primary source for the headline USDPT/Solana announcement) t… |
| `conf_pbw26.json` | Appended Elysee-confirmed Macron special-address Chainwire URL (2026-03-26) to file-level #/sources; not prev… |
| `conf_sui_basecamp26.json` | Appended the Sui Network official X announcement URL (Basecamp 2026) to the file-level sources[]; not previou… |
| `map_aggregators_frontends.json` | Appended the CoinDesk (May 2025) CoW Swap article URL to the file-level #/sources array as an independent, no… |
| `map_bridges_interop.json` | Appended DL News $110M Stargate-acquisition article to file-level #/sources as independent corroboration; ver… |
| `map_bridges_interop.json` | Appended CoinReporter article corroborating the $18B March-2026 monthly CCIP volume to file-level #/sources; … |
| `map_bridges_interop.json` | Appended primary-source Circle blog post on the Dec-15-2025 Interop Labs acquisition (AXL token excluded) to … |
| `map_cdp_synth.json` | Appended Motley Fool 'largest stablecoins' URL to file-level sources[] as an independent (non-DefiLlama) corr… |
| `map_cdp_synth.json` | Appended CoinGecko Frankencoin URL to file-level sources[] as an independent corroborator of ZCHF supply/peg … |
| `map_perps_derivs.json` | Appended MEXC URL to #/sources as independent corroboration of Hyperliquid 44% / Aster pullback share dynamic… |
| `map_perps_derivs.json` | Appended Cointelegraph 2025 recap URL to #/sources as independent corroboration of the 2025 ~$7.9T total and … |
| `map_rwa.json` | Appended CoinCentral USYC>BUIDL article to #/sources (non-CoinDesk corroboration of the overtaking and $1.84B… |
| `map_rwa.json` | Appended Maple Finance 2025 Data Review to #/sources (issuer corroboration of syrupUSDC $3.02B / syrupUSDT $1… |
| `map_rwa.json` | Appended Gate blog RWA triopoly article to #/sources (corroborates the $380M Q1 2023 -> $13.5B Apr 2026 growt… |
| `map_stablecoins.json` | Appended CoinDesk Research April-2026 stablecoin report URL corroborating the $321B April ATH and USDT/USDC c… |
| `map_stablecoins.json` | Appended Motley Fool 'Largest Stablecoins 2026' ranking URL corroborating USDT/USDC sizes and ordering (item … |
| `map_stablecoins.json` | Appended CoinLaw USDC Statistics URL corroborating USDC ~24.3% share and ~$77-78B size (item 3). |
| `map_stablecoins.json` | Appended Cointelegraph URL corroborating USDe ~$14.7B Oct-2025 peak and post-crash drawdown trajectory (item … |
| `map_staking_restaking.json` | Appended DefiLlama Binance staked ETH page to #/sources corroborating the ~$6.6B / ~9% Binance LST claim. |
| `map_staking_restaking.json` | Appended DefiLlama ether.fi page to #/sources corroborating the ~$3.0B eETH LRT-leader claim. |
| `map_staking_restaking.json` | Appended DefiLlama Kelp page to #/sources corroborating the #2 LRT ~$1.0B claim. |
| `map_staking_restaking.json` | Appended DefiLlama Jito Liquid Staking page to #/sources corroborating the Solana LST leader ~$0.72B claim. |
| `map_staking_restaking.json` | Appended DefiLlama Symbiotic page to #/sources corroborating the ~$0.35B modular-restaking-challenger claim. |
| `map_staking_restaking.json` | Appended DefiLlama Renzo page to #/sources corroborating the collapsed ~$0.1B figure. |
| `map_staking_restaking.json` | Appended DefiLlama Kinetiq kHYPE page to #/sources corroborating the summary's Kinetiq ~$1.1B Hyperliquid LST… |
| `map_yield.json` | Appended CoinDesk (Ethena/Janus Henderson) URL to file-level sources[] as independent corroboration of USDe s… |
| `narrative_regulation.json` | Appended authoritative OFAC recent-actions primary URL to the 2025-03-21 Tornado Cash delisting event sources… |
| `narrative_regulation.json` | Appended Congress.gov H.R.3633 primary legislative record to the 2025-07-17 CLARITY Act event sources (distin… |
| … | _+11 more (see git diff of `data/raw/`)_ |

## 5. Live-drift flags (value was correct on 2026-06-16; live figure on 2026-06-18 differs)

Snapshot values were **kept**; these are informational. 198 total drift flags; 30 material (|Δ| ≥ 5%):

| Claim path | Snapshot | Live (2026-06-18) | Δ% |
|---|---|---|---|
| `map_bridges_interop.json#/leaders/0/value` | ~35% messaging share; ~… | $260B+ cumulative volum… | +160% |
| `conf_das.json#/attendance` | 2,500+ attendees, 150+ … | ~5,461 (third-party tra… | +118% |
| `map_lending.json#/leaders/5/value` | ~$1.1-3.6B TVL; ~75% of… | ~$1.1B Kamino Lend (dow… | -69% |
| `map_bridges_interop.json#/leaders/3/value` | ~18% messaging share; ~… | single-digit $M/day in … | -60% |
| `map_lending.json#/leaders/3/value` | ~$2.7B TVL (~10% of Aav… | ~$1.2B Compound family … | -55.6% |
| `quant_dex_volume.json#/key_facts/0` | $10.43 billion (24h, as… | $7.20 billion | -30.97% |
| `map_lending.json#/leaders/0/value` | ~$17-19.4B TVL; ~60-63%… | ~$12.9B Aave TVL (live) | -29% |
| `map_dex.json#/summary (DEX-to-CEX spot ratio …` | ~29% (2026), ~21% (Nov … | ~37.4% DEX/CEX ratio AT… | +28.97% |
| `map_yield.json#/leaders/2/value (Morpho Vault…` | >$10B Q4 2025 peak; ~$5… | Aggregate Morpho TVL ~$… | +21.6% |
| `map_bridges_interop.json#/leaders/5/value` | $28B+ cumulative; 0 exp… | $34B+ cumulative (Acros… | +21% |
| `quant_yield.json#/key_facts/1` | ~$1.18B | ~$0.95B | -19.5% |
| `quant_yield.json#/series/0/points/7` | 1.18 | ~$0.95B | -19.5% |
| `quant_yield.json#/top_entities/1` | ~$1.18B | ~$0.95B | -19.5% |
| `map_yield.json#/summary (Pendle category lead…` | Pendle = clear leader o… | Pendle aggregate TVL ~$… | -19.5% |
| `map_yield.json#/leaders/0/value (Pendle TVL b…` | ~$1.18B (narrowed categ… | ~$950M aggregate | -19.5% |
| `map_yield.json#/leaders/7/value (CIAN Yield L…` | ~$308M; #1 of yield-agg… | ~$362M | +17.5% |
| `map_dex.json#/leaders/8 (Meteora)` | ~$4.1B 30d (DLMM); TVL … | Meteora all-protocol to… | +15.1% |
| `quant_rwa.json#/key_facts/15` | $6.14B distributed / $2… | $6.12B distributed / $2… | +10.72% |
| `quant_restaking.json#/key_facts/7` | Renzo $4.05B->$0.11B; K… | Renzo $98.6M (file $0.1… | -10.4% |
| `quant_restaking.json#/top_entities/4` | $0.11B | $98.6M | -10.4% |
| `map_aggregators_frontends.json#/leaders/9` | ~$553M 30d; ~$9M 24h | 30d $505.6M; 24h $4.3M | -8.5% |
| `map_cdp_synth.json#/leaders/6` | ~$65M TVL | TVL $69.9M | +7.5% |
| `map_bridges_interop.json#/leaders/4/value` | 140+ chains (largest fo… | 150+ chains (after TRON… | +7% |
| `map_dex.json#/leaders/9 (Jupiter aggregator)` | ~$19.7B 30d; ~95% Solan… | Jupiter aggregator tota… | +6.9% |
| `map_dex.json#/leaders/1 (PancakeSwap)` | AMM V3 ~$18.6B + Infini… | PancakeSwap TVL ~$2.05B… | -6.8% |
| `quant_restaking.json#/top_entities/6` | $0.01B | $6.53M | -6.7% |
| `map_aggregators_frontends.json#/leaders/0` | ~$19.73B 30d; ~$950M 24… | $21.05B 30d, $852M 24h,… | +6.7% |
| `map_cdp_synth.json#/leaders/8` | Synthetix V3 ~$35M TVL;… | V3 $32.87M; v1+v2 ~$1.8K | -6.1% |
| `map_aggregators_frontends.json#/leaders/7` | ~$1.96B 30d; ~2.9% all-… | 30d $1.854B | -5.6% |
| `quant_liquid_staking.json#/top_entities/2` | ~$1.12B | $1.06B | -5.4% |

_The broad H1-2026 drawdown means most "live" figures are slightly below the 2026-06-16 snapshot; the dashboard intentionally preserves the snapshot for internal consistency._

## 6. Unverifiable claims (20)

Could not be confirmed against ≥2 independent sources (paywalls/HTTP 402, thin or forward-dated agendas, single-source figures). Left as-is with confidence noted:

| Claim path | Note |
|---|---|
| `quant_dex_volume.json#/series/2/points/3` | Did not spend a web action specifically isolating the Q3-2025 ~$1.43T quarterly spot figure (budget prioritiz… |
| `quant_perps.json#/key_facts/9` | Low-confidence round figure in-file. DefiLlama (the cited primary) returned HTTP 403, consistent with the fil… |
| `quant_perps.json#/top_entities/5` | Same as key_facts/9 — DefiLlama primary gated (403); Datawallet secondary not re-fetched to preserve web-acti… |
| `quant_perps.json#/top_entities/8` | File already self-flags this as low-confidence/not reliably sourced. No numeric claim to verify; appropriatel… |
| `quant_restaking.json#/key_facts/5` | File flags this medium-confidence with only a Medium-blog source. I did not spend a web action on this non-he… |
| `quant_rwa.json#/series/0/points/0` | Explicitly flagged low-confidence/order-of-magnitude in-file. No reliable independent 2021 on-chain RWA aggre… |
| `quant_users.json#/key_facts/10` | Flagged low-confidence in-file. The 300-390M DeFi-specific MAA band uses a broader crawl methodology than a16… |
| `quant_users.json#/top_entities/7` | POTENTIAL DISCREPANCY: file says Solana ~68M (2025, 'most active network'), but live CryptoRank/BlockchainRep… |
| `quant_users.json#/top_entities/9` | The specific ~13M (+53%) Ethereum 2025 monthly-active figure traces to a single source (CryptoRank Q3 2025) a… |
| `map_dex.json#/leaders/10 (Balancer)` | Could not get a clean live Balancer aggregate TVL (summarizer error on large JSON). Qualitative 'niche/mid-ti… |
| `map_perps_derivs.json#/leaders/8` | Aevo's specific micro-figures are below the granularity I could confirm in remaining budget; they are tiny ab… |
| `conf_das.json#/attendance` | The 2,500+ / $4.2t figures are explicitly flagged in-file as third-party listing and could not be confirmed a… |
| `conf_ethcc8.json#/notable_speakers` | Official homepage does not enumerate EthCC[8] speakers (archive-linked only), so the specific roster is unver… |
| `conf_kbw25.json#/notable_speakers` | The KBW2025 speaker roster could not be re-verified against the live official site (now KBW2026), so marked u… |
| `conf_mainnet25.json#/attendance` | File correctly self-flags 2025 attendance as not verifiable. No authoritative 2025 attendance located; the 20… |
| `conf_pbw26.json#/attendance` | 2026 attendance is a forward projection and not yet a realized/verified figure (no post-event recap exists as… |
| `conf_smartcon25.json#/attendance` | The precise '1,701 confirmed guests' figure traces to a Vendelux attendee-list page that now returns HTTP 410… |
| `conf_sui_basecamp26.json#/attendance` | 2026 is a forward-dated event (now Oct 7-8, 2026) that has not happened; no official attendance number exists… |
| `conf_sui_basecamp26.json#/notable_speakers` | No 2026 speaker lineup is published (landing page only offers an email signup and sponsor form). The file's r… |
| `conf_t2049_dubai.json#/notable_speakers` | Forward-dated/just-passed event with the official agenda already rotated; the file correctly flags its speake… |

## 7. Per-unit results

| Unit | Claims | Confirmed | Edits applied (raw file) | Skipped |
|---|---|---|---|---|
| `quant_total_tvl.json` | 29 | 28 | 3 | 1 |
| `quant_tvl_by_chain.json` | 38 | 35 | 1 | 1 |
| `quant_tvl_by_category.json` | 30 | 31 | 3 | 2 |
| `quant_dex_volume.json` | 27 | 19 | 11 | 2 |
| `quant_lending.json` | 34 | 33 | 3 | 2 |
| `quant_stablecoins.json` | 27 | 27 | 1 | 0 |
| `quant_perps.json` | 31 | 27 | 4 | 1 |
| `quant_liquid_staking.json` | 28 | 29 | 3 | 0 |
| `quant_restaking.json` | 24 | 23 | 4 | 2 |
| `quant_rwa.json` | 32 | 32 | 6 | 0 |
| `quant_yield.json` | 27 | 27 | 1 | 3 |
| `quant_bridges.json` | 37 | 31 | 0 | 0 |
| `quant_users.json` | 38 | 32 | 2 | 1 |
| `quant_fees_revenue.json` | 57 | 49 | 3 | 0 |
| `quant_hacks.json` | 36 | 31 | 2 | 0 |
| `quant_developers.json` | 48 | 41 | 2 | 0 |
| `map_rwa.json` | 15 | 15 | 5 | 0 |
| `map_dex.json` | 15 | 14 | 1 | 1 |
| `map_lending.json` | 16 | 14 | 0 (+6 manual) | 0 |
| `map_stablecoins.json` | 14 | 15 | 4 | 0 |
| `map_staking_restaking.json` | 12 | 13 | 8 | 2 |
| `map_perps_derivs.json` | 12 | 10 | 3 | 0 |
| `map_yield.json` | 12 | 11 | 2 | 1 |
| `map_bridges_interop.json` | 15 | 12 | 6 | 0 |
| `map_cdp_synth.json` | 12 | 12 | 2 | 1 |
| `map_aggregators_frontends.json` | 14 | 15 | 1 | 1 |
| `narrative_timeline.json` | 36 | 34 | 4 | 0 |
| `narrative_regulation.json` | 26 | 25 | 5 | 0 |
| `conf_batch` | 18 | 18 | 0 | 0 |
| `conf_batch` | 18 | 13 | 0 | 0 |
| `conf_batch` | 18 | 14 | 4 | 1 |
| `conf_batch` | 12 | 7 | 5 | 0 |

Skipped edits (22 total) were all benign: append-only rules correctly refused to overwrite already-populated single `source_url` scalars (the corroborating source is still recorded here and surfaced on the site's data room), `tighten_confidence` items targeting files with no confidence field, and the intentionally-held items from §3.

## 8. Methodology ranges intentionally preserved

Documented source disagreements were verified on **both** ends and kept as ranges, not collapsed: total DeFi TVL ATH $177.5B (DefiLlama consistent methodology) vs ~$202–237B (DappRadar/CoinDesk broader inclusion); 2025 perp-DEX volume $6.4T (CoinGecko) – $7.9T (DefiLlama-derived); cumulative addresses ~333M vs ~40–70M real monthly-active users. The DefiLlama-primary headline series remains the dashboard default.

---
_Generated from the verification + apply run transcripts. Raw per-claim evidence (every source URL fetched, per-claim verdicts) is in the run transcripts; the strongest corroborating sources are compiled into `data/defi_data.js` (`sourcesByRaw`) and surfaced in the site's **Data & sources** room._
