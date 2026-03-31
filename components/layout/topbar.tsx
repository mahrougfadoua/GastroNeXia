"use client";

import { usePathname } from "next/navigation";
import Ico from "@/components/ui/ico"
import { I } from "@/lib/icons";

const TITLES: Record<string, string> = { "/": "Overview", "/live": "Live Analysis" }; // Add others...

export default function Topbar() {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? "Dashboard";

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 40px", background: "#fff", borderBottom: "1px solid #F1F5F9",
    }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", letterSpacing: -0.8 }}>{title}</h1>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Modern Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#F8FAFC", borderRadius: 12, padding: "10px 16px", width: 280 }}>
          <Ico d={I.search} s={16} c="#94A3B8" />
          <input placeholder="Search records..." style={{ border: "none", background: "transparent", fontSize: 14, outline: "none", width: "100%", color: "#1E293B" }} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid #F1F5F9", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
            <Ico d={I.bell} s={20} c="#64748B" />
            <div style={{ position: "absolute", top: 13, right: 13, width: 8, height: 8, background: "#EF4444", borderRadius: "50%", border: "2px solid #fff" }} />
          </button>
          
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #3B82F6, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 14 }}>
            AM
          </div>
        </div>
      </div>
    </div>
  );
}