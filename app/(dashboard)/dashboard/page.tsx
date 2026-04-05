// // app/dashboard/page.tsx
// "use client";

// import Link from "next/link";
// import Ico from "@/components/ui/ico";
// import RiskBadge from "@/components/ui/riskbadge";
// import { ConfBar, Donut, Spark, BarChart } from "@/components/ui/Charts";
// import { I } from "@/lib/icons";
// import { cases, weekData, weekLabels, trendData, distData } from "@/lib/data";

// const stats = [
//   { label: "Total Cases",      value: "338",   delta: "+18 this week", color: "#1D4ED8", ico: "cases"    },
//   { label: "Lesions Detected", value: "142",   delta: "+5 today",      color: "#DC2626", ico: "activity" },
//   { label: "Normal Cases",     value: "129",   delta: "Stable",        color: "#059669", ico: "eye"      },
//   { label: "Avg Confidence",   value: "93.4%", delta: "+1.2% vs last", color: "#D97706", ico: "trending" },
// ];

// export default function DashPage() {
//   return (
//     <div style={{ flex: 1, overflowY: "auto", padding: "26px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

//       {/* Alert banner */}
//       <div className="fade-up" style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 12 }}>
//         <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#D97706", animation: "pulse 2s infinite" }} />
//         <span style={{ fontSize: 13, color: "#92400E", fontWeight: 600 }}>3 cases awaiting review · Last AI sync 2 min ago</span>
//         <Link href="/cases">
//           <button className="btn" style={{ marginLeft: "auto", padding: "4px 12px", fontSize: 12, background: "#FEF3C7", color: "#D97706", border: "1px solid #FDE68A" }}>Review Now</button>
//         </Link>
//       </div>

//       {/* Stat cards */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
//         {stats.map((s, i) => (
//           <div key={i} className={`card fade-up d${i + 1}`} style={{ padding: "20px 22px", position: "relative", overflow: "hidden" }}>
//             <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: "16px 16px 0 0" }} />
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
//               <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: .4 }}>{s.label.toUpperCase()}</span>
//               <div style={{ width: 34, height: 34, borderRadius: 10, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <Ico d={I[s.ico]} s={15} c={s.color} />
//               </div>
//             </div>
//             <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800, color: "var(--ink)", lineHeight: 1 }}>{s.value}</div>
//             <div style={{ marginTop: 8, fontSize: 12, color: s.color, fontWeight: 600 }}>↑ {s.delta}</div>
//           </div>
//         ))}
//       </div>

//       {/* Charts row */}
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: 16 }}>
//         <div className="card fade-up d2" style={{ padding: "22px 24px" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//             <div>
//               <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Cases Over Time</div>
//               <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Last 10 days</div>
//             </div>
//             <span className="badge badge-blue">+12%</span>
//           </div>
//           <Spark data={trendData} color="#1D4ED8" h={80} />
//           <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
//             {["10d ago", "", "", "", "Today"].map((l, i) => <span key={i} style={{ fontSize: 10, color: "#94A3B8" }}>{l}</span>)}
//           </div>
//         </div>

//         <div className="card fade-up d3" style={{ padding: "22px 24px" }}>
//           <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>This Week</div>
//           <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>Daily case volume</div>
//           <BarChart data={weekData} labels={weekLabels} />
//         </div>

//         <div className="card fade-up d4" style={{ padding: "22px 20px" }}>
//           <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Detection Split</div>
//           <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>All-time distribution</div>
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
//             <Donut data={distData} total={338} />
//             <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
//               {distData.map((d, i) => (
//                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
//                   <span style={{ fontSize: 12, color: "var(--ink2)", flex: 1 }}>{d.label}</span>
//                   <span style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.pct}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="card fade-up d4" style={{ padding: "22px 26px" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
//           <div>
//             <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Recent Cases</div>
//             <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Today&apos;s analyzed endoscopy sessions</div>
//           </div>
//           <Link href="/cases"><button className="btn btn-primary" style={{ padding: "7px 16px", fontSize: 12 }}>View All Cases</button></Link>
//         </div>
//         <table className="tbl">
//           <thead><tr><th>Case ID</th><th>Thumbnail</th><th>Finding</th><th>Region</th><th>Confidence</th><th>Risk</th><th>Date</th></tr></thead>
//           <tbody>{cases.map((c, i) => (
//             <tr key={i}>
//               <td style={{ fontWeight: 700, color: "var(--ink2)", fontSize: 12 }}>{c.id}</td>
//               <td><div style={{ width: 36, height: 28, borderRadius: 6, background: `${c.color}22`, border: `1.5px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <Ico d={I.eye} s={12} c={c.color} />
//               </div></td>
//               <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} /><span style={{ fontWeight: 600 }}>{c.type}</span></div></td>
//               <td style={{ color: "var(--muted)", fontSize: 12 }}>{c.region}</td>
//               <td style={{ minWidth: 130 }}><ConfBar v={c.conf} /></td>
//               <td><RiskBadge r={c.risk} /></td>
//               <td style={{ color: "var(--muted)", fontSize: 11 }}>{c.date}</td>
//             </tr>
//           ))}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* ── MOCK DATA ── */
const stats = [
  { label: "Total Cases",      value: "214",   delta: "+12 this week", color: "#0D6EFD", icon: <CasesIcon /> },
  { label: "Polyp Detected",   value: "89",    delta: "+3 today",      color: "#FF5C5C", icon: <ActivityIcon /> },
  { label: "Esophagitis",      value: "125",   delta: "+9 this week",  color: "#F59E0B", icon: <FlameIcon /> },
  { label: "Avg Confidence",   value: "91.7%", delta: "+0.8% vs last", color: "#0D6EFD", icon: <TrendIcon /> },
];

const cases = [
  { id: "GV-1042", type: "Polyp",       region: "Sigmoid Colon",      conf: 94, risk: "high",   date: "Today 09:12",  color: "#FF5C5C" },
  { id: "GV-1041", type: "Esophagitis", region: "Distal Esophagus",   conf: 88, risk: "medium", date: "Today 08:45",  color: "#F59E0B" },
  { id: "GV-1040", type: "Polyp",       region: "Descending Colon",   conf: 91, risk: "high",   date: "Today 08:11",  color: "#FF5C5C" },
  { id: "GV-1039", type: "Esophagitis", region: "Mid Esophagus",      conf: 83, risk: "medium", date: "Yesterday",    color: "#F59E0B" },
  { id: "GV-1038", type: "Polyp",       region: "Sigmoid Colon",      conf: 97, risk: "high",   date: "Yesterday",    color: "#FF5C5C" },
  { id: "GV-1037", type: "Esophagitis", region: "GEJ",                conf: 79, risk: "medium", date: "2 days ago",   color: "#F59E0B" },
  { id: "GV-1036", type: "Polyp",       region: "Rectum",             conf: 86, risk: "high",   date: "2 days ago",   color: "#FF5C5C" },
  { id: "GV-1035", type: "Esophagitis", region: "Proximal Esophagus", conf: 92, risk: "medium", date: "3 days ago",   color: "#F59E0B" },
];

const weekData   = [28, 41, 33, 52, 38, 61, 47];
const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const distData = [
  { label: "Polyp",       pct: 42, color: "#FF5C5C" },
  { label: "Esophagitis", pct: 58, color: "#F59E0B" },
];

const trendData = [18, 24, 21, 33, 29, 41, 38, 47, 44, 52];

/* ── RISK BADGE ── */
function RiskBadge({ r }: { r: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    high:   { bg: "#FEE2E2", color: "#DC2626", label: "High"   },
    medium: { bg: "#FEF3C7", color: "#D97706", label: "Medium" },
    low:    { bg: "#D1FAE5", color: "#059669", label: "Low"    },
  };
  const s = map[r] ?? map.low;
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: .3 }}>
      {s.label}
    </span>
  );
}

/* ── SPARKLINE ── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 180, h = 50;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} fillOpacity="0.08" stroke="none" />
    </svg>
  );
}

/* ── BAR CHART ── */
function BarChartComp({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: "100%",
            height: `${(v / max) * 68}px`,
            background: i === new Date().getDay() - 1 ? "var(--accent)" : "rgba(13,110,253,0.15)",
            borderRadius: "4px 4px 0 0",
            transition: "height 0.6s ease",
          }} />
          <span style={{ fontSize: 9, color: "var(--muted)", fontWeight: 500 }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── DONUT ── */
function DonutChart({ data }: { data: typeof distData }) {
  const total = data.reduce((s, d) => s + d.pct, 0);
  let angle = -90;
  const r = 52, cx = 64, cy = 64;
  const slices = data.map((d) => {
    const sweep = (d.pct / total) * 360;
    const start = angle;
    angle += sweep;
    const r1 = (start * Math.PI) / 180;
    const r2 = (angle  * Math.PI) / 180;
    const x1 = cx + r * Math.cos(r1), y1 = cy + r * Math.sin(r1);
    const x2 = cx + r * Math.cos(r2), y2 = cy + r * Math.sin(r2);
    const large = sweep > 180 ? 1 : 0;
    return { ...d, path: `M${cx},${cy} L${x1},${y1} A${r},${r},0,${large},1,${x2},${y2}Z` };
  });
  return (
    <svg width="128" height="128" viewBox="0 0 128 128">
      <circle cx={cx} cy={cy} r={r} fill="var(--bg)" />
      {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} opacity=".85" />)}
      <circle cx={cx} cy={cy} r="34" fill="var(--card)" />
      <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, fill: "var(--ink)" }}>214</text>
      <text x={cx} y={cy + 10} textAnchor="middle" style={{ fontSize: 9, fill: "var(--muted)" }}>total</text>
    </svg>
  );
}

/* ── CONFIDENCE BAR ── */
function ConfBar({ v }: { v: number }) {
  const color = v >= 90 ? "#00C896" : v >= 75 ? "#F59E0B" : "#FF5C5C";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: "var(--bg)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${v}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.8s ease" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 28 }}>{v}%</span>
    </div>
  );
}

/* ── TYPE BADGE ── */
function TypeBadge({ type }: { type: string }) {
  const isPolyp = type === "Polyp";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: isPolyp ? "#FF5C5C" : "#F59E0B", flexShrink: 0 }} />
      <span style={{ fontWeight: 600, fontSize: 13 }}>{type}</span>
    </div>
  );
}

/* ================================================================
   DASHBOARD PAGE — sidebar & topbar live in layout.tsx
   ================================================================ */
export default function DashboardPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"all" | "Polyp" | "Esophagitis">("all");

  const filtered = activeFilter === "all"
    ? cases
    : cases.filter((c) => c.type === activeFilter);

  const filters: { key: "all" | "Polyp" | "Esophagitis"; label: string; color?: string }[] = [
    { key: "all",         label: "All" },
    { key: "Polyp",       label: "Polyp",       color: "#FF5C5C" },
    { key: "Esophagitis", label: "Esophagitis", color: "#F59E0B" },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "26px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

      {/* STAT CARDS */}
      <div className="dash-stats">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="stat-card-bar" style={{ background: s.color }} />
            <div className="stat-card-top">
              <span className="stat-card-label">{s.label}</span>
              <div className="stat-card-icon" style={{ background: s.color + "18" }}>{s.icon}</div>
            </div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-delta" style={{ color: s.color }}>↑ {s.delta}</div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="dash-charts">

        <div className="chart-card fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Cases Over Time</div>
              <div className="chart-card-sub">Last 10 days</div>
            </div>
            <span className="badge-green">+18%</span>
          </div>
          <div style={{ padding: "8px 0 4px" }}>
            <Sparkline data={trendData} color="#0D6EFD" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            {["10d ago", "", "", "", "", "Today"].map((l, i) => (
              <span key={i} style={{ fontSize: 9, color: "var(--muted)" }}>{l}</span>
            ))}
          </div>
        </div>

        <div className="chart-card fade-up" style={{ animationDelay: "0.22s" }}>
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">This Week</div>
              <div className="chart-card-sub">Daily case volume</div>
            </div>
          </div>
          <BarChartComp data={weekData} labels={weekLabels} />
        </div>

        <div className="chart-card fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="chart-card-title" style={{ marginBottom: 12 }}>Detection Split</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <DonutChart data={distData} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {distData.map((d) => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "var(--ink2)", flex: 1 }}>{d.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.pct}%</span>
                </div>
              ))}
              <div style={{ marginTop: 6, padding: "8px 10px", background: "rgba(13,110,253,0.06)", borderRadius: 8, fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
                2 lesion types tracked:<br />
                <strong style={{ color: "#FF5C5C" }}>Polyp</strong> · <strong style={{ color: "#F59E0B" }}>Esophagitis</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* CASES TABLE */}
      <div className="table-card fade-up" style={{ animationDelay: "0.35s" }}>
        <div className="table-header">
          <div>
            <div className="chart-card-title">Recent Cases</div>
            <div className="chart-card-sub">Today&apos;s analyzed endoscopy sessions</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn${activeFilter === f.key ? " active" : ""}`}
                onClick={() => setActiveFilter(f.key)}
                style={f.color && activeFilter === f.key ? { borderColor: f.color, color: f.color } : {}}
              >
                {f.color && (
                  <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: f.color, marginRight: 5, verticalAlign: "middle" }} />
                )}
                {f.label}
              </button>
            ))}
            <button
              className="btn-topbar-primary"
              style={{ padding: "7px 16px", fontSize: 12, marginLeft: 8 }}
              onClick={() => router.push("/cases")}
            >
              View All
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Type</th>
                <th>Region</th>
                <th>Confidence</th>
                <th>Risk</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} className="dash-table-row">
                  <td className="case-id">{c.id}</td>
                  <td><TypeBadge type={c.type} /></td>
                  <td style={{ color: "var(--muted)", fontSize: 12 }}>{c.region}</td>
                  <td style={{ minWidth: 140 }}><ConfBar v={c.conf} /></td>
                  <td><RiskBadge r={c.risk} /></td>
                  <td style={{ color: "var(--muted)", fontSize: 11 }}>{c.date}</td>
                  <td>
                    <button className="btn-review" onClick={() => router.push("/auth")}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

/* ── SVG ICONS ── */
function CasesIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  );
}
function ActivityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
    </svg>
  );
}
function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2C6.5 6.5 6 10 9 13c-2 0-3.5-1-4-3C3.5 14 3 17 6 19.5A7 7 0 0012 22a7 7 0 006-2.5c3-2.5 2.5-5.5 1-9.5-1 2-2.5 3-4 3 3-3 2.5-6.5-3-11z" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
      <polyline points="17,6 23,6 23,12" />
    </svg>
  );
}