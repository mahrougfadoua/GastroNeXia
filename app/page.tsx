"use client";

import Link from "next/link";
import Ico from "@/components/ui/ico";
import RiskBadge from "@/components/ui/riskbadge";
import { I } from "@/lib/icons";
import { cases } from "@/lib/data";

const features = [
  { ico: "zap",     title: "Real-time Detection",  desc: "Frame-by-frame lesion detection at <50ms latency",    color: "#1D4ED8" },
  { ico: "cpu",     title: "AI Classification",    desc: "Multi-class diagnosis with confidence scoring",        color: "#DC2626" },
  { ico: "eye",     title: "Precise Segmentation", desc: "Pixel-level mask overlay for exact lesion boundaries", color: "#059669" },
  { ico: "reports", title: "Smart Reporting",      desc: "Auto-generated PDF reports with clinical insights",    color: "#D97706" },
];

const quickActions = [
  { label: "Resume Last Case",    sub: "GV-0891 · Polyp",       ico: "cases",   color: "#1D4ED8", href: "/analysis" },
  { label: "Start New Analysis",  sub: "Live endoscopy feed",    ico: "live",    color: "#059669", href: "/live"     },
  { label: "Generate Report",     sub: "Last 30 days",           ico: "reports", color: "#D97706", href: "/reports"  },
];

export default function HomePage() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 28 }}>
      
      {/* 2. Massive Hero Section - تم تكبير الحجم هنا */}
      <div className="card fade-up" style={{ 
        padding: "80px 60px", // زيادة الـ Padding لتكبير المساحة
        background: "linear-gradient(105deg, #020617 0%, #1E3A8A 40%, #2563EB 100%)", 
        position: "relative", 
        overflow: "hidden", 
        borderColor: "transparent",
        borderRadius: 24, // حواف أكثر انحناءً
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}>
        <div className="aura" style={{ width: 400, height: 400, background: "rgba(59,130,246,0.1)", top: -100, right: -50 }} />
        
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#93C5FD", letterSpacing: 1.5, marginBottom: 14, textTransform: "uppercase" }}>
              AI-Powered · Gastrointestinal Endoscopy
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 14 }}>
              GastroVisIA<br />
              <span style={{ color: "#93C5FD", fontSize: 24, fontWeight: 500 }}>Clinical Decision Support System</span>
            </h2>
            <p style={{ color: "#CBD5E1", fontSize: 15, maxWidth: 500, lineHeight: 1.6, marginBottom: 28 }}>
              Real-time AI analysis of gastrointestinal endoscopy feeds. Detect, classify and segment lesions with clinical-grade accuracy.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/live"><button className="btn" style={{ background: "#fff", color: "#1D4ED8", fontWeight: 700, padding: "12px 24px", borderRadius: 10 }}>▶ Start Live Analysis</button></Link>
              <Link href="/cases"><button className="btn" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 24px", borderRadius: 10 }}>↑ Upload Case</button></Link>
            </div>
          </div>

          <div style={{ flexShrink: 0, width: 220, height: 180, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 24, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <div style={{ fontSize: 52, fontFamily: "var(--font-display)", fontWeight: 800, color: "#fff", lineHeight: 1 }}>97%</div>
                <div style={{ fontSize: 13, color: "#93C5FD", fontWeight: 600, marginTop: 6 }}>Avg Accuracy</div>
                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                  {["#EF4444", "#F59E0B", "#10B981"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Features Section */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", letterSpacing: 1, marginBottom: 16, textTransform: "uppercase" }}>Platform Features</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} className="card card-hover" style={{ padding: "24px", cursor: "pointer", background: "#fff" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: f.color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Ico d={I[f.ico]} s={20} c={f.color} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Grid (Quick Actions + Recent) */}
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 18 }}>Quick Actions</div>
          {quickActions.map((q, i) => (
            <Link key={i} href={q.href} style={{ textDecoration: "none" }}>
              <button style={{ width: "100%", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "14px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", marginBottom: 10, textAlign: "left" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: q.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico d={I[q.ico]} s={16} c={q.color} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{q.label}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>{q.sub}</div>
                </div>
              </button>
            </Link>
          ))}
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Recent Activity</div>
            <Link href="/cases" style={{ fontSize: 12, color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>View All Activity</Link>
          </div>
          <table className="tbl" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
               <tr style={{ textAlign: "left", borderBottom: "1px solid #E2E8F0" }}>
                 <th style={{ padding: "12px 8px", fontSize: 12, color: "#64748B" }}>Case ID</th>
                 <th style={{ padding: "12px 8px", fontSize: 12, color: "#64748B" }}>Finding</th>
                 <th style={{ padding: "12px 8px", fontSize: 12, color: "#64748B" }}>Region</th>
                 <th style={{ padding: "12px 8px", fontSize: 12, color: "#64748B" }}>Risk</th>
                 <th style={{ padding: "12px 8px", fontSize: 12, color: "#64748B" }}>Time</th>
               </tr>
            </thead>
            <tbody>
              {cases.slice(0, 4).map((c, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "14px 8px", fontWeight: 700, fontSize: 13 }}>{c.id}</td>
                  <td style={{ padding: "14px 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{c.type}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 8px", color: "#64748B", fontSize: 13 }}>{c.region}</td>
                  <td style={{ padding: "14px 8px" }}><RiskBadge r={c.risk} /></td>
                  <td style={{ padding: "14px 8px", color: "#94A3B8", fontSize: 12 }}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}