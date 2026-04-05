// components/ui/RiskBadge.tsx

import type { RiskLevel } from "@/Types";

const MAP: Record<RiskLevel, { cls: string; dot: string }> = {
  High:     { cls: "badge-red",   dot: "#DC2626" },
  Moderate: { cls: "badge-amber", dot: "#D97706" },
  Low:      { cls: "badge-green", dot: "#059669" },
};

export default function RiskBadge({ r }: { r: RiskLevel }) {
  const s = MAP[r] ?? MAP.Low;
  return (
    <span className={`badge ${s.cls}`}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
      {r}
    </span>
  );
}