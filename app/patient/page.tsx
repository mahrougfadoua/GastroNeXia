"use client";

import React, { useState, ChangeEvent } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Gender = "Male" | "Female";
type Status = "Active" | "Archived";
type AnalysisType = "analysis" | "report" | "visit";

interface Analysis {
  id: number;
  date: string;
  type: AnalysisType;
  label: string;
  result: string;
  severity: "normal" | "moderate" | "high";
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  age: number;
  gender: Gender;
  phone: string;
  email: string;
  condition: string;
  lastVisit: string;
  status: Status;
  notes: string;
  analyses: Analysis[];
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const mockPatients: Patient[] = [
  {
    id: 1, firstName: "Ahmed", lastName: "Benali", dob: "1978-04-12", age: 46,
    gender: "Male", phone: "+213 555 001 234", email: "a.benali@email.com",
    condition: "Gastric Ulcer", lastVisit: "2025-03-28", status: "Active", notes: "Follow-up required in 3 months.",
    analyses: [
      { id: 1, date: "2025-03-28", type: "analysis", label: "Upper GI Endoscopy", result: "Gastric ulcer detected – 1.2cm", severity: "moderate" },
      { id: 2, date: "2025-03-28", type: "report", label: "Pathology Report", result: "H. pylori positive", severity: "moderate" },
      { id: 3, date: "2024-11-10", type: "visit", label: "Routine Check", result: "Stable condition", severity: "normal" },
    ],
  },
  {
    id: 2, firstName: "Fatima", lastName: "Khaled", dob: "1990-09-05", age: 34,
    gender: "Female", phone: "+213 555 002 567", email: "f.khaled@email.com",
    condition: "Colorectal Polyp", lastVisit: "2025-04-01", status: "Active", notes: "Polypectomy performed. Monitor every 6 months.",
    analyses: [
      { id: 4, date: "2025-04-01", type: "analysis", label: "Colonoscopy", result: "2 polyps removed (5mm, 7mm)", severity: "high" },
      { id: 5, date: "2025-04-01", type: "report", label: "Histopathology", result: "Adenomatous polyps – benign", severity: "moderate" },
    ],
  },
  {
    id: 3, firstName: "Omar", lastName: "Mansouri", dob: "1965-02-20", age: 60,
    gender: "Male", phone: "+213 555 003 890", email: "o.mansouri@email.com",
    condition: "GERD", lastVisit: "2025-02-15", status: "Active", notes: "On PPI therapy. Dietary adjustments recommended.",
    analyses: [
      { id: 6, date: "2025-02-15", type: "analysis", label: "Upper Endoscopy", result: "Esophagitis Grade B", severity: "moderate" },
      { id: 7, date: "2024-08-10", type: "visit", label: "Routine Follow-up", result: "Symptoms improved", severity: "normal" },
    ],
  },
  {
    id: 4, firstName: "Leila", lastName: "Bouzid", dob: "1985-07-30", age: 39,
    gender: "Female", phone: "+213 555 004 123", email: "l.bouzid@email.com",
    condition: "Crohn's Disease", lastVisit: "2025-03-10", status: "Active", notes: "Biologic therapy ongoing.",
    analyses: [
      { id: 8, date: "2025-03-10", type: "analysis", label: "Ileocolonoscopy", result: "Mild inflammation in terminal ileum", severity: "moderate" },
    ],
  },
  {
    id: 5, firstName: "Youcef", lastName: "Hamidi", dob: "1952-11-08", age: 72,
    gender: "Male", phone: "+213 555 005 456", email: "y.hamidi@email.com",
    condition: "Colorectal Cancer", lastVisit: "2025-01-20", status: "Archived", notes: "Post-surgery follow-up completed. Transferred to oncology.",
    analyses: [
      { id: 9, date: "2025-01-20", type: "analysis", label: "Post-op Colonoscopy", result: "No recurrence detected", severity: "normal" },
      { id: 10, date: "2025-01-20", type: "report", label: "Oncology Report", result: "Remission confirmed", severity: "normal" },
    ],
  },
  {
    id: 6, firstName: "Samira", lastName: "Ait", dob: "1995-03-14", age: 30,
    gender: "Female", phone: "+213 555 006 789", email: "s.ait@email.com",
    condition: "IBS", lastVisit: "2025-03-22", status: "Active", notes: "Stress management and dietary fiber increase advised.",
    analyses: [
      { id: 11, date: "2025-03-22", type: "visit", label: "Consultation", result: "IBS-D diagnosis confirmed", severity: "normal" },
    ],
  },
];

const emptyForm = {
  firstName: "", lastName: "", dob: "", gender: "Male" as Gender,
  phone: "", email: "", condition: "", notes: "",
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function initials(p: Patient) { return `${p.firstName[0]}${p.lastName[0]}`; }

const avatarColors = [
  ["#eff6ff", "#4f8ef7"], ["#f0fdf4", "#22c55e"], ["#fff7ed", "#f97316"],
  ["#fdf4ff", "#a855f7"], ["#fff1f2", "#f43f5e"], ["#f0fdfa", "#14b8a6"],
];

function severityStyle(s: Analysis["severity"]) {
  if (s === "high") return { color: "#ef4444", bg: "#fee2e2", label: "High Risk" };
  if (s === "moderate") return { color: "#f97316", bg: "#fff7ed", label: "Moderate" };
  return { color: "#22c55e", bg: "#f0fdf4", label: "Normal" };
}

function typeIcon(t: AnalysisType) {
  if (t === "analysis") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
  if (t === "report") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    </svg>
  );
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ─── Add Patient Modal ─────────────────────────────────────────────────────────
function AddPatientModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Patient) => void }) {
  const [form, setForm] = useState(emptyForm);
  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const inputStyle: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", border: "1px solid #e2e5eb",
    borderRadius: "0.5rem", padding: "0.6rem 0.85rem", fontSize: "0.85rem",
    color: "#1a1d23", background: "#fafbfc", outline: "none", fontFamily: "inherit",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "0.72rem", fontWeight: 600,
    color: "#6b7280", marginBottom: "0.35rem", letterSpacing: "0.01em",
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.dob) return;
    const age = new Date().getFullYear() - new Date(form.dob).getFullYear();
    const newPatient: Patient = {
      id: Date.now(), ...form, gender: form.gender as Gender,
      age, lastVisit: new Date().toISOString().split("T")[0],
      status: "Active", analyses: [],
    };
    onAdd(newPatient);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#fff", borderRadius: "1rem", width: "100%", maxWidth: 520, padding: "2rem", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1a1d23" }}>Add New Patient</h2>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "1.3rem", lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>First Name *</label>
            <input style={inputStyle} value={form.firstName} onChange={set("firstName")} placeholder="First name"
              onFocus={e => { e.target.style.borderColor = "#4f8ef7"; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e5eb"; e.target.style.background = "#fafbfc"; }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Last Name *</label>
            <input style={inputStyle} value={form.lastName} onChange={set("lastName")} placeholder="Last name"
              onFocus={e => { e.target.style.borderColor = "#4f8ef7"; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e5eb"; e.target.style.background = "#fafbfc"; }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Date of Birth *</label>
            <input style={inputStyle} type="date" value={form.dob} onChange={set("dob")}
              onFocus={e => { e.target.style.borderColor = "#4f8ef7"; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e5eb"; e.target.style.background = "#fafbfc"; }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Gender</label>
            <select style={{ ...inputStyle, appearance: "none" }} value={form.gender} onChange={set("gender")}>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Phone</label>
            <input style={inputStyle} value={form.phone} onChange={set("phone")} placeholder="+213 ..."
              onFocus={e => { e.target.style.borderColor = "#4f8ef7"; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e5eb"; e.target.style.background = "#fafbfc"; }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" value={form.email} onChange={set("email")} placeholder="patient@email.com"
              onFocus={e => { e.target.style.borderColor = "#4f8ef7"; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e5eb"; e.target.style.background = "#fafbfc"; }} />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Primary Condition</label>
          <input style={inputStyle} value={form.condition} onChange={set("condition")} placeholder="e.g. Gastric Ulcer, GERD…"
            onFocus={e => { e.target.style.borderColor = "#4f8ef7"; e.target.style.background = "#fff"; }}
            onBlur={e => { e.target.style.borderColor = "#e2e5eb"; e.target.style.background = "#fafbfc"; }} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Clinical Notes</label>
          <textarea style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} rows={3} value={form.notes} onChange={set("notes")} placeholder="Initial observations, treatment notes…"
            onFocus={e => { e.target.style.borderColor = "#4f8ef7"; (e.target as HTMLTextAreaElement).style.background = "#fff"; }}
            onBlur={e => { e.target.style.borderColor = "#e2e5eb"; (e.target as HTMLTextAreaElement).style.background = "#fafbfc"; }} />
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="button" onClick={handleSubmit} style={{
            flex: 1, background: "#4f8ef7", color: "#fff", border: "none",
            borderRadius: "0.5rem", padding: "0.7rem", cursor: "pointer",
            fontWeight: 700, fontSize: "0.88rem", fontFamily: "inherit",
          }}>Add Patient</button>
          <button type="button" onClick={onClose} style={{
            background: "none", color: "#6b7280", border: "1px solid #e2e5eb",
            borderRadius: "0.5rem", padding: "0.7rem 1.2rem", cursor: "pointer",
            fontWeight: 600, fontSize: "0.88rem", fontFamily: "inherit",
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Patient Detail Panel ──────────────────────────────────────────────────────
function PatientDetail({ patient, colorPair, onClose, onArchive }: {
  patient: Patient;
  colorPair: string[];
  onClose: () => void;
  onArchive: (id: number) => void;
}) {
  const [tab, setTab] = useState<"info" | "history">("info");

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: colorPair[0], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 800, color: colorPair[1], flexShrink: 0 }}>
            {initials(patient)}
          </div>
          <div>
            <h2 style={{ margin: "0 0 0.2rem", fontSize: "1.05rem", fontWeight: 700, color: "#1a1d23" }}>
              {patient.firstName} {patient.lastName}
            </h2>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>
              {patient.age} yrs · {patient.gender} · {patient.condition}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.65rem", borderRadius: "2rem",
            background: patient.status === "Active" ? "#f0fdf4" : "#f9fafb",
            color: patient.status === "Active" ? "#22c55e" : "#9ca3af",
          }}>{patient.status}</span>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "1.2rem", lineHeight: 1, padding: "0.2rem" }}>×</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #f3f4f6", padding: "0 1.75rem" }}>
        {(["info", "history"] as const).map(t => (
          <button key={t} type="button" onClick={() => setTab(t)} style={{
            background: "none", border: "none", borderBottom: tab === t ? "2px solid #4f8ef7" : "2px solid transparent",
            padding: "0.85rem 0", marginRight: "1.5rem", cursor: "pointer",
            fontSize: "0.85rem", fontWeight: tab === t ? 700 : 500,
            color: tab === t ? "#4f8ef7" : "#6b7280", fontFamily: "inherit",
            transition: "all 0.15s",
          }}>
            {t === "info" ? "Patient Info" : "Analysis History"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem 1.75rem" }}>
        {tab === "info" ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem 2rem", marginBottom: "1.25rem" }}>
              {[
                ["Date of Birth", patient.dob],
                ["Age", `${patient.age} years old`],
                ["Gender", patient.gender],
                ["Phone", patient.phone],
                ["Email", patient.email],
                ["Last Visit", patient.lastVisit],
              ].map(([label, value]) => (
                <div key={label}>
                  <p style={{ margin: "0 0 0.25rem", fontSize: "0.7rem", color: "#9ca3af", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</p>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#1a1d23", fontWeight: 500 }}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "#f9fafb", borderRadius: "0.6rem", padding: "1rem", marginBottom: "1.25rem" }}>
              <p style={{ margin: "0 0 0.4rem", fontSize: "0.7rem", color: "#9ca3af", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Clinical Notes</p>
              <p style={{ margin: 0, fontSize: "0.87rem", color: "#374151", lineHeight: 1.6 }}>{patient.notes || "No notes added."}</p>
            </div>

            <div style={{ display: "flex", gap: "0.65rem" }}>
              <button type="button" style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                background: "#4f8ef7", color: "#fff", border: "none", borderRadius: "0.5rem",
                padding: "0.6rem 1.1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", fontFamily: "inherit",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                New Analysis
              </button>
              <button type="button" onClick={() => onArchive(patient.id)} style={{
                background: "none", color: "#6b7280", border: "1px solid #e2e5eb",
                borderRadius: "0.5rem", padding: "0.6rem 1rem", cursor: "pointer",
                fontWeight: 600, fontSize: "0.82rem", fontFamily: "inherit",
              }}>
                {patient.status === "Active" ? "Archive" : "Restore"}
              </button>
            </div>
          </>
        ) : (
          <div>
            {patient.analyses.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem 0", color: "#9ca3af" }}>
                <p style={{ fontWeight: 600, color: "#6b7280" }}>No analyses yet</p>
                <p style={{ fontSize: "0.82rem", marginTop: "0.25rem" }}>Start a new analysis for this patient.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {patient.analyses.map(a => {
                  const sev = severityStyle(a.severity);
                  const typeColor = a.type === "analysis" ? "#4f8ef7" : a.type === "report" ? "#a855f7" : "#f97316";
                  return (
                    <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", background: "#f9fafb", borderRadius: "0.6rem", border: "1px solid #f3f4f6" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "0.4rem", background: typeColor + "15", display: "flex", alignItems: "center", justifyContent: "center", color: typeColor, flexShrink: 0 }}>
                        {typeIcon(a.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#1a1d23" }}>{a.label}</p>
                        <p style={{ margin: "0.15rem 0 0", fontSize: "0.75rem", color: "#6b7280" }}>{a.result}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: sev.color, background: sev.bg, padding: "0.15rem 0.55rem", borderRadius: "2rem" }}>{sev.label}</span>
                        <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>{a.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Archived">("All");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [showModal, setShowModal] = useState(false);

  const filtered = patients.filter(p => {
    const matchSearch = `${p.firstName} ${p.lastName} ${p.condition}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const selected = patients.find(p => p.id === selectedId) ?? null;
  const selectedIndex = patients.findIndex(p => p.id === selectedId);

  const handleAdd = (p: Patient) => setPatients([p, ...patients]);
  const handleArchive = (id: number) => {
    setPatients(patients.map(p => p.id === id ? { ...p, status: p.status === "Active" ? "Archived" : "Active" } : p));
  };
  const handleDelete = (id: number) => {
    setPatients(patients.filter(p => p.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: auto !important; overflow-y: auto !important; }
        body { background: #f4f6f9; font-family: 'DM Sans', sans-serif; min-height: 100vh; color: #1a1d23; }
        .patients-wrap { max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; overflow: visible; }
        .patients-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem; }
        .patients-title { font-size: 1.6rem; font-weight: 800; color: #1a1d23; letter-spacing: -0.03em; }
        .patients-title span { font-size: 0.9rem; font-weight: 600; color: #9ca3af; margin-left: 0.6rem; vertical-align: middle; }
        .add-btn { display: flex; align-items: center; gap: 0.45rem; background: #4f8ef7; color: #fff; border: none; border-radius: 0.55rem; padding: 0.65rem 1.25rem; cursor: pointer; font-weight: 700; font-size: 0.85rem; font-family: 'DM Sans', sans-serif; transition: background 0.15s; }
        .add-btn:hover { background: #3b7de8; }
        .controls { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; align-items: center; }
        .search-box { display: flex; align-items: center; gap: 0.5rem; background: #fff; border: 1px solid #e2e5eb; border-radius: 0.55rem; padding: 0.55rem 0.9rem; flex: 1; min-width: 200px; transition: border-color 0.15s; }
        .search-box:focus-within { border-color: #4f8ef7; }
        .search-box input { border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; color: #1a1d23; background: transparent; width: 100%; }
        .search-box input::placeholder { color: #9ca3af; }
        .filter-btns { display: flex; background: #fff; border: 1px solid #e2e5eb; border-radius: 0.55rem; overflow: hidden; }
        .filter-btn { padding: 0.55rem 1rem; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 600; color: #6b7280; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
        .filter-btn.active { background: #4f8ef7; color: #fff; }
        .layout { display: grid; grid-template-columns: 340px 1fr; gap: 1.25rem; align-items: start; }
        .patient-list { background: #fff; border: 1px solid #eef0f4; border-radius: 0.875rem; overflow: hidden; }
        .list-header { padding: 1rem 1.25rem; border-bottom: 1px solid #f3f4f6; }
        .list-header p { font-size: 0.75rem; color: #9ca3af; font-weight: 600; }
        .patient-card { display: flex; align-items: center; gap: 0.85rem; padding: 0.9rem 1.25rem; cursor: pointer; border-bottom: 1px solid #f9fafb; transition: background 0.12s; position: relative; }
        .patient-card:hover { background: #f9fafb; }
        .patient-card.active { background: #eff6ff; }
        .patient-card:last-child { border-bottom: none; }
        .patient-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.88rem; font-weight: 800; flex-shrink: 0; }
        .patient-info { flex: 1; min-width: 0; }
        .patient-name { font-size: 0.88rem; font-weight: 700; color: #1a1d23; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .patient-meta { font-size: 0.75rem; color: #6b7280; margin-top: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .patient-badge { font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 2rem; white-space: nowrap; }
        .delete-btn { background: none; border: none; cursor: pointer; color: #d1d5db; padding: 0.25rem; display: flex; align-items: center; opacity: 0; transition: opacity 0.15s, color 0.15s; }
        .patient-card:hover .delete-btn { opacity: 1; }
        .delete-btn:hover { color: #ef4444; }
        .empty-state { padding: 3rem 1.5rem; text-align: center; color: #9ca3af; }
        .empty-state p:first-child { font-weight: 600; color: #6b7280; margin-bottom: 0.35rem; }
        @media (max-width: 768px) {
          .layout { grid-template-columns: 1fr; }
        }
      `}</style>

      {showModal && <AddPatientModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      <div className="patients-wrap">
        {/* Header */}
        <div className="patients-header">
          <h1 className="patients-title">
            Patients
            <span>{patients.filter(p => p.status === "Active").length} active</span>
          </h1>
          <button type="button" className="add-btn" onClick={() => setShowModal(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Patient
          </button>
        </div>

        {/* Controls */}
        <div className="controls">
          <div className="search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or condition…" />
          </div>
          <div className="filter-btns">
            {(["All", "Active", "Archived"] as const).map(f => (
              <button key={f} type="button" className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="layout">
          {/* Patient List */}
          <div className="patient-list">
            <div className="list-header">
              <p>{filtered.length} patient{filtered.length !== 1 ? "s" : ""} found</p>
            </div>
            {filtered.length === 0 ? (
              <div className="empty-state">
                <p>No patients found</p>
                <p style={{ fontSize: "0.82rem" }}>Try adjusting your search or filter.</p>
              </div>
            ) : (
              filtered.map((p, i) => {
                const [bg, fg] = avatarColors[i % avatarColors.length];
                const isActive = selectedId === p.id;
                return (
                  <div key={p.id} className={`patient-card${isActive ? " active" : ""}`} onClick={() => setSelectedId(p.id)}>
                    <div className="patient-avatar" style={{ background: bg, color: fg }}>{initials(p)}</div>
                    <div className="patient-info">
                      <div className="patient-name">{p.firstName} {p.lastName}</div>
                      <div className="patient-meta">{p.age} yrs · {p.condition}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem" }}>
                      <span className="patient-badge" style={{
                        background: p.status === "Active" ? "#f0fdf4" : "#f9fafb",
                        color: p.status === "Active" ? "#22c55e" : "#9ca3af",
                      }}>{p.status}</span>
                      <button type="button" className="delete-btn" onClick={e => { e.stopPropagation(); handleDelete(p.id); }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Detail Panel */}
          <div>
            {selected ? (
              <PatientDetail
                patient={selected}
                colorPair={avatarColors[selectedIndex % avatarColors.length]}
                onClose={() => setSelectedId(null)}
                onArchive={handleArchive}
              />
            ) : (
              <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "4rem 2rem", textAlign: "center", color: "#9ca3af" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e2e5eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem", display: "block" }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                <p style={{ fontWeight: 600, color: "#6b7280", marginBottom: "0.35rem" }}>No patient selected</p>
                <p style={{ fontSize: "0.82rem" }}>Click on a patient from the list to view their details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}