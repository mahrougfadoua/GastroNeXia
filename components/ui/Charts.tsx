// components/ui/Charts.tsx
"use client";

/* ── Confidence Bar ── */
export function ConfBar({ v }: { v: number }) {
  const c = v >= 95 ? "#059669" : v >= 85 ? "#D97706" : "#DC2626";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: "#F1F5F9", borderRadius: 99 }}>
        <div style={{ width: `${v}%`, height: "100%", background: c, borderRadius: 99, transition: "width .5s ease" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 30 }}>{v}%</span>
    </div>
  );
}

/* ── Donut ── */
interface DonutSlice { label: string; count: number; pct: number; color: string; }
export function Donut({ data, total }: { data: DonutSlice[]; total: number }) {
  const r = 46, cx = 56, cy = 56, sw = 10, circ = 2 * Math.PI * r;
  let off = 0;
  const slices = data.map((d) => {
    const dash = (d.pct / 100) * circ;
    const s = { ...d, dash, off };
    off += dash;
    return s;
  });
  return (
    <svg width={112} height={112}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F1F5F9" strokeWidth={sw} />
      {slices.map((s, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={sw}
          strokeDasharray={`${s.dash} ${circ - s.dash}`}
          strokeDashoffset={circ / 4 - s.off}
          strokeLinecap="butt" />
      ))}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize={20} fontWeight={800} fill="#0F172A" fontFamily="Sora,sans-serif">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={9} fill="#94A3B8" fontWeight={600} letterSpacing={1}>CASES</text>
    </svg>
  );
}

/* ── Sparkline ── */
export function Spark({ data, color = "#1D4ED8", h = 50 }: { data: number[]; color?: string; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 200},${h - ((v - min) / (max - min || 1)) * (h - 8) + 4}`).join(" ");
  const id = `sg${color.replace("#", "")}`;
  return (
    <svg width="100%" viewBox={`0 0 200 ${h}`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} 200,${h}`} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => i === data.length - 1 && (
        <circle key={i} cx={(i / (data.length - 1)) * 200}
          cy={h - ((v - min) / (max - min || 1)) * (h - 8) + 4}
          r={4} fill={color} stroke="#fff" strokeWidth={2} />
      ))}
    </svg>
  );
}

/* ── Bar Chart ── */
export function BarChart({ data, labels, color = "#1D4ED8" }: { data: number[]; labels: string[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 70 }}>
      {data.map((v, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
          <div style={{ width: "100%", background: i === data.length - 1 ? color : "#E2E8F0", borderRadius: "5px 5px 0 0", height: `${(v / max) * 58}px`, transition: "height .4s ease", position: "relative" }}>
            {i === data.length - 1 && (
              <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 700, color, whiteSpace: "nowrap" }}>{v}</div>
            )}
          </div>
          <span style={{ fontSize: 8.5, color: "#94A3B8", fontWeight: 600 }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}