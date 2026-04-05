"use client";

import React, { useState, ChangeEvent } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type TabId = "ai-model" | "appearance" | "language" | "integrations" | "audit" | "storage";

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}

interface SelectRowProps {
  label: string;
  description?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  last?: boolean;
}

interface SliderRowProps {
  label: string;
  description?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  last?: boolean;
}

interface SectionCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: string;
}

interface AuditEntry {
  id: number;
  user: string;
  action: string;
  target: string;
  date: string;
  time: string;
  ip: string;
  type: "analysis" | "auth" | "patient" | "settings" | "report";
}

// ─── Mock Audit Data ───────────────────────────────────────────────────────────
const auditLog: AuditEntry[] = [
  { id: 1, user: "Dr. K. Boumediene", action: "Ran AI analysis", target: "Patient #1042 – Ahmed Benali", date: "2025-04-03", time: "09:14", ip: "192.168.1.12", type: "analysis" },
  { id: 2, user: "Dr. K. Boumediene", action: "Logged in", target: "Chrome – Windows 11", date: "2025-04-03", time: "09:10", ip: "192.168.1.12", type: "auth" },
  { id: 3, user: "Admin", action: "Added new patient", target: "Fatima Khaled", date: "2025-04-02", time: "16:45", ip: "10.0.0.5", type: "patient" },
  { id: 4, user: "Dr. K. Boumediene", action: "Generated report", target: "Colonoscopy – Omar Mansouri", date: "2025-04-02", time: "14:30", ip: "192.168.1.12", type: "report" },
  { id: 5, user: "Admin", action: "Changed AI model", target: "CNN → ViT Hybrid", date: "2025-04-01", time: "11:00", ip: "10.0.0.5", type: "settings" },
  { id: 6, user: "Dr. S. Merazga", action: "Validated AI prediction", target: "Patient #1038 – Leila Bouzid", date: "2025-04-01", time: "10:22", ip: "192.168.1.19", type: "analysis" },
  { id: 7, user: "Dr. K. Boumediene", action: "Updated patient record", target: "Youcef Hamidi", date: "2025-03-31", time: "17:05", ip: "192.168.1.12", type: "patient" },
  { id: 8, user: "Admin", action: "Exported data", target: "Full account archive", date: "2025-03-30", time: "08:50", ip: "10.0.0.5", type: "settings" },
];

const auditTypeStyle: Record<AuditEntry["type"], { color: string; bg: string; label: string }> = {
  analysis: { color: "#4f8ef7", bg: "#eff6ff", label: "Analysis" },
  auth:     { color: "#6b7280", bg: "#f9fafb", label: "Auth" },
  patient:  { color: "#f97316", bg: "#fff7ed", label: "Patient" },
  settings: { color: "#a855f7", bg: "#faf5ff", label: "Settings" },
  report:   { color: "#22c55e", bg: "#f0fdf4", label: "Report" },
};

// ─── Reusable Row Components ───────────────────────────────────────────────────
function ToggleRow({ label, description, checked, onChange, last }: ToggleRowProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: last ? "none" : "1px solid #f3f4f6" }}>
      <div style={{ flex: 1, paddingRight: "1rem" }}>
        <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#1a1d23" }}>{label}</p>
        {description && <p style={{ margin: "0.2rem 0 0", fontSize: "0.76rem", color: "#9ca3af", lineHeight: 1.5 }}>{description}</p>}
      </div>
      <button type="button" onClick={() => onChange(!checked)} style={{
        width: 42, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
        background: checked ? "#4f8ef7" : "#e2e5eb",
        position: "relative", transition: "background 0.2s", flexShrink: 0,
      }}>
        <span style={{
          position: "absolute", top: 3, left: checked ? 21 : 3,
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          transition: "left 0.2s", display: "block", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </button>
    </div>
  );
}

function SelectRow({ label, description, value, onChange, options, last }: SelectRowProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: last ? "none" : "1px solid #f3f4f6", gap: "1rem" }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#1a1d23" }}>{label}</p>
        {description && <p style={{ margin: "0.2rem 0 0", fontSize: "0.76rem", color: "#9ca3af" }}>{description}</p>}
      </div>
      <select
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        style={{
          border: "1px solid #e2e5eb", borderRadius: "0.5rem", padding: "0.45rem 0.85rem",
          fontSize: "0.82rem", color: "#1a1d23", background: "#fafbfc",
          outline: "none", fontFamily: "inherit", cursor: "pointer", flexShrink: 0,
        }}
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SliderRow({ label, description, value, onChange, min, max, step, unit, last }: SliderRowProps) {
  return (
    <div style={{ padding: "1rem 0", borderBottom: last ? "none" : "1px solid #f3f4f6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
        <div>
          <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#1a1d23" }}>{label}</p>
          {description && <p style={{ margin: "0.15rem 0 0", fontSize: "0.76rem", color: "#9ca3af" }}>{description}</p>}
        </div>
        <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#4f8ef7", background: "#eff6ff", padding: "0.2rem 0.65rem", borderRadius: "2rem", flexShrink: 0 }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#4f8ef7", cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
        <span style={{ fontSize: "0.68rem", color: "#9ca3af" }}>{min}{unit}</span>
        <span style={{ fontSize: "0.68rem", color: "#9ca3af" }}>{max}{unit}</span>
      </div>
    </div>
  );
}

function SectionCard({ title, description, icon, children, badge }: SectionCardProps) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1.75rem 2rem", marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", marginBottom: "1.4rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: "0.55rem", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#4f8ef7", flexShrink: 0 }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h3 style={{ margin: 0, fontSize: "0.975rem", fontWeight: 700, color: "#1a1d23" }}>{title}</h3>
            {badge && <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "#fef3c7", color: "#d97706", padding: "0.15rem 0.55rem", borderRadius: "2rem", letterSpacing: "0.04em" }}>{badge}</span>}
          </div>
          {description && <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "#9ca3af" }}>{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
const Icons = {
  Brain: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z" /></svg>,
  Palette: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
  Globe: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  Link: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
  Shield: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  Database: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
};

// ─── Tab Content Sections ──────────────────────────────────────────────────────
function AIModelTab() {
  const [model, setModel] = useState("ViT Hybrid");
  const [threshold, setThreshold] = useState(75);
  const [sensitivity, setSensitivity] = useState(80);
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [xaiMethod, setXaiMethod] = useState("Grad-CAM");
  const [showXai, setShowXai] = useState(true);
  const [batchSize, setBatchSize] = useState(8);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <SectionCard title="Model Selection" description="Choose the AI architecture used for lesion detection and classification." icon={Icons.Brain}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "0.5rem" }}>
          {["CNN (ResNet-50)", "ViT Hybrid", "EfficientNet"].map(m => (
            <button key={m} type="button" onClick={() => setModel(m)} style={{
              padding: "0.85rem 0.5rem", borderRadius: "0.6rem", cursor: "pointer", fontFamily: "inherit",
              border: model === m ? "2px solid #4f8ef7" : "2px solid #e2e5eb",
              background: model === m ? "#eff6ff" : "#fafbfc",
              color: model === m ? "#4f8ef7" : "#6b7280",
              fontWeight: model === m ? 700 : 500,
              fontSize: "0.82rem", transition: "all 0.15s", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>
                {m === "CNN (ResNet-50)" ? "🧠" : m === "ViT Hybrid" ? "⚡" : "🎯"}
              </div>
              {m}
            </button>
          ))}
        </div>
        <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
          Currently active: <strong style={{ color: "#4f8ef7" }}>{model}</strong>
        </p>
      </SectionCard>

      <SectionCard title="Detection Thresholds" description="Fine-tune confidence and sensitivity for lesion detection." icon={Icons.Brain} badge="CRITICAL">
        <SliderRow label="Confidence Threshold" description="Minimum AI confidence score to flag a finding." value={threshold} onChange={setThreshold} min={50} max={99} step={1} unit="%" />
        <SliderRow label="Sensitivity Level" description="Higher sensitivity detects more findings but may increase false positives." value={sensitivity} onChange={setSensitivity} min={50} max={100} step={5} unit="%" last />
      </SectionCard>

      <SectionCard title="Explainability (XAI)" description="Configure how AI decisions are visualized and explained to clinicians." icon={Icons.Brain}>
        <SelectRow label="XAI Method" description="Technique used to generate visual explanations." value={xaiMethod} onChange={setXaiMethod} options={["Grad-CAM", "LIME", "SHAP", "Grad-CAM++"]} />
        <ToggleRow label="Show XAI Overlay" description="Display heatmap overlays on analysis results by default." checked={showXai} onChange={setShowXai} last />
      </SectionCard>

      <SectionCard title="Processing" description="Control how analyses are batched and triggered." icon={Icons.Brain}>
        <SliderRow label="Batch Size" description="Number of frames processed simultaneously during video analysis." value={batchSize} onChange={setBatchSize} min={1} max={32} step={1} unit=" frames" />
        <ToggleRow label="Auto-Analyze on Upload" description="Automatically start AI analysis when an image or video is uploaded." checked={autoAnalyze} onChange={setAutoAnalyze} last />
      </SectionCard>

      <button type="button" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} style={{
        background: saved ? "#22c55e" : "#4f8ef7", color: "#fff", border: "none",
        borderRadius: "0.55rem", padding: "0.7rem 1.75rem", cursor: "pointer",
        fontWeight: 700, fontSize: "0.88rem", fontFamily: "inherit", transition: "background 0.3s",
      }}>
        {saved ? "✓ Settings Saved" : "Save AI Settings"}
      </button>
    </>
  );
}

function AppearanceTab() {
  const [theme, setTheme] = useState("Light");
  const [density, setDensity] = useState("Comfortable");
  const [fontSize, setFontSize] = useState("Medium");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <SectionCard title="Theme" description="Choose the visual theme for the platform." icon={Icons.Palette}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
          {[
            { name: "Light", preview: ["#f4f6f9", "#fff", "#4f8ef7"] },
            { name: "Dark", preview: ["#0b0f1a", "#111827", "#0ea5e9"] },
            { name: "System", preview: ["#e5e7eb", "#f9fafb", "#6b7280"] },
          ].map(t => (
            <button key={t.name} type="button" onClick={() => setTheme(t.name)} style={{
              padding: "0.85rem", borderRadius: "0.6rem", cursor: "pointer", fontFamily: "inherit",
              border: theme === t.name ? "2px solid #4f8ef7" : "2px solid #e2e5eb",
              background: theme === t.name ? "#eff6ff" : "#fafbfc",
              transition: "all 0.15s",
            }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "0.5rem", justifyContent: "center" }}>
                {t.preview.map((c, i) => <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, border: "1px solid #e2e5eb" }} />)}
              </div>
              <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: theme === t.name ? 700 : 500, color: theme === t.name ? "#4f8ef7" : "#6b7280" }}>{t.name}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Layout & Display" description="Adjust density, font size, and layout preferences." icon={Icons.Palette}>
        <SelectRow label="Layout Density" description="Controls spacing between UI elements." value={density} onChange={setDensity} options={["Compact", "Comfortable", "Spacious"]} />
        <SelectRow label="Font Size" description="Base text size across the platform." value={fontSize} onChange={setFontSize} options={["Small", "Medium", "Large"]} />
        <ToggleRow label="Collapse Sidebar by Default" description="Start with the navigation sidebar minimized." checked={sidebarCollapsed} onChange={setSidebarCollapsed} />
        <ToggleRow label="Enable Animations" description="Smooth transitions and micro-interactions throughout the UI." checked={animations} onChange={setAnimations} last />
      </SectionCard>

      <button type="button" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} style={{
        background: saved ? "#22c55e" : "#4f8ef7", color: "#fff", border: "none",
        borderRadius: "0.55rem", padding: "0.7rem 1.75rem", cursor: "pointer",
        fontWeight: 700, fontSize: "0.88rem", fontFamily: "inherit", transition: "background 0.3s",
      }}>
        {saved ? "✓ Saved" : "Save Appearance"}
      </button>
    </>
  );
}

function LanguageTab() {
  const [lang, setLang] = useState("English");
  const [region, setRegion] = useState("Algeria (DZ)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("24-hour");
  const [currency, setCurrency] = useState("DZD – Algerian Dinar");
  const [saved, setSaved] = useState(false);

  return (
    <>
      <SectionCard title="Language & Region" description="Set your preferred language and regional format." icon={Icons.Globe}>
        <SelectRow label="Interface Language" description="Language used throughout the platform." value={lang} onChange={setLang} options={["English", "French", "Arabic", "Spanish"]} />
        <SelectRow label="Region" description="Your country or region for localized defaults." value={region} onChange={setRegion} options={["Algeria (DZ)", "France (FR)", "Morocco (MA)", "Tunisia (TN)", "USA (US)"]} last />
      </SectionCard>

      <SectionCard title="Date & Time" description="Configure how dates and times are displayed." icon={Icons.Globe}>
        <SelectRow label="Date Format" value={dateFormat} onChange={setDateFormat} options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
        <SelectRow label="Time Format" value={timeFormat} onChange={setTimeFormat} options={["24-hour", "12-hour (AM/PM)"]} last />
      </SectionCard>

      <SectionCard title="Currency" description="Used in billing and export sections." icon={Icons.Globe}>
        <SelectRow label="Currency" value={currency} onChange={setCurrency} options={["DZD – Algerian Dinar", "EUR – Euro", "USD – US Dollar", "GBP – British Pound"]} last />
      </SectionCard>

      <button type="button" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} style={{
        background: saved ? "#22c55e" : "#4f8ef7", color: "#fff", border: "none",
        borderRadius: "0.55rem", padding: "0.7rem 1.75rem", cursor: "pointer",
        fontWeight: 700, fontSize: "0.88rem", fontFamily: "inherit", transition: "background 0.3s",
      }}>
        {saved ? "✓ Saved" : "Save Language Settings"}
      </button>
    </>
  );
}

function IntegrationsTab() {
  const [dicom, setDicom] = useState(false);
  const [hl7, setHl7] = useState(false);
  const [email, setEmail] = useState(true);
  const [webhook, setWebhook] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");

  const integrations = [
    { key: "dicom" as const, label: "DICOM Integration", description: "Connect to hospital DICOM servers to import endoscopy images directly.", status: dicom, setter: setDicom, badge: "Enterprise" },
    { key: "hl7" as const, label: "HL7 / FHIR", description: "Interoperability with hospital information systems (HIS/EMR).", status: hl7, setter: setHl7, badge: "Enterprise" },
    { key: "email" as const, label: "Email (SMTP)", description: "Send reports and alerts via your institution email server.", status: email, setter: setEmail, badge: undefined },
    { key: "webhook" as const, label: "Webhook Notifications", description: "Send real-time HTTP POST events to an external endpoint on key actions.", status: webhook, setter: setWebhook, badge: undefined },
  ];

  return (
    <>
      <SectionCard title="Connected Services" description="Enable and manage external system integrations." icon={Icons.Link}>
        {integrations.map((int, i) => (
          <div key={int.key} style={{ padding: "1rem 0", borderBottom: i < integrations.length - 1 ? "1px solid #f3f4f6" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                  <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#1a1d23" }}>{int.label}</p>
                  {int.badge && <span style={{ fontSize: "0.62rem", fontWeight: 700, background: "#faf5ff", color: "#a855f7", padding: "0.1rem 0.5rem", borderRadius: "2rem" }}>{int.badge}</span>}
                </div>
                <p style={{ margin: 0, fontSize: "0.76rem", color: "#9ca3af", lineHeight: 1.5 }}>{int.description}</p>
              </div>
              <button type="button" onClick={() => int.setter(!int.status)} style={{
                width: 42, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
                background: int.status ? "#4f8ef7" : "#e2e5eb",
                position: "relative", transition: "background 0.2s", flexShrink: 0,
              }}>
                <span style={{ position: "absolute", top: 3, left: int.status ? 21 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", display: "block", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </button>
            </div>
            {int.key === "webhook" && int.status && (
              <div style={{ marginTop: "0.75rem" }}>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.35rem" }}>Webhook URL</label>
                <input
                  value={webhookUrl}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-server.com/webhook"
                  style={{ width: "100%", boxSizing: "border-box", border: "1px solid #e2e5eb", borderRadius: "0.5rem", padding: "0.6rem 0.85rem", fontSize: "0.82rem", color: "#1a1d23", background: "#fafbfc", outline: "none", fontFamily: "inherit" }}
                  onFocus={e => { e.target.style.borderColor = "#4f8ef7"; }}
                  onBlur={e => { e.target.style.borderColor = "#e2e5eb"; }}
                />
              </div>
            )}
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function AuditTab() {
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = typeFilter === "All" ? auditLog : auditLog.filter(a => a.type === typeFilter.toLowerCase());

  return (
    <SectionCard title="Audit Logs" description="Track all actions performed by users on the platform." icon={Icons.Shield}>
      {/* Filter */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {["All", "Analysis", "Auth", "Patient", "Settings", "Report"].map(f => (
          <button key={f} type="button" onClick={() => setTypeFilter(f)} style={{
            padding: "0.35rem 0.85rem", borderRadius: "2rem", border: "none", cursor: "pointer",
            fontFamily: "inherit", fontSize: "0.78rem", fontWeight: 600, transition: "all 0.15s",
            background: typeFilter === f ? "#4f8ef7" : "#f3f4f6",
            color: typeFilter === f ? "#fff" : "#6b7280",
          }}>{f}</button>
        ))}
      </div>

      {/* Log Table */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {filtered.map(entry => {
          const s = auditTypeStyle[entry.type];
          return (
            <div key={entry.id} style={{ display: "flex", alignItems: "center", gap: "0.85rem", padding: "0.85rem 1rem", background: "#f9fafb", borderRadius: "0.6rem", border: "1px solid #f3f4f6" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: s.color, background: s.bg, padding: "0.2rem 0.6rem", borderRadius: "2rem", flexShrink: 0, minWidth: 64, textAlign: "center" }}>{s.label}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#1a1d23" }}>{entry.action}</p>
                <p style={{ margin: "0.12rem 0 0", fontSize: "0.75rem", color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.target}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{entry.user}</p>
                <p style={{ margin: "0.1rem 0 0", fontSize: "0.7rem", color: "#9ca3af" }}>{entry.date} · {entry.time}</p>
              </div>
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "0.68rem", color: "#9ca3af", background: "#f3f4f6", padding: "0.15rem 0.5rem", borderRadius: "0.3rem", fontFamily: "monospace" }}>{entry.ip}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button type="button" style={{
        marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.4rem",
        background: "none", border: "1px solid #e2e5eb", borderRadius: "0.5rem",
        padding: "0.55rem 1.1rem", cursor: "pointer", color: "#6b7280",
        fontSize: "0.82rem", fontWeight: 600, fontFamily: "inherit",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export Audit Log (CSV)
      </button>
    </SectionCard>
  );
}

function StorageTab() {
  const [autoDelete, setAutoDelete] = useState(false);
  const [retentionDays, setRetentionDays] = useState(90);
  const [compression, setCompression] = useState(true);
  const [backupFreq, setBackupFreq] = useState("Weekly");

  const usedGB = 14.3;
  const totalGB = 50;
  const usedPct = (usedGB / totalGB) * 100;

  return (
    <>
      <SectionCard title="Storage Usage" description="Monitor how much storage your data is consuming." icon={Icons.Database}>
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>Used: <strong style={{ color: "#1a1d23" }}>{usedGB} GB</strong></span>
            <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>Total: <strong style={{ color: "#1a1d23" }}>{totalGB} GB</strong></span>
          </div>
          <div style={{ height: 10, background: "#f3f4f6", borderRadius: "2rem", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${usedPct}%`, background: usedPct > 80 ? "#ef4444" : usedPct > 60 ? "#f97316" : "#4f8ef7", borderRadius: "2rem", transition: "width 0.4s" }} />
          </div>
          <p style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.4rem" }}>{(totalGB - usedGB).toFixed(1)} GB remaining ({(100 - usedPct).toFixed(0)}% free)</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.65rem" }}>
          {[
            { label: "Endoscopy Images", size: "8.2 GB", icon: "🔬" },
            { label: "AI Analysis Results", size: "3.7 GB", icon: "🧠" },
            { label: "Medical Reports", size: "2.4 GB", icon: "📄" },
          ].map(item => (
            <div key={item.label} style={{ background: "#f9fafb", borderRadius: "0.6rem", padding: "0.85rem", border: "1px solid #f3f4f6" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "0.35rem" }}>{item.icon}</div>
              <p style={{ margin: "0 0 0.2rem", fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{item.label}</p>
              <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color: "#1a1d23" }}>{item.size}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Data Management" description="Configure retention policies and automatic cleanup." icon={Icons.Database}>
        <ToggleRow label="Auto-Delete Old Data" description="Automatically remove analyses older than the retention period." checked={autoDelete} onChange={setAutoDelete} />
        {autoDelete && (
          <SliderRow label="Retention Period" description="How long to keep analysis data before auto-deletion." value={retentionDays} onChange={setRetentionDays} min={30} max={365} step={30} unit=" days" />
        )}
        <ToggleRow label="Image Compression" description="Compress stored images to save space (lossless)." checked={compression} onChange={setCompression} last />
      </SectionCard>

      <SectionCard title="Backup" description="Configure automatic backup frequency and destination." icon={Icons.Database}>
        <SelectRow label="Backup Frequency" description="How often your data is automatically backed up." value={backupFreq} onChange={setBackupFreq} options={["Daily", "Weekly", "Monthly", "Disabled"]} last />

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.65rem" }}>
          <button type="button" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            background: "#4f8ef7", color: "#fff", border: "none", borderRadius: "0.5rem",
            padding: "0.6rem 1.1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", fontFamily: "inherit",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.51" /></svg>
            Run Backup Now
          </button>
          <button type="button" style={{
            background: "none", color: "#6b7280", border: "1px solid #e2e5eb",
            borderRadius: "0.5rem", padding: "0.6rem 1rem", cursor: "pointer",
            fontWeight: 600, fontSize: "0.82rem", fontFamily: "inherit",
          }}>
            View Backup History
          </button>
        </div>
      </SectionCard>
    </>
  );
}

// ─── Nav Items ─────────────────────────────────────────────────────────────────
const navItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "ai-model",      label: "AI Model",      icon: Icons.Brain },
  { id: "appearance",   label: "Appearance",    icon: Icons.Palette },
  { id: "language",     label: "Language",      icon: Icons.Globe },
  { id: "integrations", label: "Integrations",  icon: Icons.Link },
  { id: "audit",        label: "Audit Logs",    icon: Icons.Shield },
  { id: "storage",      label: "Storage",       icon: Icons.Database },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("ai-model");

  const tabContent: Record<TabId, React.ReactNode> = {
    "ai-model":     <AIModelTab />,
    appearance:     <AppearanceTab />,
    language:       <LanguageTab />,
    integrations:   <IntegrationsTab />,
    audit:          <AuditTab />,
    storage:        <StorageTab />,
  };

  return (
    <div style={{ 
      background: "#f4f6f9", 
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      width: "100%",
      overflowY: "auto", // Force vertical scrolling
      overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }
        html, body {
          height: 100%;
          overflow-y: auto !important; /* Force scroll on html/body */
          overflow-x: hidden;
        }
      `}</style>

      <div style={{ 
        maxWidth: 1020, 
        margin: "0 auto", 
        padding: "2.5rem 1.5rem 4rem",
      }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1d23", letterSpacing: "-0.03em", marginBottom: "2rem" }}>Settings</h1>

        <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: "1.5rem", alignItems: "start" }}>
          {/* Sidebar - removed sticky to avoid issues */}
          <nav style={{ 
            background: "#fff", 
            border: "1px solid #eef0f4", 
            borderRadius: "0.875rem", 
            padding: "0.5rem",
          }}>
            {navItems.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem", width: "100%",
                  padding: "0.65rem 0.9rem", border: "none", borderRadius: "0.5rem",
                  background: activeTab === item.id ? "#eff6ff" : "transparent",
                  textAlign: "left", fontSize: "0.858rem", fontWeight: activeTab === item.id ? 700 : 500,
                  color: activeTab === item.id ? "#4f8ef7" : "#6b7280",
                  cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit"
                }}
                onMouseEnter={e => {
                  if (activeTab !== item.id) {
                    e.currentTarget.style.background = "#f4f6f9";
                    e.currentTarget.style.color = "#1a1d23";
                  }
                }}
                onMouseLeave={e => {
                  if (activeTab !== item.id) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#6b7280";
                  }
                }}
              >
                <span style={{ width: 16, height: 16, flexShrink: 0, opacity: activeTab === item.id ? 1 : 0.7 }}>{item.icon}</span>
                {item.label}
              </button>
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
    </div>
  );
}
