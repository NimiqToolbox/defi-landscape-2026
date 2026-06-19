/* app.js — renders the DeFi Landscape dashboard from window.DEFI_DATA using ECharts.
   Themed with the Nimiq design system (light): Muli type, Nimiq palette, white cards. */
(function () {
  "use strict";
  var D = window.DEFI_DATA;
  if (!D) { console.error("DEFI_DATA missing"); return; }
  var hasECharts = !!window.echarts;

  /* ---- Nimiq chart palette: 12 slots ordered for adjacent hue+lightness contrast ---- */
  var PAL = ["#0582CA", "#FC8702", "#21BCA5", "#5F4B8B", "#E9B213", "#D94432",
             "#88B04B", "#1F2348", "#FA7268", "#0CA6FE", "#795548", "#FC7500"];

  /* ---- Light-theme constants (Nimiq Blue at opacity; tooltip stays dark on purpose) ---- */
  var FONT = "Muli, -apple-system, 'Segoe UI', Roboto, sans-serif";
  var TXT = "rgba(31,35,72,.70)", FAINT = "rgba(31,35,72,.50)", SPLIT = "rgba(31,35,72,.10)",
      AXISLINE = "rgba(31,35,72,.16)", TIP_BG = "#1F2348", TIP_BORDER = "rgba(31,35,72,.16)",
      TIP_TXT = "rgba(255,255,255,.92)", LEGEND_OFF = "rgba(31,35,72,.25)", CARD_BG = "#FFFFFF";
  var instances = [];
  var renderThunks = {};                 // id -> render fn; populated by defer(), drained on scroll into view
  function defer(id, fn) { renderThunks[id] = fn; }

  /* ---- Register the Nimiq theme: owns palette, font, axis/legend/tooltip "look" ---- */
  if (hasECharts) {
    window.echarts.registerTheme("nimiq", {
      color: PAL,
      backgroundColor: "transparent",
      textStyle: { fontFamily: FONT, color: TXT },
      title: { textStyle: { color: "#1F2348", fontFamily: FONT } },
      legend: { textStyle: { color: TXT, fontSize: 13 }, inactiveColor: LEGEND_OFF },
      tooltip: {
        backgroundColor: TIP_BG, borderColor: TIP_BORDER, borderWidth: 1,
        textStyle: { color: TIP_TXT, fontSize: 13 },
        extraCssText: "box-shadow:0 8px 24px rgba(31,35,72,.22);border-radius:8px;padding:8px 11px;"
      },
      categoryAxis: {
        axisLine: { lineStyle: { color: AXISLINE } }, axisTick: { show: false },
        axisLabel: { color: TXT, fontSize: 13 }, splitLine: { show: false }
      },
      valueAxis: {
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: TXT, fontSize: 13 },
        nameTextStyle: { color: FAINT, fontSize: 12 },
        splitLine: { lineStyle: { color: SPLIT } }
      }
    });
  }

  function el(id) { return document.getElementById(id); }

  function mk(id) {
    var node = el(id);
    if (!node) return null;
    if (!hasECharts) { node.innerHTML = '<div style="color:rgba(31,35,72,.5);font-size:13px;padding:20px;text-align:center">Chart library unavailable offline — see the data file & raw JSON.</div>'; return null; }
    var c = window.echarts.init(node, "nimiq", { renderer: "canvas" });
    instances.push(c);
    return c;
  }

  /* ---- Shared building blocks (colors/sizes inherited from the theme) ---- */
  function baseGrid(extraBottom) { return { left: 8, right: 28, top: 46, bottom: extraBottom || 8, containLabel: true }; }
  function tip(extra) { return Object.assign({ confine: true }, extra || {}); }
  function legend(top) {
    return { type: "scroll", top: top || 6, itemWidth: 14, itemHeight: 9, icon: "roundRect",
             pageIconColor: TXT, pageIconInactiveColor: LEGEND_OFF, pageTextStyle: { color: TXT } };
  }
  function catAxis(cats) { return { type: "category", data: cats }; }
  function valAxis(name, fmt) { return { type: "value", name: name || "", nameGap: 12, axisLabel: { formatter: fmt } }; }

  /* ---- responsive(): wrap a base option with ECharts native `media` overrides keyed off the
     chart's CONTAINER width (getWidth() of the init node, NOT the viewport). ECharts re-picks the
     matching media query on every c.resize() — already wired below — so rotation/resize "just works".
     maxWidth 430 = chart-div px: phones measure ~280–350 (match), desktop 2-col charts ~521 (no match). ---- */
  var MOBILE_W = 430;
  function arrN(n, obj) { var a = []; for (var i = 0; i < n; i++) a.push(obj); return a; }
  function responsive(kind, base, o) {
    o = o || {};
    var nS = (base.series || []).length || 1;
    var nY = [].concat(base.yAxis || []).length || 1;
    var multi = nS > 1, m;
    if (kind === "line") {
      m = { grid: { left: 4, right: 10, top: multi ? 64 : 36, bottom: 4 },
            xAxis: { axisLabel: { fontSize: 11, hideOverlap: true } },
            yAxis: arrN(nY, { axisLabel: { fontSize: 11 }, name: "", nameGap: 8 }),
            legend: multi ? { top: 4, itemWidth: 12, itemHeight: 8, itemGap: 8, textStyle: { fontSize: 11 } } : undefined };
    } else if (kind === "barV") {
      m = { grid: { left: 4, right: 8, top: multi ? 60 : 34, bottom: 4 },
            xAxis: { axisLabel: { fontSize: 11, hideOverlap: true, interval: 0 } },
            yAxis: arrN(nY, { axisLabel: { fontSize: 11 }, name: "", nameGap: 8 }),
            legend: multi ? { top: 4, itemWidth: 12, itemHeight: 8, textStyle: { fontSize: 11 } } : undefined,
            series: arrN(nS, { barMaxWidth: 28 }) };
    } else if (kind === "barH") {
      m = { grid: { left: 4, right: 44, top: 8, bottom: 4 },
            xAxis: { name: "" },   // drop the value-axis name on phones (the card caption carries units)
            yAxis: { axisLabel: { fontSize: 11, width: 96, overflow: "truncate" } },
            series: arrN(nS, { label: { fontSize: 10 } }) };
    } else if (kind === "pie") {
      m = { legend: { orient: "horizontal", left: "center", right: "auto", top: "auto", bottom: 4,
                      itemWidth: 12, itemHeight: 8, textStyle: { fontSize: 11 } },
            series: [{ center: ["50%", "42%"], radius: ["42%", "66%"], label: { fontSize: 11 } }] };
    } else if (kind === "dual") {
      m = { grid: { left: 2, right: 2, top: 60, bottom: 4 },
            legend: { top: 4, itemWidth: 12, itemHeight: 8, textStyle: { fontSize: 11 } },
            xAxis: { axisLabel: { fontSize: 11, hideOverlap: true } },
            yAxis: arrN(nY, { axisLabel: { fontSize: 11 }, name: "", nameGap: 6 }),
            series: o.mobileSeries || arrN(nS, {}) };
    }
    return { baseOption: base, media: [{ query: { maxWidth: MOBILE_W }, option: m }] };
  }

  var fmtUSDb = function (v) { return v == null ? "" : "$" + (v >= 100 ? Math.round(v) : v) + "B"; };
  var fmtUSDt = function (v) { return v == null ? "" : "$" + v + "T"; };
  var fmtPct = function (v) { return v == null ? "" : v + "%"; };
  var fmtNum = function (v) { return v == null ? "" : (v >= 1000 ? (v / 1000) + "k" : v); };

  /* ---- citation helpers: surface source provenance from D.sourcesByRaw ---- */
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(s) {
    if (!s) return "";
    var m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(s);
    if (!m) return s;
    var mo = MONTHS[parseInt(m[2], 10) - 1] || "";
    return (m[3] ? parseInt(m[3], 10) + " " : "") + mo + " " + m[1];
  }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function srcLine(sources, fallbackAsOf) {
    if (!sources || !sources.length) return "";
    var parts = sources.slice(0, 3).map(function (s) {
      var d = s.asOf || fallbackAsOf;
      var label = esc(s.name) + (d ? " · " + fmtDate(d) : "");
      return s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + label + ' ↗</a>' : label;
    });
    return "Source: " + parts.join(" · ");
  }
  function srcByRaw(raw) { return (D.sourcesByRaw && raw) ? D.sourcesByRaw[raw] : null; }

  function lineChart(id, cats, series, o) {
    defer(id, function () {
      var c = mk(id); if (!c) return;
      o = o || {};
      var multi = series.length > 1;
      var ser = series.map(function (s, i) {
        var col = s.color || PAL[i % PAL.length];
        var stacked = !!s.stack;
        var area = null;
        if (s.area) {
          area = stacked
            ? { color: hexA(col, 0.85) }
            : { color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: hexA(col, 0.22) }, { offset: 1, color: hexA(col, 0.04) }]) };
        }
        var showSym = s.symbol === true ? true : (s.symbol === false ? false : !multi);
        return {
          name: s.name, type: s.type || "line", data: s.data, smooth: s.smooth !== false,
          showSymbol: showSym, symbolSize: 6, stack: s.stack, yAxisIndex: s.yAxisIndex || 0,
          lineStyle: { width: s.width || (stacked ? 1.6 : 2.6), type: s.dashed ? "dashed" : "solid", color: col },
          itemStyle: { color: col },
          areaStyle: area,
          emphasis: { focus: "series" }
        };
      });
      var yAxes = o.yAxes || [valAxis(o.yName, o.yFmt || fmtUSDb)];
      c.setOption(responsive("line", {
        grid: baseGrid(o.gridBottom),
        tooltip: tip({ trigger: "axis", valueFormatter: o.tipFmt, order: o.tipOrder }),
        legend: multi ? legend() : undefined,
        xAxis: catAxis(cats), yAxis: yAxes, series: ser
      }, o));
    });
  }

  function barChart(id, cats, series, o) {
    defer(id, function () {
      var c = mk(id); if (!c) return;
      o = o || {};
      var labelFmt = o.labelFmt || o.yFmt;
      var ser = series.map(function (s, i) {
        var col = s.color || PAL[i % PAL.length];
        var lbl = s.label;
        if (lbl == null && o.horizontal && o.valueLabels !== false) {
          lbl = { show: true, position: "right", color: TXT, fontFamily: FONT, fontSize: 12,
                  formatter: function (p) { return labelFmt ? labelFmt(p.value) : p.value; } };
        }
        return { name: s.name, type: "bar", data: s.data, stack: s.stack, barMaxWidth: o.barMax || 46,
                 itemStyle: { color: col, borderRadius: o.round == null ? [4, 4, 0, 0] : o.round },
                 emphasis: { focus: "series" }, label: lbl };
      });
      var valAx = valAxis(o.yName, o.yFmt);
      if (o.horizontal) valAx = Object.assign(valAx, { axisLabel: { show: false }, splitLine: { show: false } });
      var grid = baseGrid(o.gridBottom);
      if (o.horizontal) grid.right = 60; // headroom for end-of-bar value labels (containLabel ignores series labels)
      c.setOption(responsive(o.horizontal ? "barH" : "barV", {
        grid: grid,
        tooltip: tip({ trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: o.tipFmt }),
        legend: series.length > 1 ? legend() : undefined,
        xAxis: o.horizontal ? valAx : catAxis(cats),
        yAxis: o.horizontal ? catAxis(cats) : (o.yAxes || [valAxis(o.yName, o.yFmt || fmtUSDb)]),
        series: ser
      }, o));
    });
  }

  function pieChart(id, data, o) {
    defer(id, function () {
      var c = mk(id); if (!c) return;
      o = o || {};
      var dense = !!(data && data.length > 6);
      c.setOption(responsive("pie", {
        tooltip: tip({ trigger: "item", formatter: function (p) {
          return p.name + "<br/><b>" + (o.fmt ? o.fmt(p.value) : p.value) + "</b> (" + p.percent + "%)"; } }),
        legend: { type: "scroll", orient: "vertical", right: 6, top: "middle", itemWidth: 14, itemHeight: 9,
                  icon: "roundRect", textStyle: { color: TXT, fontSize: 12.5 }, inactiveColor: LEGEND_OFF,
                  pageIconColor: TXT, pageIconInactiveColor: LEGEND_OFF, pageTextStyle: { color: TXT } },
        series: [{
          type: "pie", radius: ["46%", "72%"], center: ["40%", "52%"], avoidLabelOverlap: true,
          itemStyle: { borderColor: CARD_BG, borderWidth: 2 },
          label: dense ? { show: false } : { color: TXT, fontSize: 13, fontWeight: 600, formatter: "{d}%" },
          labelLine: { lineStyle: { color: SPLIT } },
          emphasis: dense
            ? { scale: true, scaleSize: 6, label: { show: true, color: "#1F2348", fontSize: 13, fontWeight: 700, formatter: "{b}  {d}%" } }
            : { scale: true, scaleSize: 6 },
          data: data
        }]
      }, o));
    });
  }

  function hexA(hex, a) {
    var h = hex.replace("#", "");
    var r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  /* ---------------- KPI CARDS ---------------- */
  (function () {
    var host = el("kpis"); if (!host) return;
    host.innerHTML = D.kpis.map(function (k) {
      var ks = srcByRaw(k.raw); var src = srcLine(ks ? ks.slice(0, 1) : null, D.meta && D.meta.asOf);
      return '<div class="kpi"><div class="v">' + k.value + '</div><div class="l">' + k.label + '</div><div class="s">' + k.sub + '</div>' + (src ? '<div class="src">' + src + '</div>' : '') + '</div>';
    }).join("");
  })();

  /* ---------------- TIMELINE ---------------- */
  (function () {
    var host = el("timeline"); if (!host) return;
    host.innerHTML = D.timeline.map(function (e) {
      return '<div class="tl-item"><div class="d">' + e.date + '</div><div class="t">' + e.title + '</div><div class="x">' + e.desc + '</div></div>';
    }).join("");
  })();
  (function () {
    var host = el("regulation-timeline"); if (!host) return;
    host.innerHTML = D.regulation.map(function (e) {
      return '<div class="tl-item"><div class="d">' + e.date + '</div><div class="t">' + e.title + '</div><div class="x">' + e.impact + '</div></div>';
    }).join("");
  })();

  /* ---------------- MAP CARDS ---------------- */
  (function () {
    var host = el("map-cards"); if (!host) return;
    host.innerHTML = D.categoryMap.map(function (m) {
      return '<div class="mapcard"><h3>' + m.title + '</h3>' +
        '<div class="lead-l"><b>Leaders:</b> ' + m.leaders + '</div>' +
        '<div class="shift">' + m.shift + '</div>' +
        '<div class="src">Raw: <a href="data/raw/' + m.raw + '">' + m.raw + '</a></div></div>';
    }).join("");
  })();

  /* ---------------- CONFERENCE TABLE ---------------- */
  (function () {
    var host = el("conf-table"); if (!host) return;
    var rows = D.conferences.map(function (c) {
      var badge = c.inWindow ? '<span class="badge win">✓</span>' : '<span class="badge out">✗</span>';
      var themes = c.themes.map(function (t) { return '<span class="chip">' + t + '</span>'; }).join(" ");
      return "<tr><td><b>" + c.name + "</b>" + (c.note ? '<div class="muted">' + c.note + '</div>' : "") +
        "</td><td>" + c.dates + "<div class='muted'>" + c.loc + "</div></td><td>" + c.attendance + "</td>" +
        "<td>" + badge + "</td><td>" + themes + "</td><td class='muted'>" + c.speakers + "</td></tr>";
    }).join("");
    host.innerHTML = "<thead><tr><th>Event</th><th>Dates / location</th><th>Scale</th><th>In&nbsp;window</th><th>Top DeFi themes</th><th>Headline speakers</th></tr></thead><tbody>" + rows + "</tbody>";
  })();

  /* ---------------- DATA ROOM: raw-file manifest ---------------- */
  (function () {
    var host = el("data-files"); if (!host || !D.rawFiles) return;
    var GROUPS = [
      { key: "quant", label: "Quantitative datasets (time series & snapshots)" },
      { key: "map", label: "Protocol & category leadership maps" },
      { key: "narrative", label: "Narrative timelines" },
      { key: "conf", label: "Conference coverage (Jun 2025 → Jun 2026)" }
    ];
    host.innerHTML = GROUPS.map(function (g) {
      var fl = D.rawFiles.filter(function (f) { return f.group === g.key; });
      if (!fl.length) return "";
      var rows = fl.map(function (f) {
        return "<tr><td><b>" + esc(f.title) + "</b></td><td class='muted'>" + esc(f.desc || "") +
          "</td><td>" + (f.asOf ? fmtDate(f.asOf) : "") + "</td>" +
          "<td><a href='data/raw/" + esc(f.file) + "'>" + esc(f.file) + " ↓</a></td></tr>";
      }).join("");
      return "<div class='card' style='margin-top:18px'><h3>" + esc(g.label) +
        " <span class='muted'>(" + fl.length + " files)</span></h3>" +
        "<div class='tablewrap'><table><thead><tr><th>Dataset</th><th>What&rsquo;s in it</th><th>As of</th><th>Raw file</th></tr></thead><tbody>" +
        rows + "</tbody></table></div></div>";
    }).join("");
  })();

  /* ---------------- MASTER SOURCE TABLE ---------------- */
  (function () {
    var host = el("sources-table"); if (!host) return;
    var provs = D.sourceProviders || [];
    if (!provs.length) { var c = host.closest ? host.closest(".card") : null; if (c) c.style.display = "none"; return; }
    var rows = provs.map(function (p) {
      var h = p.url ? p.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : "";
      return "<tr><td><b>" + esc(p.name) + "</b></td><td class='muted'>" + p.files + " dataset" + (p.files === 1 ? "" : "s") + "</td><td>" +
        (p.url ? "<a href='" + esc(p.url) + "' target='_blank' rel='noopener'>" + esc(h) + " ↗</a>" : "") + "</td></tr>";
    }).join("");
    host.innerHTML = "<thead><tr><th>Provider</th><th>Cited in</th><th>Link</th></tr></thead><tbody>" + rows + "</tbody>";
  })();

  /* ============================= CHARTS ============================= */
  /* Gated behind document.fonts.ready: ECharts renders to canvas and will NOT
     reflow when Muli arrives late, so we wait for the font before first paint. */
  function renderCharts() {
    // 1. Total TVL
    lineChart("c-tvl", D.totalTvl.years, [
      { name: "Year-end TVL", data: D.totalTvl.yearEnd, area: true, color: "#0582CA" },
      { name: "Intra-year peak", data: D.totalTvl.peak, dashed: true, color: "#1F2348", area: false }
    ], { yName: "USD B", tipFmt: fmtUSDb });

    // 2. TVL by chain (stacked area) — flat distinct fills read better than gradients on white
    (function () {
      var s = D.tvlByChain.series, names = Object.keys(s);
      lineChart("c-chain-stack", D.tvlByChain.years, names.map(function (n) {
        return { name: n, data: s[n], stack: "chain", area: true, symbol: false };
      }), { yName: "USD B", tipFmt: fmtUSDb, tipOrder: "valueDesc" });
    })();

    // chain pie
    pieChart("c-chain-pie", D.chainShareNow.data, { fmt: function (v) { return "$" + v + "B"; } });

    // eth dominance
    lineChart("c-eth-dom", D.ethDominance.years, [
      { name: "Ethereum % of DeFi TVL", data: D.ethDominance.pct, area: true, color: "#5F4B8B" }
    ], { yName: "%", yFmt: fmtPct, tipFmt: fmtPct });

    // 3. category proxy
    (function () {
      var s = D.categoryProxy.series, names = Object.keys(s);
      lineChart("c-cat-proxy", D.categoryProxy.years, names.map(function (n) {
        return { name: n, data: s[n] };
      }), { yName: "USD B", tipFmt: fmtUSDb });
    })();
    // category now (horizontal bar)
    (function () {
      var d = D.categoryNow.data;
      barChart("c-cat-now", d.map(function (x) { return x.name; }), [
        { name: "TVL", data: d.map(function (x) { return x.value; }), color: "#0582CA" }
      ], { horizontal: true, yName: "USD B", yFmt: fmtUSDb, tipFmt: fmtUSDb, barMax: 18, round: [0, 4, 4, 0] });
    })();

    // 4. DEX volume
    barChart("c-dex-vol", D.dexVolumeAnnual.years, [
      { name: "DEX spot volume", data: D.dexVolumeAnnual.valueTrillions, color: "#0582CA" }
    ], { yName: "USD T", yFmt: fmtUSDt, tipFmt: fmtUSDt });
    // dex/cex ratio
    lineChart("c-dexcex", D.dexCexRatio.labels, [
      { name: "DEX/CEX spot ratio", data: D.dexCexRatio.pct, area: true, color: "#21BCA5" }
    ], { yName: "%", yFmt: fmtPct, tipFmt: fmtPct });
    // dex share pie
    pieChart("c-dex-share", D.dexShareNow.data, { fmt: function (v) { return v + "%"; } });

    // 5. lending
    (function () {
      var L = D.lending.series;
      lineChart("c-lending", D.lending.years, [
        { name: "Aave (family)", data: L["Aave (family)"], color: "#0582CA", width: 3.2 },
        { name: "MakerDAO / Sky", data: L["MakerDAO / Sky"], color: "#FC8702" },
        { name: "Compound", data: L["Compound"], color: "#5F4B8B" },
        { name: "Morpho", data: L["Morpho"], color: "#21BCA5" },
        { name: "8-family total", data: L["8-family total"], color: "#1F2348", dashed: true }
      ], { yName: "USD B", tipFmt: fmtUSDb });
    })();

    // 6. stablecoins
    lineChart("c-stable-total", D.stablecoinTotal.years, [
      { name: "Total stablecoin supply", data: D.stablecoinTotal.supply, area: true, color: "#21BCA5" }
    ], { yName: "USD B", tipFmt: fmtUSDb });
    pieChart("c-stable-pie", D.stablecoinShareNow.data, { fmt: function (v) { return "$" + v + "B"; } });
    (function () {
      var s = D.stablecoinByIssuer.series;
      lineChart("c-stable-issuers", D.stablecoinByIssuer.years, [
        { name: "USDT (Tether)", data: s["USDT (Tether)"], color: "#009393", width: 3.2 },
        { name: "USDC (Circle)", data: s["USDC (Circle)"], color: "#2775CA", width: 3.2 },
        { name: "DAI + USDS (Sky)", data: s["DAI + USDS (Sky)"], color: "#E9B213" },
        { name: "BUSD (Paxos)", data: s["BUSD (Paxos)"], color: "#5F4B8B" },
        { name: "USDe (Ethena)", data: s["USDe (Ethena)"], color: "#1F2348" }
      ], { yName: "USD B", tipFmt: fmtUSDb });
    })();

    // 7. perps
    barChart("c-perp-vol", D.perpsVolumeAnnual.years, [
      { name: "Perp-DEX volume", data: D.perpsVolumeAnnual.valueTrillions, color: "#5F4B8B" }
    ], { yName: "USD T", yFmt: fmtUSDt, tipFmt: fmtUSDt });
    lineChart("c-hl-share", D.hyperliquidShare.labels, [
      { name: "Hyperliquid share", data: D.hyperliquidShare.pct, area: true, color: "#21BCA5" }
    ], { yName: "%", yFmt: fmtPct, tipFmt: fmtPct });

    // 8. staking
    lineChart("c-lst", D.liquidStaking.years, [
      { name: "Lido", data: D.liquidStaking.lido, area: true, color: "#0582CA" },
      { name: "Rocket Pool", data: D.liquidStaking.rocketPool, color: "#FC8702" },
      { name: "Jito (Solana)", data: D.liquidStaking.jito, color: "#21BCA5" }
    ], { yName: "USD B", tipFmt: fmtUSDb });
    // eth staked dual axis — axis names colored to match their series
    defer("c-ethstaked", function () {
      var c = mk("c-ethstaked"); if (!c) return;
      c.setOption(responsive("dual", {
        grid: baseGrid(),
        tooltip: tip({ trigger: "axis" }),
        legend: legend(),
        xAxis: catAxis(D.ethStaked.years),
        yAxis: [
          Object.assign(valAxis("M ETH", function (v) { return v + "M"; }), { nameTextStyle: { color: "#0582CA", fontSize: 12 } }),
          Object.assign(valAxis("% staked", fmtPct), { position: "right", splitLine: { show: false }, nameTextStyle: { color: "#21BCA5", fontSize: 12 } })
        ],
        series: [
          { name: "ETH staked (M)", type: "bar", data: D.ethStaked.millionEth, barMaxWidth: 40,
            itemStyle: { color: "#0582CA", borderRadius: [4, 4, 0, 0] } },
          { name: "Staking ratio (%)", type: "line", yAxisIndex: 1, data: D.ethStaked.ratioPct, smooth: true,
            showSymbol: true, symbolSize: 6, lineStyle: { color: "#21BCA5", width: 2.8 }, itemStyle: { color: "#21BCA5" } }
        ]
      }, { mobileSeries: [{ barMaxWidth: 22 }, {}] }));
    });
    // restaking
    lineChart("c-restake", D.restaking.years, [
      { name: "EigenLayer", data: D.restaking.eigenlayer, area: true, color: "#0582CA" },
      { name: "ether.fi (LRT)", data: D.restaking.etherfi, area: true, color: "#FC8702" }
    ], { yName: "USD B", tipFmt: fmtUSDb });

    // 9. RWA
    lineChart("c-rwa", D.rwa.labels, [
      { name: "Total RWA (ex-stables)", data: D.rwa.totalExStable, area: true, color: "#21BCA5" },
      { name: "Tokenized US Treasuries", data: D.rwa.tokenizedTreasuries, color: "#0582CA" }
    ], { yName: "USD B", tipFmt: fmtUSDb });
    (function () {
      var d = D.rwaLeadersNow.data.slice().sort(function (a, b) { return a.value - b.value; });
      barChart("c-rwa-leaders", d.map(function (x) { return x.name; }), [
        { name: "On-chain value", data: d.map(function (x) { return x.value; }), color: "#0582CA" }
      ], { horizontal: true, yName: "USD B", yFmt: fmtUSDb, tipFmt: fmtUSDb, barMax: 16, round: [0, 4, 4, 0] });
    })();

    // 10. yield
    lineChart("c-yield", D.yield.years, [
      { name: "Pendle", data: D.yield.pendle, area: true, color: "#21BCA5" },
      { name: "Convex", data: D.yield.convex, color: "#FC8702" },
      { name: "Yearn", data: D.yield.yearn, color: "#5F4B8B" }
    ], { yName: "USD B", tipFmt: fmtUSDb });
    // bridges
    (function () {
      var d = D.bridgesNow.data.slice().sort(function (a, b) { return a.value - b.value; });
      barChart("c-bridges", d.map(function (x) { return x.name; }), [
        { name: "Bridge TVL", data: d.map(function (x) { return x.value; }), color: "#0582CA" }
      ], { horizontal: true, yName: "USD B", yFmt: fmtUSDb, tipFmt: fmtUSDb, barMax: 16, round: [0, 4, 4, 0] });
    })();

    // 11. fees & revenue
    barChart("c-fees", D.feesRevenue.years, [
      { name: "Fees (paid by users)", data: D.feesRevenue.fees, color: "#0582CA" },
      { name: "Protocol revenue", data: D.feesRevenue.revenue, color: "#21BCA5" }
    ], { yName: "USD B", yFmt: fmtUSDb, tipFmt: fmtUSDb });
    // developers dual line — axis names colored to match their series
    defer("c-devs", function () {
      var c = mk("c-devs"); if (!c) return;
      c.setOption(responsive("dual", {
        grid: baseGrid(), tooltip: tip({ trigger: "axis" }), legend: legend(),
        xAxis: catAxis(D.developers.years),
        yAxis: [
          Object.assign(valAxis("all devs", fmtNum), { nameTextStyle: { color: "#0582CA", fontSize: 12 } }),
          Object.assign(valAxis("DeFi devs", fmtNum), { position: "right", splitLine: { show: false }, nameTextStyle: { color: "#FC8702", fontSize: 12 } })
        ],
        series: [
          { name: "All crypto devs", type: "line", data: D.developers.monthlyActive, smooth: true, areaStyle: { color: hexA("#0582CA", 0.16) }, lineStyle: { color: "#0582CA", width: 2.8 }, itemStyle: { color: "#0582CA" } },
          { name: "DeFi devs", type: "line", yAxisIndex: 1, data: D.developers.defiDevs, smooth: true, lineStyle: { color: "#FC8702", width: 2.8 }, itemStyle: { color: "#FC8702" } }
        ]
      }, {}));
    });
    // users
    lineChart("c-users", D.users.years, [
      { name: "Cumulative DeFi addresses (M) — overestimate", data: D.users.cumulativeAddressesM, area: true, color: "#0582CA" }
    ], { yName: "M addresses", yFmt: fmtNum, tipFmt: function (v) { return v + "M"; } });

    // 12. hacks
    barChart("c-hacks", D.hacksAnnual.years, [
      { name: "All crypto theft", data: D.hacksAnnual.totalStolen, color: "#D94432" },
      { name: "DeFi-protocol only", data: D.hacksAnnual.defiOnly, color: "#FC8702" }
    ], { yName: "USD B", yFmt: fmtUSDb, tipFmt: fmtUSDb });
    (function () {
      var d = D.biggestHacks.data.slice().sort(function (a, b) { return a.value - b.value; });
      barChart("c-bighacks", d.map(function (x) { return x.name; }), [
        { name: "Stolen", data: d.map(function (x) { return x.value; }), color: "#D94432" }
      ], { horizontal: true, yName: "USD M", yFmt: function (v) { return "$" + v + "M"; }, tipFmt: function (v) { return "$" + v + "M"; }, barMax: 16, round: [0, 4, 4, 0] });
    })();

    // conferences theme tally
    (function () {
      var d = D.conferenceThemeTally.data.slice().sort(function (a, b) { return a.value - b.value; });
      barChart("c-conf-themes", d.map(function (x) { return x.name; }), [
        { name: "# of conferences", data: d.map(function (x) { return x.value; }), color: "#0582CA" }
      ], { horizontal: true, yName: "conferences", yFmt: fmtNum, tipFmt: function (v) { return v + " events"; }, barMax: 16, round: [0, 4, 4, 0] });
    })();
  }

  /* ---- attach a source citation under each chart (ECharts owns the chart div, so insert a sibling) ---- */
  var CHART_SRC = {
    "c-tvl": "totalTvl", "c-chain-stack": "tvlByChain", "c-chain-pie": "chainShareNow",
    "c-eth-dom": "ethDominance", "c-cat-proxy": "categoryProxy", "c-cat-now": "categoryNow",
    "c-dex-vol": "dexVolumeAnnual", "c-dexcex": "dexCexRatio", "c-dex-share": "dexShareNow",
    "c-lending": "lending", "c-stable-total": "stablecoinTotal", "c-stable-pie": "stablecoinShareNow",
    "c-stable-issuers": "stablecoinByIssuer", "c-perp-vol": "perpsVolumeAnnual", "c-hl-share": "hyperliquidShare",
    "c-lst": "liquidStaking", "c-ethstaked": "ethStaked", "c-restake": "restaking",
    "c-rwa": "rwa", "c-rwa-leaders": "rwaLeadersNow", "c-yield": "yield", "c-bridges": "bridgesNow",
    "c-fees": "feesRevenue", "c-devs": "developers", "c-users": "users",
    "c-hacks": "hacksAnnual", "c-bighacks": "biggestHacks"
  };
  function injectChartSources() {
    Object.keys(CHART_SRC).forEach(function (id) {
      var node = el(id); if (!node) return;
      var ds = D[CHART_SRC[id]]; if (!ds) return;
      var line = srcLine(srcByRaw(ds.raw), ds.asOf || (D.meta && D.meta.asOf));
      if (!line) return;
      if (node.nextSibling && node.nextSibling.className === "src chart-src") return; // idempotent
      var div = document.createElement("div");
      div.className = "src chart-src";
      div.innerHTML = line;
      node.parentNode.insertBefore(div, node.nextSibling);
    });
  }

  /* ---- lazy render: build a chart's canvas only when it scrolls near the viewport.
     renderCharts() now just registers thunks; observeCharts() drains them on intersection.
     Falls back to rendering everything where IntersectionObserver / ECharts is unavailable. ---- */
  function renderOne(id) {
    var fn = renderThunks[id];
    if (!fn) return;
    delete renderThunks[id];                 // one-shot: never init the same chart twice
    try { fn(); } catch (e) { /* keep the other charts alive */ }
  }
  function observeCharts() {
    var ids = Object.keys(renderThunks);
    if (!hasECharts || !("IntersectionObserver" in window)) { ids.forEach(renderOne); return; }
    var io = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { io.unobserve(en.target); renderOne(en.target.id); }
      });
    }, { rootMargin: "300px 0px", threshold: 0 });
    ids.forEach(function (id) { var node = el(id); if (node) io.observe(node); });
  }

  // Render once Muli is ready (canvas text won't reflow on a late font swap); 1.5s safety net.
  var started = false;
  function start() {
    if (started) return; started = true;
    renderCharts();          // registers all chart thunks (cheap; no canvas work yet)
    injectChartSources();    // eager: citation lines sit below every chart node regardless of render state
    observeCharts();         // above-the-fold charts intersect immediately and paint; rest paint on scroll
  }
  if (window.document && document.fonts && document.fonts.ready && typeof document.fonts.ready.then === "function") {
    document.fonts.ready.then(start);
    setTimeout(start, 1500);
  } else {
    start();
  }

  /* ---------------- TABLE SCROLL HINT ---------------- */
  // JS-built tables overflow horizontally on phones; flag which actually scroll (and whether they're
  // at the end) so the CSS right-edge fade only appears when there's more to reveal.
  (function () {
    var wraps = [].slice.call(document.querySelectorAll(".tablewrap"));
    if (!wraps.length) return;
    function upd(w) {
      var scrollable = w.scrollWidth > w.clientWidth + 1;
      w.classList.toggle("scrollable", scrollable);
      w.classList.toggle("at-end", scrollable && w.scrollLeft + w.clientWidth >= w.scrollWidth - 1);
    }
    function updAll() { wraps.forEach(upd); }
    wraps.forEach(function (w) { w.addEventListener("scroll", function () { upd(w); }, { passive: true }); });
    window.addEventListener("resize", updAll);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(updAll);
    updAll();
  })();

  /* ---------------- RESIZE / ORIENTATION ---------------- */
  // c.resize() re-fits the canvas AND re-evaluates the `media` overrides; funnel rotation +
  // visual-viewport changes through one debounce. Only already-rendered instances need resizing.
  var rt;
  function resizeAll() {
    clearTimeout(rt);
    rt = setTimeout(function () { instances.forEach(function (c) { try { c.resize(); } catch (e) {} }); }, 120);
  }
  window.addEventListener("resize", resizeAll);
  window.addEventListener("orientationchange", resizeAll);
  if (window.visualViewport && window.visualViewport.addEventListener) {
    window.visualViewport.addEventListener("resize", resizeAll);
  }
})();
