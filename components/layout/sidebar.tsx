"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Ico from "@/components/ui/ico";
import { I } from "@/lib/icons";
import { navItems } from "@/lib/data";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (id: string) => id === "home" ? pathname === "/" : pathname.startsWith(`/${id}`);
  const href = (id: string) => (id === "home" ? "/" : `/${id}`);

  return (
    <aside style={{
      width: 260, background: "#fff", borderRight: "1px solid #F1F5F9",
      display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh", position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "32px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(37,99,235,0.2)" }}>
            <Ico d={I.activity} s={20} c="#fff" sw={2.5} />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", letterSpacing: -0.5 }}>GastroVisIA</div>
            <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: 1 }}>CLINICAL AI · v2.4</div>
          </div>
        </div>
      </div>

      {/* Doctor card - Cleaned up with soft shadows */}
      <div style={{ margin: "0 16px 24px", background: "#F8FAFC", border: "1px solid #F1F5F9", borderRadius: 16, padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>AM</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Dr. Saber Abed</div>
            <div style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>Gastroenterologist</div>
          </div>
        </div>
        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          {[{ v: "338", l: "Cases" }, { v: "93%", l: "Conf." }].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "8px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{s.v}</div>
              <div style={{ fontSize: 9, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#94A3B8", letterSpacing: 1.5, padding: "0 16px 8px", textTransform: "uppercase" }}>Main Menu</div>
        {navItems.map((n) => (
          <Link key={n.id} href={href(n.id)} style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12,
              background: isActive(n.id) ? "#EFF6FF" : "transparent",
              color: isActive(n.id) ? "#2563EB" : "#64748B",
              fontWeight: isActive(n.id) ? 700 : 500,
              border: "none", cursor: "pointer", transition: "all 0.2s"
            }}>
              <Ico d={I[n.ico]} s={18} c={isActive(n.id) ? "#2563EB" : "#94A3B8"} />
              <span style={{ fontSize: 14 }}>{n.label}</span>
              {n.id === "live" && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />}
            </button>
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: "20px 16px" }}>
        <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: "none", background: "transparent", color: "#EF4444", fontWeight: 600, cursor: "pointer" }}>
          <Ico d={I.logout} s={18} c="#EF4444" /> <span style={{ fontSize: 14 }}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}