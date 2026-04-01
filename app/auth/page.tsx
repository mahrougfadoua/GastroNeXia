// app/auth/page.tsx
"use client";

import { useState } from "react";
import Ico from "@/components/ui/ico";
import { I } from "@/lib/icons";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [show, setShow] = useState(false);

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, background: "linear-gradient(135deg,#F8FAFC,#EFF6FF)", position: "relative", overflow: "hidden" }}>
      <div className="aura" style={{ width: 400, height: 400, background: "rgba(29,78,216,.06)", top: "-10%", left: "10%" }} />
      <div className="aura" style={{ width: 300, height: 300, background: "rgba(5,150,105,.04)", bottom: "10%", right: "10%" }} />

      <div className="card fade-up" style={{ width: 460, padding: "40px 44px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", boxShadow: "0 8px 24px rgba(29,78,216,.25)" }}>
            <Ico d={I.activity} s={22} c="#fff" sw={2} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>GastroVisIA</h2>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Clinical AI Platform for Gastroenterologists</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "var(--bg)", borderRadius: 10, padding: 4, marginBottom: 28, gap: 4 }}>
          {(["login", "register"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer",
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, transition: "all .2s",
              background: tab === t ? "#fff" : "transparent", color: tab === t ? "var(--ink)" : "var(--muted)",
              boxShadow: tab === t ? "var(--card-shadow)" : "none",
            }}>
              {t === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 6 }}>Email / Username</label>
              <input className="field" type="email" placeholder="doctor@hospital.com" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input className="field" type={show ? "text" : "password"} placeholder="••••••••" style={{ paddingRight: 44 }} />
                <button onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
                  <Ico d={I.eye} s={15} c="currentColor" />
                </button>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13, color: "var(--ink2)" }}>
                <input type="checkbox" style={{ accentColor: "var(--blue)" }} />Remember me
              </label>
              <a href="#" style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>Forgot password?</a>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", padding: 13, marginTop: 4, fontSize: 15 }}>Sign In to Platform</button>
            <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>Secure medical platform — <span style={{ color: "var(--blue)", fontWeight: 600 }}>HIPAA compliant</span></div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>First Name</label><input className="field" placeholder="Ahmed" /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Last Name</label><input className="field" placeholder="Mansouri" /></div>
            </div>
            <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Email</label><input className="field" type="email" placeholder="doctor@hospital.com" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Password</label><input className="field" type="password" placeholder="••••••••" /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Confirm</label><input className="field" type="password" placeholder="••••••••" /></div>
            </div>
            <div><label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Hospital / Clinic</label><input className="field" placeholder="Amizour General Hospital" /></div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", display: "block", marginBottom: 5 }}>Specialty</label>
              <select className="field"><option>Gastroenterology</option><option>Internal Medicine</option><option>Surgery</option><option>Oncology</option></select>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", padding: 13, marginTop: 4, fontSize: 15 }}>Create Doctor Account</button>
          </div>
        )}
      </div>
    </div>
  );
}