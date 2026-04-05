"use client";

import React, { useState, useRef, ChangeEvent } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type TabId = "profile" | "security" | "notifications" | "billing" | "data-export" | "delete";

interface SectionCardProps {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}

interface InfoFieldProps {
  label: string;
  value: string;
}

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function SectionCard({ title, onEdit, children }: SectionCardProps) {
  return (
    <div style={{
      background: "#fff", borderRadius: "0.875rem",
      border: "1px solid #eef0f4", padding: "1.75rem 2rem",
      marginBottom: "1.25rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.4rem" }}>
        <h3 style={{ margin: 0, fontSize: "0.975rem", fontWeight: 700, color: "#1a1d23", letterSpacing: "-0.01em" }}>{title}</h3>
        {onEdit && (
          <button type="button" onClick={onEdit} style={{
            display: "flex", alignItems: "center", gap: "0.35rem",
            background: "none", border: "1px solid #e2e5eb", borderRadius: "0.5rem",
            padding: "0.35rem 0.85rem", cursor: "pointer", color: "#6b7280",
            fontSize: "0.78rem", fontWeight: 600, fontFamily: "inherit",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#4f8ef7"; (e.currentTarget as HTMLButtonElement).style.color = "#4f8ef7"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e5eb"; (e.currentTarget as HTMLButtonElement).style.color = "#6b7280"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div>
      <p style={{ margin: "0 0 0.3rem", fontSize: "0.72rem", color: "#9ca3af", fontWeight: 500, letterSpacing: "0.02em" }}>{label}</p>
      <p style={{ margin: 0, fontSize: "0.9rem", color: "#1a1d23", fontWeight: 500 }}>{value}</p>
    </div>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder }: InputFieldProps) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.4rem", letterSpacing: "0.01em" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          value={value} onChange={onChange} placeholder={placeholder}
          style={{
            width: "100%", boxSizing: "border-box",
            border: "1px solid #e2e5eb", borderRadius: "0.55rem",
            padding: "0.65rem 0.9rem",
            paddingRight: isPassword ? "2.5rem" : "0.9rem",
            fontSize: "0.88rem", color: "#1a1d23",
            background: "#fafbfc", outline: "none",
            fontFamily: "inherit", transition: "border-color 0.15s, box-shadow 0.15s",
          }}
          onFocus={e => { e.target.style.borderColor = "#4f8ef7"; e.target.style.boxShadow = "0 0 0 3px #4f8ef715"; e.target.style.background = "#fff"; }}
          onBlur={e => { e.target.style.borderColor = "#e2e5eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#fafbfc"; }}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} style={{
            position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0,
            display: "flex", alignItems: "center",
          }}>
            {show
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            }
          </button>
        )}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 0", borderBottom: "1px solid #f3f4f6" }}>
      <div>
        <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#1a1d23" }}>{label}</p>
        {description && <p style={{ margin: "0.2rem 0 0", fontSize: "0.76rem", color: "#9ca3af" }}>{description}</p>}
      </div>
      <button type="button" onClick={() => onChange(!checked)} style={{
        width: 42, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
        background: checked ? "#4f8ef7" : "#e2e5eb",
        position: "relative", transition: "background 0.2s", flexShrink: 0,
      }}>
        <span style={{
          position: "absolute", top: 3, left: checked ? 21 : 3,
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          transition: "left 0.2s", display: "block",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </button>
    </div>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────
function ProfileTab() {
  const [editing, setEditing] = useState<"personal" | "address" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [personal, setPersonal] = useState({
    firstName: "Karim", lastName: "Boumediene",
    email: "k.boumediene@chu-constantine.dz",
    phone: "+213 555 123 456", bio: "Senior Gastroenterologist",
  });

  const [address, setAddress] = useState({
    country: "Algeria", city: "Constantine",
    postalCode: "25000", taxId: "ALG-2025-0042",
  });

  const setP = (k: keyof typeof personal) => (e: ChangeEvent<HTMLInputElement>) =>
    setPersonal({ ...personal, [k]: e.target.value });
  const setA = (k: keyof typeof address) => (e: ChangeEvent<HTMLInputElement>) =>
    setAddress({ ...address, [k]: e.target.value });

  return (
    <>
      {/* Profile header card */}
      <div style={{
        background: "#fff", borderRadius: "0.875rem", border: "1px solid #eef0f4",
        padding: "1.75rem 2rem", marginBottom: "1.25rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, #4f8ef7, #38bdf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.5rem", fontWeight: 800, color: "#fff",
              boxShadow: "0 4px 14px #4f8ef730",
            }}>KB</div>
            <button type="button" onClick={() => fileRef.current?.click()} style={{
              position: "absolute", bottom: 0, right: 0,
              width: 24, height: 24, borderRadius: "50%",
              background: "#4f8ef7", border: "2px solid #fff",
              cursor: "pointer", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} />
          </div>
          <div>
            <h2 style={{ margin: "0 0 0.2rem", fontSize: "1.1rem", fontWeight: 700, color: "#1a1d23" }}>
              Dr. {personal.firstName} {personal.lastName}
            </h2>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.82rem", color: "#6b7280" }}>Gastroenterologist · CHU Ibn Badis, Constantine</p>
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em",
              background: "#eff6ff", color: "#4f8ef7",
              padding: "0.2rem 0.65rem", borderRadius: "2rem",
            }}>CLINICIAN</span>
          </div>
        </div>
        <button type="button" onClick={() => setEditing("personal")} style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          background: "none", border: "1px solid #e2e5eb", borderRadius: "0.5rem",
          padding: "0.45rem 1rem", cursor: "pointer", color: "#6b7280",
          fontSize: "0.8rem", fontWeight: 600, fontFamily: "inherit",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
      </div>

      {/* Personal Information */}
      <SectionCard title="Personal Information" onEdit={() => setEditing(editing === "personal" ? null : "personal")}>
        {editing === "personal" ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <InputField label="First Name" value={personal.firstName} onChange={setP("firstName")} />
              <InputField label="Last Name" value={personal.lastName} onChange={setP("lastName")} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <InputField label="Email Address" type="email" value={personal.email} onChange={setP("email")} />
              <InputField label="Phone" value={personal.phone} onChange={setP("phone")} />
            </div>
            <InputField label="Bio / Title" value={personal.bio} onChange={setP("bio")} />
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <button type="button" onClick={() => setEditing(null)} style={{
                background: "#4f8ef7", color: "#fff", border: "none", borderRadius: "0.5rem",
                padding: "0.6rem 1.4rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", fontFamily: "inherit",
              }}>Save Changes</button>
              <button type="button" onClick={() => setEditing(null)} style={{
                background: "none", color: "#6b7280", border: "1px solid #e2e5eb", borderRadius: "0.5rem",
                padding: "0.6rem 1.1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", fontFamily: "inherit",
              }}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem 2rem", marginBottom: "1.1rem" }}>
              <InfoField label="First Name" value={personal.firstName} />
              <InfoField label="Last Name" value={personal.lastName} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem 2rem", marginBottom: "1.1rem" }}>
              <InfoField label="Email address" value={personal.email} />
              <InfoField label="Phone" value={personal.phone} />
            </div>
            <InfoField label="Bio" value={personal.bio} />
          </>
        )}
      </SectionCard>

      {/* Address */}
      <SectionCard title="Address" onEdit={() => setEditing(editing === "address" ? null : "address")}>
        {editing === "address" ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <InputField label="Country" value={address.country} onChange={setA("country")} />
              <InputField label="City / State" value={address.city} onChange={setA("city")} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <InputField label="Postal Code" value={address.postalCode} onChange={setA("postalCode")} />
              <InputField label="Tax ID" value={address.taxId} onChange={setA("taxId")} />
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <button type="button" onClick={() => setEditing(null)} style={{
                background: "#4f8ef7", color: "#fff", border: "none", borderRadius: "0.5rem",
                padding: "0.6rem 1.4rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", fontFamily: "inherit",
              }}>Save Changes</button>
              <button type="button" onClick={() => setEditing(null)} style={{
                background: "none", color: "#6b7280", border: "1px solid #e2e5eb", borderRadius: "0.5rem",
                padding: "0.6rem 1.1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", fontFamily: "inherit",
              }}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem 2rem", marginBottom: "1.1rem" }}>
              <InfoField label="Country" value={address.country} />
              <InfoField label="City / State" value={address.city} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem 2rem" }}>
              <InfoField label="Postal Code" value={address.postalCode} />
              <InfoField label="Tax ID" value={address.taxId} />
            </div>
          </>
        )}
      </SectionCard>
    </>
  );
}

function SecurityTab() {
  const [pw, setPw] = useState({ current: "", newPw: "", confirm: "" });
  const [twoFA, setTwoFA] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (k: keyof typeof pw) => (e: ChangeEvent<HTMLInputElement>) => setPw({ ...pw, [k]: e.target.value });

  return (
    <>
      <SectionCard title="Change Password">
        <InputField label="Current Password" type="password" value={pw.current} onChange={set("current")} placeholder="••••••••" />
        <InputField label="New Password" type="password" value={pw.newPw} onChange={set("newPw")} placeholder="••••••••" />
        <InputField label="Confirm New Password" type="password" value={pw.confirm} onChange={set("confirm")} placeholder="••••••••" />
        {pw.newPw && pw.confirm && pw.newPw !== pw.confirm && (
          <p style={{ color: "#ef4444", fontSize: "0.78rem", marginBottom: "0.75rem" }}>⚠ Passwords do not match.</p>
        )}
        <button type="button" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} style={{
          background: saved ? "#10b981" : "#4f8ef7", color: "#fff", border: "none",
          borderRadius: "0.5rem", padding: "0.6rem 1.4rem", cursor: "pointer",
          fontWeight: 600, fontSize: "0.85rem", fontFamily: "inherit", transition: "background 0.3s",
        }}>
          {saved ? "✓ Saved!" : "Update Password"}
        </button>
      </SectionCard>

      <SectionCard title="Two-Factor Authentication">
        <Toggle checked={twoFA} onChange={setTwoFA} label="Enable 2FA" description="Secure your account with an authenticator app." />
        {twoFA && (
          <div style={{ marginTop: "1rem", background: "#eff6ff", borderRadius: "0.6rem", padding: "1rem", fontSize: "0.85rem", color: "#4f8ef7" }}>
            📲 Scan with Google Authenticator or Authy
            <div style={{ width: 110, height: 110, background: "#dbeafe", borderRadius: "0.5rem", margin: "0.75rem auto 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", color: "#93c5fd" }}>QR Code</div>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Active Sessions">
        {[
          { device: "Chrome – Windows 11", location: "Constantine, Algeria", active: true, time: "Now" },
          { device: "Safari – iPhone 15", location: "Algiers, Algeria", active: false, time: "3 days ago" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 0", borderBottom: i === 0 ? "1px solid #f3f4f6" : "none" }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "0.88rem", color: "#1a1d23" }}>{s.device}</p>
              <p style={{ margin: "0.15rem 0 0", fontSize: "0.75rem", color: "#9ca3af" }}>{s.location} · {s.time}</p>
            </div>
            {s.active
              ? <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10b981", background: "#d1fae5", padding: "0.2rem 0.65rem", borderRadius: "2rem" }}>Active now</span>
              : <button type="button" style={{ fontSize: "0.75rem", color: "#ef4444", background: "none", border: "1px solid #fecaca", borderRadius: "0.4rem", padding: "0.25rem 0.65rem", cursor: "pointer", fontFamily: "inherit" }}>Revoke</button>
            }
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function NotificationsTab() {
  const [n, setN] = useState({ critical: true, analysis: true, report: true, weekly: false, patient: true, updates: false });
  const toggle = (k: keyof typeof n) => setN({ ...n, [k]: !n[k] });

  return (
    <>
      <SectionCard title="In-App Notifications">
        <Toggle checked={n.critical} onChange={() => toggle("critical")} label="Critical Findings" description="Alert when AI detects high-risk lesions." />
        <Toggle checked={n.analysis} onChange={() => toggle("analysis")} label="Analysis Complete" description="Notify when an AI analysis finishes." />
        <Toggle checked={n.report} onChange={() => toggle("report")} label="Report Ready" description="Alert when a report is ready for review." />
      </SectionCard>
      <SectionCard title="Email Notifications">
        <Toggle checked={n.patient} onChange={() => toggle("patient")} label="Patient Updates" description="Email when a patient record is modified." />
        <Toggle checked={n.weekly} onChange={() => toggle("weekly")} label="Weekly Summary" description="Weekly digest of your activity." />
        <Toggle checked={n.updates} onChange={() => toggle("updates")} label="System Updates" description="News about GastroVisIA new features." />
      </SectionCard>
    </>
  );
}

function BillingTab() {
  return (
    <SectionCard title="Billing Information">
      <div style={{ textAlign: "center", padding: "2rem 0", color: "#9ca3af" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem", display: "block" }}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <p style={{ margin: "0 0 0.5rem", fontWeight: 600, color: "#6b7280" }}>No billing info yet</p>
        <p style={{ margin: "0 0 1.5rem", fontSize: "0.82rem" }}>Your institution plan is managed by the administrator.</p>
        <button type="button" style={{ background: "#4f8ef7", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.6rem 1.4rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", fontFamily: "inherit" }}>
          Contact Admin
        </button>
      </div>
    </SectionCard>
  );
}

function DataExportTab() {
  return (
    <SectionCard title="Export Your Data">
      <p style={{ fontSize: "0.88rem", color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        Download a complete archive of your GastroVisIA account data including all analyses, reports, and patient records you have access to.
      </p>
      {[
        { label: "Full Account Export", desc: "All data, analyses, reports, settings", icon: "📦" },
        { label: "Analyses Only", desc: "All AI analysis results and images", icon: "🔬" },
        { label: "Reports Only", desc: "All generated medical reports (PDF)", icon: "📄" },
      ].map((item) => (
        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "0.88rem", color: "#1a1d23" }}>{item.label}</p>
              <p style={{ margin: "0.15rem 0 0", fontSize: "0.75rem", color: "#9ca3af" }}>{item.desc}</p>
            </div>
          </div>
          <button type="button" style={{ background: "none", border: "1px solid #e2e5eb", borderRadius: "0.5rem", padding: "0.4rem 0.9rem", cursor: "pointer", color: "#6b7280", fontSize: "0.78rem", fontWeight: 600, fontFamily: "inherit" }}>
            Request
          </button>
        </div>
      ))}
    </SectionCard>
  );
}

function DeleteTab() {
  const [confirm, setConfirm] = useState("");
  return (
    <div style={{ background: "#fff", borderRadius: "0.875rem", border: "1px solid #fecaca", padding: "1.75rem 2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
          </svg>
        </div>
        <h3 style={{ margin: 0, color: "#ef4444", fontSize: "1rem", fontWeight: 700 }}>Delete Account</h3>
      </div>
      <p style={{ fontSize: "0.88rem", color: "#6b7280", marginBottom: "1.25rem", lineHeight: 1.6 }}>
        This action is <strong style={{ color: "#1a1d23" }}>permanent and irreversible</strong>. All your data including analyses, reports, and patient associations will be deleted immediately.
      </p>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.4rem" }}>
        Type <strong style={{ color: "#ef4444" }}>DELETE</strong> to confirm
      </label>
      <input
        value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Type DELETE here"
        style={{ width: "100%", boxSizing: "border-box", border: "1px solid #fecaca", borderRadius: "0.55rem", padding: "0.65rem 0.9rem", fontSize: "0.88rem", color: "#1a1d23", background: "#fff9f9", outline: "none", fontFamily: "inherit", marginBottom: "1.25rem" }}
      />
      <button type="button" disabled={confirm !== "DELETE"} style={{
        background: confirm === "DELETE" ? "#ef4444" : "#f3f4f6",
        color: confirm === "DELETE" ? "#fff" : "#9ca3af",
        border: "none", borderRadius: "0.5rem", padding: "0.65rem 1.5rem",
        cursor: confirm === "DELETE" ? "pointer" : "not-allowed",
        fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit", transition: "all 0.2s",
      }}>
        Permanently Delete Account
      </button>
    </div>
  );
}

// ─── Nav items ─────────────────────────────────────────────────────────────────
const navItems: { id: TabId; label: string; danger?: boolean }[] = [
  { id: "profile", label: "My Profile" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing" },
  { id: "data-export", label: "Data Export" },
  { id: "delete", label: "Delete Account", danger: true },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const tabContent: Record<TabId, React.ReactNode> = {
    profile: <ProfileTab />,
    security: <SecurityTab />,
    notifications: <NotificationsTab />,
    billing: <BillingTab />,
    "data-export": <DataExportTab />,
    delete: <DeleteTab />,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f4f6f9; font-family: 'DM Sans', sans-serif; min-height: 100vh; color: #1a1d23; }
        .account-wrap { max-width: 1020px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }
        .account-title { font-size: 1.6rem; font-weight: 800; color: #1a1d23; letter-spacing: -0.03em; margin-bottom: 2rem; }
        .account-layout { display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem; align-items: start; }
        .account-sidebar { background: #fff; border: 1px solid #eef0f4; border-radius: 0.875rem; padding: 0.5rem; position: sticky; top: 1.5rem; }
        .nav-item { display: block; width: 100%; padding: 0.65rem 1rem; border: none; border-radius: 0.5rem; background: transparent; text-align: left; font-size: 0.875rem; font-weight: 500; color: #6b7280; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .nav-item:hover { background: #f4f6f9; color: #1a1d23; }
        .nav-item.active { background: #eff6ff; color: #4f8ef7; font-weight: 700; }
        .nav-item.danger { color: #ef4444; }
        .nav-item.danger:hover, .nav-item.danger.active { background: #fee2e2; color: #ef4444; }
        .nav-divider { height: 1px; background: #f3f4f6; margin: 0.4rem 0.5rem; }
        @media (max-width: 640px) {
          .account-layout { grid-template-columns: 1fr; }
          .account-sidebar { position: static; display: flex; flex-wrap: wrap; gap: 0.25rem; }
          .nav-item { flex: 1 1 auto; text-align: center; }
        }
      `}</style>

      <div className="account-wrap">
        <h1 className="account-title">Account Settings</h1>

        <div className="account-layout">
          {/* Sidebar */}
          <nav className="account-sidebar">
            {navItems.map((item, i) => (
              <React.Fragment key={item.id}>
                {i === navItems.length - 1 && <div className="nav-divider" />}
                <button
                  type="button"
                  className={`nav-item${activeTab === item.id ? " active" : ""}${item.danger ? " danger" : ""}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </nav>

          {/* Content */}
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1d23", marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>
              {navItems.find(n => n.id === activeTab)?.label}
            </h2>
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </>
  );
}