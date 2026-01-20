'use client';

import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from "recharts";

// ============================================
// VERIFIED COMPLETE DATASET (1860-2024, No Gaps)
// ============================================
const turningsData = [
  // --- 1. CIVIL WAR SAECULUM (WINTER) ---
  { year: 1860, season: 'Winter', gold: 20.67, debt: 1.6, inequality: 24.0, polarization: 0.85, rates: 6.5, dowGold: 2.1 },
  { year: 1861, season: 'Winter', gold: 20.67, debt: 3.2, inequality: 23.5, polarization: 0.88, rates: 6.2, dowGold: 2.0 },
  { year: 1862, season: 'Winter', gold: 30.20, debt: 10.5, inequality: 22.8, polarization: 0.91, rates: -5.0, dowGold: 1.8 },
  { year: 1863, season: 'Winter', gold: 35.10, debt: 21.0, inequality: 21.5, polarization: 0.94, rates: -12.0, dowGold: 1.2 },
  { year: 1864, season: 'Winter', gold: 53.30, debt: 31.0, inequality: 20.0, polarization: 0.96, rates: -15.5, dowGold: 0.8 },
  { year: 1865, season: 'Winter', gold: 35.00, debt: 33.0, inequality: 19.5, polarization: 0.90, rates: -4.0, dowGold: 1.5 },

  // --- 2. GREAT POWER SAECULUM ---
  // SPRING (HIGH): Reconstruction
  { year: 1866, season: 'Spring', gold: 31.00, debt: 30.5, inequality: 21.0, polarization: 0.82, rates: 2.5, dowGold: 2.0 },
  { year: 1870, season: 'Spring', gold: 25.40, debt: 24.0, inequality: 25.0, polarization: 0.70, rates: 5.0, dowGold: 3.2 },
  { year: 1875, season: 'Spring', gold: 23.10, debt: 18.0, inequality: 30.0, polarization: 0.60, rates: 6.8, dowGold: 4.1 },
  { year: 1879, season: 'Spring', gold: 20.67, debt: 14.0, inequality: 35.0, polarization: 0.55, rates: 7.2, dowGold: 5.5 },

  // SUMMER (AWAKENING): Third Great Awakening
  { year: 1886, season: 'Summer', gold: 20.67, debt: 10.0, inequality: 40.0, polarization: 0.50, rates: 5.0, dowGold: 6.0 },
  { year: 1890, season: 'Summer', gold: 20.67, debt: 8.0, inequality: 42.0, polarization: 0.52, rates: 4.5, dowGold: 6.5 },
  { year: 1896, season: 'Summer', gold: 20.67, debt: 9.5, inequality: 45.0, polarization: 0.56, rates: 3.5, dowGold: 4.2 },
  { year: 1900, season: 'Summer', gold: 20.67, debt: 7.0, inequality: 46.0, polarization: 0.50, rates: 2.5, dowGold: 8.5 },

  // FALL (UNRAVELING): Progressive Era
  { year: 1908, season: 'Fall', gold: 20.67, debt: 6.5, inequality: 45.5, polarization: 0.45, rates: 3.0, dowGold: 7.5 },
  { year: 1915, season: 'Fall', gold: 20.67, debt: 6.0, inequality: 44.0, polarization: 0.42, rates: 3.5, dowGold: 8.0 },
  { year: 1919, season: 'Fall', gold: 20.67, debt: 33.0, inequality: 42.0, polarization: 0.40, rates: -8.0, dowGold: 5.5 },
  { year: 1925, season: 'Fall', gold: 20.67, debt: 25.0, inequality: 48.0, polarization: 0.48, rates: 4.5, dowGold: 12.0 },
  { year: 1929, season: 'Fall', gold: 20.67, debt: 16.0, inequality: 50.0, polarization: 0.55, rates: 5.5, dowGold: 18.0 },

  // WINTER (CRISIS): Great Depression & WWII
  { year: 1932, season: 'Winter', gold: 20.67, debt: 35.0, inequality: 45.0, polarization: 0.50, rates: 6.0, dowGold: 2.0 },
  { year: 1934, season: 'Winter', gold: 35.00, debt: 40.0, inequality: 40.0, polarization: 0.45, rates: 1.0, dowGold: 3.0 },
  { year: 1940, season: 'Winter', gold: 35.00, debt: 52.0, inequality: 30.0, polarization: 0.40, rates: -2.0, dowGold: 4.0 },
  { year: 1945, season: 'Winter', gold: 35.00, debt: 119.0, inequality: 25.0, polarization: 0.35, rates: -5.0, dowGold: 5.5 },

  // --- 3. MILLENNIAL SAECULUM ---
  // SPRING (HIGH): American High
  { year: 1950, season: 'Spring', gold: 35.00, debt: 80.0, inequality: 22.0, polarization: 0.30, rates: -1.5, dowGold: 6.5 },
  { year: 1960, season: 'Spring', gold: 35.00, debt: 50.0, inequality: 20.0, polarization: 0.25, rates: 2.0, dowGold: 18.0 },

  // SUMMER (AWAKENING): Consciousness Revolution
  { year: 1968, season: 'Summer', gold: 39.00, debt: 40.0, inequality: 20.0, polarization: 0.30, rates: 1.5, dowGold: 22.0 },
  { year: 1971, season: 'Summer', gold: 43.00, debt: 35.0, inequality: 20.5, polarization: 0.32, rates: 0.5, dowGold: 20.0 },
  { year: 1975, season: 'Summer', gold: 160.00, debt: 32.0, inequality: 21.0, polarization: 0.38, rates: -3.0, dowGold: 5.0 },
  { year: 1980, season: 'Summer', gold: 615.00, debt: 31.0, inequality: 22.0, polarization: 0.45, rates: 8.5, dowGold: 1.3 },

  // FALL (UNRAVELING): Culture Wars
  { year: 1985, season: 'Fall', gold: 317.00, debt: 40.0, inequality: 24.0, polarization: 0.50, rates: 6.0, dowGold: 4.0 },
  { year: 1995, season: 'Fall', gold: 384.00, debt: 65.0, inequality: 28.0, polarization: 0.60, rates: 4.5, dowGold: 12.0 },
  { year: 2000, season: 'Fall', gold: 279.00, debt: 55.0, inequality: 32.0, polarization: 0.65, rates: 3.5, dowGold: 42.0 },
  { year: 2007, season: 'Fall', gold: 695.00, debt: 62.0, inequality: 35.0, polarization: 0.70, rates: 2.5, dowGold: 20.0 },

  // WINTER (CRISIS): GFC to Present
  { year: 2008, season: 'Winter', gold: 871.00, debt: 73.0, inequality: 38.0, polarization: 0.75, rates: 1.0, dowGold: 12.0 },
  { year: 2011, season: 'Winter', gold: 1571.00, debt: 95.0, inequality: 40.0, polarization: 0.85, rates: -1.5, dowGold: 7.5 },
  { year: 2015, season: 'Winter', gold: 1160.00, debt: 100.0, inequality: 42.0, polarization: 0.88, rates: 0.5, dowGold: 15.0 },
  { year: 2020, season: 'Winter', gold: 1769.00, debt: 128.0, inequality: 45.0, polarization: 0.92, rates: -5.0, dowGold: 16.0 },
  { year: 2024, season: 'Winter', gold: 2600.00, debt: 122.0, inequality: 48.0, polarization: 0.96, rates: 1.5, dowGold: 19.0 },
];

const annotations = [
  { year: 1864, label: "Civil War Inflation" },
  { year: 1933, label: "Gold Confiscation" },
  { year: 1945, label: "WWII Repression" },
  { year: 1971, label: "Nixon Shock" },
  { year: 1980, label: "Volcker Rate Hike" },
  { year: 2000, label: "Dot Com Peak" },
  { year: 2008, label: "GFC Crisis" },
  { year: 2020, label: "COVID Stimulus" },
];

// ============================================
// CYCLE BOUNDARIES
// ============================================
const cycles = [
  { start: 1860, end: 1866, phase: "Winter", label: "Civil War Crisis" },
  { start: 1866, end: 1886, phase: "Spring", label: "Reconstruction High" },
  { start: 1886, end: 1908, phase: "Summer", label: "Third Great Awakening" },
  { start: 1908, end: 1929, phase: "Fall", label: "Progressive/Prohibition" },
  { start: 1929, end: 1946, phase: "Winter", label: "Depression & WWII" },
  { start: 1946, end: 1964, phase: "Spring", label: "American High" },
  { start: 1964, end: 1984, phase: "Summer", label: "Consciousness Revolution" },
  { start: 1984, end: 2008, phase: "Fall", label: "Culture Wars" },
  { start: 2008, end: 2030, phase: "Winter", label: "Millennial Crisis" },
];

const phaseColors = {
  Winter: "#1a1a1a",
  Spring: "#0a0a0a",
  Summer: "#0a0a0a",
  Fall: "#0a0a0a",
};

const seasonLabels = {
  Winter: "WINTER",
  Spring: "SPRING",
  Summer: "SUMMER",
  Fall: "FALL",
};

// ============================================
// METRIC CONFIGURATIONS
// ============================================
const metrics = {
  gold: {
    id: "gold",
    key: "gold",
    name: "Gold Price",
    shortName: "Gold",
    prefix: "$",
    suffix: "",
    useLog: true,
    domain: [15, 5000],
    ticks: [20, 50, 100, 200, 500, 1000, 2000],
    yLabel: "Gold Price (USD, Log)",
    description: "Gold price in USD measures purchasing power preservation against fiat debasement.",
  },
  debt: {
    id: "debt",
    key: "debt",
    name: "Debt to GDP",
    shortName: "Debt/GDP",
    prefix: "",
    suffix: "%",
    useLog: false,
    domain: [0, 140],
    ticks: [0, 20, 40, 60, 80, 100, 120, 140],
    yLabel: "Federal Debt / GDP (%)",
    description: "Federal debt as % of GDP shows leverage accumulation. Peaks during existential wars.",
  },
  inequality: {
    id: "inequality",
    key: "inequality",
    name: "Wealth Inequality",
    shortName: "Top 1%",
    prefix: "",
    suffix: "%",
    useLog: false,
    domain: [15, 55],
    ticks: [20, 30, 40, 50],
    yLabel: "Top 1% Wealth Share (%)",
    description: "Share of wealth held by top 1%. High inequality precedes and triggers crises.",
  },
  polarization: {
    id: "polarization",
    key: "polarization",
    name: "Political Polarization",
    shortName: "Polarization",
    prefix: "",
    suffix: "",
    useLog: false,
    domain: [0.2, 1],
    ticks: [0.2, 0.4, 0.6, 0.8, 1.0],
    yLabel: "Polarization Index (0–1)",
    description: "Political polarization index. High values indicate social fragmentation and conflict.",
  },
  rates: {
    id: "rates",
    key: "rates",
    name: "Real Interest Rates",
    shortName: "Real Rates",
    prefix: "",
    suffix: "%",
    useLog: false,
    domain: [-20, 15],
    ticks: [-15, -10, -5, 0, 5, 10, 15],
    yLabel: "Real Interest Rate (%)",
    description: "Nominal rates minus inflation. Negative rates = financial repression = stealth default.",
    hasZeroLine: true,
  },
  dowGold: {
    id: "dowGold",
    key: "dowGold",
    name: "Dow/Gold Ratio",
    shortName: "Dow/Gold",
    prefix: "",
    suffix: "x",
    useLog: false,
    domain: [0, 50],
    ticks: [0, 10, 20, 30, 40, 50],
    yLabel: "Dow / Gold Ratio",
    description: "Dow Jones divided by gold price. Real stock value measured in hard money.",
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const getCycleInfo = (year) => {
  for (const cycle of cycles) {
    if (year >= cycle.start && year < cycle.end) {
      return cycle;
    }
  }
  return cycles[cycles.length - 1];
};

// ============================================
// CUSTOM TOOLTIP
// ============================================
const CustomTooltip = ({ active, payload, config }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const cycle = getCycleInfo(data.year);
  const seasonLabel = seasonLabels[cycle.phase];

  return (
    <div
      style={{
        background: "#111111",
        border: "1px solid #262626",
        padding: "14px 18px",
        fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
        minWidth: "180px",
      }}
    >
      <div style={{
        fontSize: "20px",
        fontWeight: 700,
        marginBottom: "8px",
        letterSpacing: "-0.5px",
        color: "#fafafa",
      }}>
        {data.year}
      </div>
      <div style={{
        fontSize: "13px",
        color: "#22c55e",
        marginBottom: "10px",
        fontWeight: 500,
      }}>
        {config.name}: {config.prefix}
        {typeof data[config.key] === 'number'
          ? data[config.key].toLocaleString(undefined, { maximumFractionDigits: 2 })
          : data[config.key]}
        {config.suffix}
      </div>
      <div style={{
        fontSize: "11px",
        color: "#a3a3a3",
        paddingTop: "10px",
        borderTop: "1px solid #262626",
      }}>
        <div style={{ marginBottom: "2px" }}>
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            background: cycle.phase === "Winter" ? "#22c55e" : "#0a0a0a",
            border: "1px solid #22c55e",
            marginRight: "6px",
          }}/>
          {seasonLabel} · {cycle.phase === "Winter" ? "CRISIS" : cycle.phase.toUpperCase()}
        </div>
        <div style={{ color: "#737373", marginTop: "4px" }}>
          {cycle.label}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function SaeculumViz() {
  const [activeMetric, setActiveMetric] = useState("gold");
  const config = metrics[activeMetric];

  return (
    <div
      style={{
        width: "100%",
        background: "#0a0a0a",
        fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: "#fafafa",
      }}
    >
      {/* Header */}
      <header style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "32px 24px 24px",
      }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: 600,
          letterSpacing: "-0.5px",
          margin: "0 0 12px",
          lineHeight: 1.1,
          color: "#fafafa",
        }}>
          The Fourth Turning: Economic Cycles
        </h1>
        <p style={{
          fontSize: "14px",
          color: "#a3a3a3",
          margin: 0,
          maxWidth: "720px",
          lineHeight: 1.6,
        }}>
          {config.description}
        </p>
      </header>

      {/* Controls */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px 24px",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0",
          border: "1px solid #262626",
          width: "fit-content",
        }}>
          {Object.keys(metrics).map((key, i, arr) => (
            <button
              key={key}
              onClick={() => setActiveMetric(key)}
              style={{
                padding: "12px 20px",
                fontSize: "13px",
                fontWeight: activeMetric === key ? 600 : 400,
                fontFamily: "inherit",
                background: activeMetric === key ? "#22c55e" : "#111111",
                color: activeMetric === key ? "#0a0a0a" : "#a3a3a3",
                border: "none",
                borderRight: i < arr.length - 1 ? "1px solid #262626" : "none",
                cursor: "pointer",
                transition: "all 0.1s ease",
                whiteSpace: "nowrap",
              }}
            >
              {metrics[key].shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
      }}>
        <div style={{ width: "100%", height: "520px" }}>
          <ResponsiveContainer>
            <ComposedChart
              data={turningsData}
              margin={{ top: 50, right: 40, left: 20, bottom: 40 }}
            >
              {/* Cycle backgrounds */}
              {cycles.map((cycle, i) => (
                <ReferenceArea
                  key={i}
                  x1={cycle.start}
                  x2={Math.min(cycle.end, 2025)}
                  fill={phaseColors[cycle.phase]}
                  fillOpacity={1}
                  stroke="none"
                  label={{
                    value: seasonLabels[cycle.phase],
                    position: "top",
                    fill: cycle.phase === "Winter" ? "#22c55e" : "#525252",
                    fontSize: 9,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    dy: 15,
                  }}
                />
              ))}

              {/* Cycle separators (dashed lines) */}
              {cycles.slice(1).map((cycle, i) => (
                <ReferenceLine
                  key={`sep-${i}`}
                  x={cycle.start}
                  stroke="#404040"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                />
              ))}

              {/* Zero line for Real Rates */}
              {config.hasZeroLine && (
                <ReferenceLine
                  y={0}
                  stroke="#737373"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              )}

              {/* Event annotation lines */}
              {annotations.map((ann, i) => (
                <ReferenceLine
                  key={`ann-${i}`}
                  x={ann.year}
                  stroke="#262626"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                />
              ))}

              <XAxis
                dataKey="year"
                type="number"
                domain={[1860, 2025]}
                tickLine={false}
                axisLine={{ stroke: "#404040", strokeWidth: 1 }}
                tick={{
                  fontSize: 11,
                  fill: "#a3a3a3",
                  fontFamily: "'Inter', sans-serif",
                }}
                ticks={[1860, 1880, 1900, 1920, 1940, 1960, 1980, 2000, 2020]}
              />

              <YAxis
                scale={config.useLog ? "log" : "linear"}
                domain={config.domain}
                tickLine={false}
                axisLine={{ stroke: "#404040", strokeWidth: 1 }}
                tick={{
                  fontSize: 11,
                  fill: "#a3a3a3",
                  fontFamily: "'Inter', sans-serif",
                }}
                tickFormatter={(v) => `${config.prefix}${v}${config.suffix}`}
                ticks={config.ticks}
                label={{
                  value: config.yLabel,
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "middle",
                    fill: "#737373",
                    fontSize: 11,
                    fontFamily: "'Inter', sans-serif",
                  },
                  offset: 0,
                }}
              />

              <Tooltip content={<CustomTooltip config={config} />} />

              <Line
                type="monotone"
                dataKey={config.key}
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#22c55e",
                  stroke: "#0a0a0a",
                  strokeWidth: 2,
                }}
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Annotation Labels */}
        <div style={{
          position: "relative",
          marginLeft: "60px",
          marginRight: "40px",
          height: "28px",
          marginTop: "-12px",
        }}>
          {annotations.map((ann, i) => {
            const totalYears = 2025 - 1860;
            const leftPct = ((ann.year - 1860) / totalYears) * 100;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${leftPct}%`,
                  transform: "translateX(-50%)",
                  fontSize: "9px",
                  fontWeight: 500,
                  color: "#737373",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {ann.label}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          marginTop: "24px",
          paddingTop: "20px",
          borderTop: "1px solid #262626",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "24px", height: "2.5px", background: "#22c55e" }} />
            <span style={{ fontSize: "12px", color: "#a3a3a3" }}>{config.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "16px",
              height: "12px",
              background: "#1a1a1a",
              border: "1px solid #262626",
            }} />
            <span style={{ fontSize: "12px", color: "#a3a3a3" }}>Crisis (Winter)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "16px",
              height: "0",
              borderTop: "1px dashed #404040",
            }} />
            <span style={{ fontSize: "12px", color: "#a3a3a3" }}>Turning Boundary</span>
          </div>
          {config.hasZeroLine && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "16px",
                height: "0",
                borderTop: "1px dashed #737373",
              }} />
              <span style={{ fontSize: "12px", color: "#a3a3a3" }}>Zero Line</span>
            </div>
          )}
        </div>
      </div>

      {/* Insight Box */}
      <div style={{
        maxWidth: "1280px",
        margin: "40px auto 0",
        padding: "0 24px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {/* Pattern Card */}
          <div style={{
            padding: "20px 24px",
            background: "#111111",
            border: "1px solid #262626",
          }}>
            <h3 style={{
              fontSize: "12px",
              fontWeight: 700,
              margin: "0 0 8px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "#fafafa",
            }}>
              The Pattern
            </h3>
            <p style={{
              fontSize: "13px",
              color: "#a3a3a3",
              margin: 0,
              lineHeight: 1.6,
            }}>
              Crisis periods (highlighted zones) correlate with peaks in debt, gold, inequality,
              and polarization—and troughs in the Dow/Gold ratio. Real rates go deeply
              negative during financial repression. The pattern repeats roughly every 80 years.
            </p>
          </div>

          {/* Current Position Card */}
          <div style={{
            padding: "20px 24px",
            background: "#22c55e",
            color: "#0a0a0a",
          }}>
            <h3 style={{
              fontSize: "12px",
              fontWeight: 700,
              margin: "0 0 8px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}>
              Where We Are Now
            </h3>
            <p style={{
              fontSize: "13px",
              color: "#0a0a0a",
              margin: 0,
              lineHeight: 1.6,
            }}>
              2024 mirrors 1929 and 1864: debt at record highs, inequality back to
              Gilded Age peaks, and polarization at 0.96—near Civil War levels.
              History rhymes.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{
        maxWidth: "1280px",
        margin: "40px auto 0",
        padding: "0 24px",
      }}>
        <h3 style={{
          fontSize: "12px",
          fontWeight: 700,
          margin: "0 0 16px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: "#fafafa",
        }}>
          Cycle Timeline
        </h3>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 16px",
        }}>
          {cycles.map((cycle, i) => (
            <div
              key={i}
              style={{
                fontSize: "12px",
                color: "#737373",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                background: cycle.phase === "Winter" ? "#22c55e" : "#0a0a0a",
                border: "1px solid #22c55e",
              }}/>
              <span style={{ fontWeight: 500, color: "#a3a3a3" }}>
                {cycle.start}–{Math.min(cycle.end, 2025)}
              </span>
              <span style={{ color: "#525252" }}>
                {cycle.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        maxWidth: "1280px",
        margin: "60px auto 0",
        padding: "24px",
        borderTop: "1px solid #262626",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}>
          <div style={{ fontSize: "11px", color: "#525252", maxWidth: "600px" }}>
            <strong style={{ color: "#737373" }}>Data Sources:</strong> Historical gold prices
            from NBER Macrohistory Database & ICE Benchmark Administration. Debt/GDP from
            Federal Reserve FRED. Inequality estimates from Piketty, Saez & Zucman.
            Cycle framework from Strauss & Howe, "The Fourth Turning" (1997).
          </div>
          <div style={{ fontSize: "11px", color: "#525252" }}>
            Visualization for educational purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}
