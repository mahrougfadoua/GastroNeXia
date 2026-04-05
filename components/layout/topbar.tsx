// "use client";

// import { usePathname } from "next/navigation";
// import Ico from "@/components/ui/ico"
// import { I } from "@/lib/icons";

// const TITLES: Record<string, string> = { "/": "Overview", "/live": "Live Analysis" }; // Add others...

// export default function Topbar() {
//   const pathname = usePathname();
//   const title = TITLES[pathname] ?? "Dashboard";

//   return (
//     <div style={{
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       padding: "20px 40px", background: "#fff", borderBottom: "1px solid #F1F5F9",
//     }}>
//       <div>
//         <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", letterSpacing: -0.8 }}>{title}</h1>
//       </div>
      
//       <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//         {/* Modern Search */}
//         <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#F8FAFC", borderRadius: 12, padding: "10px 16px", width: 280 }}>
//           <Ico d={I.search} s={16} c="#94A3B8" />
//           <input placeholder="Search records..." style={{ border: "none", background: "transparent", fontSize: 14, outline: "none", width: "100%", color: "#1E293B" }} />
//         </div>

//         {/* Action Buttons */}
//         <div style={{ display: "flex", gap: 10 }}>
//           <button style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid #F1F5F9", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
//             <Ico d={I.bell} s={20} c="#64748B" />
//             <div style={{ position: "absolute", top: 13, right: 13, width: 8, height: 8, background: "#EF4444", borderRadius: "50%", border: "2px solid #fff" }} />
//           </button>
          
//           <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #3B82F6, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 14 }}>
//             AM
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { usePathname } from "next/navigation";
import Ico from "@/components/ui/ico";
import { I } from "@/lib/icons";

const TITLES: Record<string, { title: string; breadcrumb: string }> = {
  "/":            { title: "Overview",        breadcrumb: "GastroVisIA · Dashboard"     },
  "/live":        { title: "Live Analysis",   breadcrumb: "GastroVisIA · Live"          },
  "/segmentation":{ title: "Segmentation",    breadcrumb: "GastroVisIA · AI Tools"      },
  "/reports":     { title: "Case Reports",    breadcrumb: "GastroVisIA · Reports"       },
  "/patients":    { title: "Patients",        breadcrumb: "GastroVisIA · Records"       },
  "/settings":    { title: "Settings",        breadcrumb: "GastroVisIA · System"        },
};

export default function Topbar() {
  const pathname = usePathname();
  const page = TITLES[pathname] ?? { title: "Dashboard", breadcrumb: "GastroVisIA" };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 36px",
      background: "#ffffff",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      flexShrink: 0,
    }}>

      {/* ── LEFT: Title ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, letterSpacing: 0.3 }}>
          {page.breadcrumb}
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#0a0f1e", letterSpacing: -0.6, margin: 0 }}>
          {page.title}
        </h1>
      </div>

      {/* ── CENTER: Status pill (matches welcome hero-tag) ──
      <div style={{
        display: "flex", alignItems: "center", gap: 7,
        background: "rgba(0,200,150,0.08)",
        border: "1px solid rgba(0,200,150,0.2)",
        borderRadius: 99,
        padding: "6px 16px",
        fontSize: 11, fontWeight: 700, color: "#00c896",
        letterSpacing: 0.3,
      }}>
        <span style={{
          width: 7, height: 7,
          borderRadius: "50%",
          background: "#00c896",
          display: "inline-block",
          animation: "pulseLive 1.5s infinite",
        }} />
        AI Diagnostic System · Active
      </div> */}

      {/* ── RIGHT: Search + Actions ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#f8fafc",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 11,
          padding: "9px 14px",
          width: 240,
          transition: "border-color 0.2s",
        }}>
          <Ico d={I.search} s={15} c="#94A3B8" />
          <input
            placeholder="Search records…"
            style={{
              border: "none", background: "transparent",
              fontSize: 13, outline: "none",
              width: "100%", color: "#1e293b",
            }}
          />
        </div>

        {/* Notification bell */}
        <button style={{
          width: 40, height: 40,
          borderRadius: 11,
          border: "1px solid rgba(0,0,0,0.07)",
          background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.18s",
        }}>
          <Ico d={I.bell} s={18} c="#64748B" />
          <div style={{
            position: "absolute", top: 9, right: 9,
            width: 8, height: 8,
            background: "#FF5C5C",
            borderRadius: "50%",
            border: "2px solid #fff",
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 40, height: 40,
          borderRadius: 11,
          background: "linear-gradient(135deg, #0d6efd, #00c896)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, color: "#fff", fontSize: 13,
          boxShadow: "0 4px 12px rgba(13,110,253,0.3)",
          cursor: "pointer",
          userSelect: "none",
        }}>
          SA
        </div>
      </div>

      <style>{`
        @keyframes pulseLive {
          0%, 100% { box-shadow: 0 0 4px rgba(0,200,150,0.5); }
          50% { box-shadow: 0 0 10px rgba(0,200,150,0.9); }
        }
      `}</style>
    </div>
  );
}