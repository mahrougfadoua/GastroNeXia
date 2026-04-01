// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import Ico from "@/components/ui/ico";
import RiskBadge from "@/components/ui/riskbadge";
import { ConfBar, Donut, Spark, BarChart } from "@/components/ui/Charts";
import { I } from "@/lib/icons";
import { cases, weekData, weekLabels, trendData, distData } from "@/lib/data";

const stats = [
  { label: "Total Cases",      value: "338",   delta: "+18 this week", color: "#1D4ED8", ico: "cases"    },
  { label: "Lesions Detected", value: "142",   delta: "+5 today",      color: "#DC2626", ico: "activity" },
  { label: "Normal Cases",     value: "129",   delta: "Stable",        color: "#059669", ico: "eye"      },
  { label: "Avg Confidence",   value: "93.4%", delta: "+1.2% vs last", color: "#D97706", ico: "trending" },
];

export default function DashPage() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "26px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Alert banner */}
      <div className="fade-up" style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#D97706", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 13, color: "#92400E", fontWeight: 600 }}>3 cases awaiting review · Last AI sync 2 min ago</span>
        <Link href="/cases">
          <button className="btn" style={{ marginLeft: "auto", padding: "4px 12px", fontSize: 12, background: "#FEF3C7", color: "#D97706", border: "1px solid #FDE68A" }}>Review Now</button>
        </Link>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {stats.map((s, i) => (
          <div key={i} className={`card fade-up d${i + 1}`} style={{ padding: "20px 22px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: "16px 16px 0 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: .4 }}>{s.label.toUpperCase()}</span>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ico d={I[s.ico]} s={15} c={s.color} />
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800, color: "var(--ink)", lineHeight: 1 }}>{s.value}</div>
            <div style={{ marginTop: 8, fontSize: 12, color: s.color, fontWeight: 600 }}>↑ {s.delta}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: 16 }}>
        <div className="card fade-up d2" style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Cases Over Time</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Last 10 days</div>
            </div>
            <span className="badge badge-blue">+12%</span>
          </div>
          <Spark data={trendData} color="#1D4ED8" h={80} />
          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
            {["10d ago", "", "", "", "Today"].map((l, i) => <span key={i} style={{ fontSize: 10, color: "#94A3B8" }}>{l}</span>)}
          </div>
        </div>

        <div className="card fade-up d3" style={{ padding: "22px 24px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>This Week</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>Daily case volume</div>
          <BarChart data={weekData} labels={weekLabels} />
        </div>

        <div className="card fade-up d4" style={{ padding: "22px 20px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Detection Split</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>All-time distribution</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <Donut data={distData} total={338} />
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
              {distData.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "var(--ink2)", flex: 1 }}>{d.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card fade-up d4" style={{ padding: "22px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Recent Cases</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Today&apos;s analyzed endoscopy sessions</div>
          </div>
          <Link href="/cases"><button className="btn btn-primary" style={{ padding: "7px 16px", fontSize: 12 }}>View All Cases</button></Link>
        </div>
        <table className="tbl">
          <thead><tr><th>Case ID</th><th>Thumbnail</th><th>Finding</th><th>Region</th><th>Confidence</th><th>Risk</th><th>Date</th></tr></thead>
          <tbody>{cases.map((c, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 700, color: "var(--ink2)", fontSize: 12 }}>{c.id}</td>
              <td><div style={{ width: 36, height: 28, borderRadius: 6, background: `${c.color}22`, border: `1.5px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ico d={I.eye} s={12} c={c.color} />
              </div></td>
              <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} /><span style={{ fontWeight: 600 }}>{c.type}</span></div></td>
              <td style={{ color: "var(--muted)", fontSize: 12 }}>{c.region}</td>
              <td style={{ minWidth: 130 }}><ConfBar v={c.conf} /></td>
              <td><RiskBadge r={c.risk} /></td>
              <td style={{ color: "var(--muted)", fontSize: 11 }}>{c.date}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}