// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Ico from "@/components/ui/ico";
// import { I } from "@/lib/icons";
// import { navItems } from "@/lib/data";


// export default function Sidebar() {
//   const pathname = usePathname();
//   const isActive = (id: string) => id === "home" ? pathname === "/" : pathname.startsWith(`/${id}`);
//   const href = (id: string) => (id === "home" ? "/" : `/${id}`);

//   return (
//     <aside style={{
//       width: 260, background: "#fff", borderRight: "1px solid #F1F5F9",
//       display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh", position: "sticky", top: 0,
//     }}>
//       {/* Logo */}
//       <div style={{ padding: "32px 24px" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <div style={{ width: 42, height: 42, borderRadius: 12, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(37,99,235,0.2)" }}>
//             <Ico d={I.activity} s={20} c="#fff" sw={2.5} />
//           </div>
//           <div>
//             <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", letterSpacing: -0.5 }}>GastroVisIA</div>
//             <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: 1 }}>CLINICAL AI · v2.4</div>
//           </div>
//         </div>
//       </div>

//       {/* Doctor card - Cleaned up with soft shadows */}
//       <div style={{ margin: "0 16px 24px", background: "#F8FAFC", border: "1px solid #F1F5F9", borderRadius: 16, padding: 16 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <div style={{ width: 40, height: 40, borderRadius: 12, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>AM</div>
//           <div>
//             <div style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Dr. Saber Abed</div>
//             <div style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>Gastroenterologist</div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
//         <div style={{ fontSize: 10, fontWeight: 800, color: "#94A3B8", letterSpacing: 1.5, padding: "0 16px 8px", textTransform: "uppercase" }}>Main Menu</div>
//         {navItems.map((n) => (
//           <Link key={n.id} href={href(n.id)} style={{ textDecoration: "none" }}>
//             <button style={{
//               width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12,
//               background: isActive(n.id) ? "#EFF6FF" : "transparent",
//               color: isActive(n.id) ? "#2563EB" : "#64748B",
//               fontWeight: isActive(n.id) ? 700 : 500,
//               border: "none", cursor: "pointer", transition: "all 0.2s"
//             }}>
//               <Ico d={I[n.ico]} s={18} c={isActive(n.id) ? "#2563EB" : "#94A3B8"} />
//               <span style={{ fontSize: 14 }}>{n.label}</span>
//               {n.id === "live" && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />}
//             </button>
//           </Link>
//         ))}
//       </nav>

//       {/* Sign out */}
//       <div style={{ padding: "20px 16px" }}>
//         <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: "none", background: "transparent", color: "#EF4444", fontWeight: 600, cursor: "pointer" }}>
//           <Ico d={I.logout} s={18} c="#EF4444" /> <span style={{ fontSize: 14 }}>Sign Out</span>
//         </button>
//       </div>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Ico from "@/components/ui/ico";
import { I } from "@/lib/icons";
import { navItems } from "@/lib/data";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (id: string) => id === "home" ? pathname === "/" : pathname.startsWith(`/${id}`);
  const href = (id: string) => (id === "home" ? "/" : `/${id}`);

  return (
    <aside style={{
      width: 260,
      background: "#ffffff",
      borderRight: "1px solid rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      height: "100vh",
      position: "sticky",
      top: 0,
    }}>

      {/* ── LOGO ── */}
      <div
        onClick={() => router.push("/welcome")}
        style={{
          padding: "28px 24px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <div style={{
          width: 36, height: 36,
          borderRadius: 10,
          background: "linear-gradient(135deg, #0d6efd, #00c896)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 14px rgba(13,110,253,0.35)",
          flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: "#0a0f1e", letterSpacing: -0.4 }}>GastroVisIA</div>
          <div style={{ fontSize: 9, color: "#94A3B8", fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>Clinical AI · v2.4</div>
        </div>
      </div>

      {/* ── DOCTOR CARD ── */}
      <div style={{
        margin: "16px 14px",
        background: "linear-gradient(135deg, rgba(13,110,253,0.06), rgba(0,200,150,0.06))",
        border: "1px solid rgba(13,110,253,0.1)",
        borderRadius: 14,
        padding: 14,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          width: 38, height: 38,
          borderRadius: 10,
          background: "linear-gradient(135deg, #0d6efd, #0891b2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, color: "#fff",
          boxShadow: "0 4px 10px rgba(13,110,253,0.3)",
          flexShrink: 0,
        }}>
          SA
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Dr. Saber Abed</div>
          <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Gastroenterologist</div>
        </div>
      </div>

      {/* ── NAVIGATION ── */}
      <nav style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        <div style={{
          fontSize: 9, fontWeight: 800, color: "#94a3b8",
          letterSpacing: 1.8, textTransform: "uppercase",
          padding: "8px 14px 6px",
        }}>
          Main Menu
        </div>

        {navItems.map((n) => (
          <Link key={n.id} href={href(n.id)} style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 11,
              background: isActive(n.id)
                ? "linear-gradient(135deg, rgba(13,110,253,0.1), rgba(0,200,150,0.06))"
                : "transparent",
              color: isActive(n.id) ? "#0d6efd" : "#64748b",
              fontWeight: isActive(n.id) ? 700 : 500,
              fontSize: 13.5,
              border: "none",
              borderLeft: isActive(n.id) ? "3px solid #0d6efd" : "3px solid transparent",
              cursor: "pointer",
              transition: "all 0.18s",
              textAlign: "left",
            }}>
              <Ico
                d={I[n.ico]}
                s={18}
                c={isActive(n.id) ? "#0d6efd" : "#94A3B8"}
              />
              <span>{n.label}</span>

              {/* Live pulse badge */}
              {n.id === "live" && (
                <span style={{
                  marginLeft: "auto",
                  width: 7, height: 7,
                  borderRadius: "50%",
                  background: "#00c896",
                  boxShadow: "0 0 6px rgba(0,200,150,0.7)",
                  animation: "pulseLive 1.5s infinite",
                }} />
              )}
            </button>
          </Link>
        ))}

        {/* System section */}
        <div style={{
          fontSize: 9, fontWeight: 800, color: "#94a3b8",
          letterSpacing: 1.8, textTransform: "uppercase",
          padding: "14px 14px 6px",
        }}>
          System
        </div>

        <Link href="/settings" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%",
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", borderRadius: 11,
            background: pathname.startsWith("/settings")
              ? "linear-gradient(135deg, rgba(13,110,253,0.1), rgba(0,200,150,0.06))"
              : "transparent",
            color: pathname.startsWith("/settings") ? "#0d6efd" : "#64748b",
            fontWeight: pathname.startsWith("/settings") ? 700 : 500,
            fontSize: 13.5,
            border: "none",
            borderLeft: pathname.startsWith("/settings") ? "3px solid #0d6efd" : "3px solid transparent",
            cursor: "pointer",
            transition: "all 0.18s",
          }}>
            <Ico d={I.settings} s={18} c={pathname.startsWith("/settings") ? "#0d6efd" : "#94A3B8"} />
            <span>Settings</span>
          </button>
        </Link>
      </nav>

      {/* ── SIGN OUT ── */}
      <div style={{ padding: "12px 10px 20px" }}>
        <button style={{
          width: "100%",
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px", borderRadius: 11,
          border: "1px solid rgba(239,68,68,0.12)",
          background: "rgba(239,68,68,0.04)",
          color: "#ef4444", fontWeight: 600, fontSize: 13.5,
          cursor: "pointer", transition: "all 0.18s",
        }}>
          <Ico d={I.logout} s={18} c="#EF4444" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulseLive {
          0%, 100% { box-shadow: 0 0 4px rgba(0,200,150,0.5); }
          50% { box-shadow: 0 0 10px rgba(0,200,150,0.9); }
        }
      `}</style>
    </aside>
  );
}