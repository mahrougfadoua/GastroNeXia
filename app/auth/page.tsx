// // app/auth/page.tsx
// "use client";

// import { useState } from "react";
// import Ico from "@/components/ui/ico";
// import { I } from "@/lib/icons";

// export default function AuthPage() {
//   const [tab, setTab] = useState<"login" | "register">("login");
//   const [show, setShow] = useState(false);

//   return (
//     <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, background: "linear-gradient(135deg,#F8FAFC,#EFF6FF)", position: "relative", overflow: "hidden" }}>
//       <div className="aura" style={{ width: 400, height: 400, background: "rgba(29,78,216,.06)", top: "-10%", left: "10%" }} />
//       <div className="aura" style={{ width: 300, height: 300, background: "rgba(5,150,105,.04)", bottom: "10%", right: "10%" }} />

//       <div className="card fade-up" style={{ width: 460, padding: "40px 44px", position: "relative", zIndex: 1 }}>
//         {/* Logo */}
//         <div style={{ textAlign: "center", marginBottom: 28 }}>
//           <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", boxShadow: "0 8px 24px rgba(29,78,216,.25)" }}>
//             <Ico d={I.activity} s={22} c="#fff" sw={2} />
//           </div>
//           <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>GastroVisIA</h2>
//           <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Clinical AI Platform for Gastroenterologists</p>
//         </div>

//         {/* Tabs */}
//         <div style={{ display: "flex", background: "var(--bg)", borderRadius: 10, padding: 4, marginBottom: 28, gap: 4 }}>
//           {(["login", "register"] as const).map((t) => (
//             <button key={t} onClick={() => setTab(t)} style={{
//               flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer",
//               fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, transition: "all .2s",
//               background: tab === t ? "#fff" : "transparent", color: tab === t ? "var(--ink)" : "var(--muted)",
//               boxShadow: tab === t ? "var(--card-shadow)" : "none",
//             }}>
//               {t === "login" ? "Sign In" : "Create Account"}
//             </button>
//           ))}
//         </div>

//         {tab === "login" ? (
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             <div>
//               <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 6 }}>Email / Username</label>
//               <input className="field" type="email" placeholder="doctor@hospital.com" />
//             </div>
//             <div>
//               <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 6 }}>Password</label>
//               <div style={{ position: "relative" }}>
//                 <input className="field" type={show ? "text" : "password"} placeholder="••••••••" style={{ paddingRight: 44 }} />
//                 <button onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
//                   <Ico d={I.eye} s={15} c="currentColor" />
//                 </button>
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13, color: "var(--ink2)" }}>
//                 <input type="checkbox" style={{ accentColor: "var(--blue)" }} />Remember me
//               </label>
//               <a href="#" style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>Forgot password?</a>
//             </div>
//             <button className="btn btn-primary" style={{ width: "100%", padding: 13, marginTop: 4, fontSize: 15 }}>Sign In to Platform</button>
//             <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>Secure medical platform — <span style={{ color: "var(--blue)", fontWeight: 600 }}>HIPAA compliant</span></div>
//           </div>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//               <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>First Name</label><input className="field" placeholder="Ahmed" /></div>
//               <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Last Name</label><input className="field" placeholder="Mansouri" /></div>
//             </div>
//             <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Email</label><input className="field" type="email" placeholder="doctor@hospital.com" /></div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//               <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Password</label><input className="field" type="password" placeholder="••••••••" /></div>
//               <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Confirm</label><input className="field" type="password" placeholder="••••••••" /></div>
//             </div>
//             <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Hospital / Clinic</label><input className="field" placeholder="Amizour General Hospital" /></div>
//             <div>
//               <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Specialty</label>
//               <select className="field"><option>Gastroenterology</option><option>Internal Medicine</option><option>Surgery</option><option>Oncology</option></select>
//             </div>
//             <button className="btn btn-primary" style={{ width: "100%", padding: 13, marginTop: 4, fontSize: 15 }}>Create Doctor Account</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthPage() {
  const [tab, setTab]   = useState<"login" | "register">("login");
  const [show, setShow] = useState(false);

  return (
    <div className="auth-root">

      {/* ── LEFT PANEL ── */}
      <div className="auth-left">
        <div className="auth-left-inner">

          <Link href="/welcome" className="auth-logo">
            <div className="auth-logo-icon">
              <PlusIcon />
            </div>
            <span className="auth-logo-text">GastroVisIA</span>
          </Link>

          <h2 className="auth-tagline">
            Clinical AI<br />for <em>GI Endoscopy.</em>
          </h2>

          <p className="auth-desc">
            An AI diagnostic support system built for gastroenterologists.
            Detect, classify and report lesions in real time.
          </p>

          <div className="auth-features">
            {[
              "Real-time AI detection at <50ms",
              "Multi-class lesion classification",
              "Auto-generated clinical PDF reports",
              "HIPAA compliant & secure",
            ].map((f) => (
              <div key={f} className="af-item">
                <span className="af-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="auth-copy">© 2026 GastroVisIA · Clinical AI Platform</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="auth-right">
        <div className="auth-card">

          {/* logo */}
          <div className="auth-card-logo">
            <div className="card-mark">
              <PlusIcon />
            </div>
            <h2>GastroVisIA</h2>
            <p>AI Diagnostic Platform for Gastroenterologists</p>
          </div>

          {/* tabs */}
          <div className="tabs">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                className={`tab${tab === t ? " active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* ── LOGIN ── */}
          {tab === "login" && (
            <div className="field-group">
              <div className="field">
                <label>Email / Username</label>
                <input type="email" placeholder="doctor@hospital.com" />
              </div>

              <div className="field">
                <label>Password</label>
                <div className="pw-wrap">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <button
                    className="pw-eye"
                    onClick={() => setShow((s) => !s)}
                    type="button"
                  >
                    {show ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div className="flex-row">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="forgot">Forgot password?</a>
              </div>

              <button className="btn-submit">Sign In to Platform</button>
              <p className="hipaa">
                Secure medical platform — <span>HIPAA compliant</span>
              </p>
            </div>
          )}

          {/* ── REGISTER ── */}
          {tab === "register" && (
            <div className="field-group">
              <div className="field-row">
                <div className="field">
                  <label>First Name</label>
                  <input placeholder="Ahmed" />
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input placeholder="Mansouri" />
                </div>
              </div>

              <div className="field">
                <label>Professional Email</label>
                <input type="email" placeholder="doctor@hospital.com" />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="field">
                  <label>Confirm</label>
                  <input type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="field">
                <label>Hospital / Clinic</label>
                <input placeholder="Amizour General Hospital" />
              </div>

              <div className="field">
                <label>Specialty</label>
                <select>
                  <option>Gastroenterology</option>
                  <option>Internal Medicine</option>
                  <option>Surgery</option>
                  <option>Oncology</option>
                </select>
              </div>

              <button className="btn-submit">Create Doctor Account</button>
              <p className="hipaa">
                By registering you agree to our <span>Terms of Use</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}