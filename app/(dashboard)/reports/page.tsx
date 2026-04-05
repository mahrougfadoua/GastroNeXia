"use client";

import React, { useState, ChangeEvent } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ReportStatus   = "draft" | "validated" | "sent";
type ReportType     = "endoscopy" | "colonoscopy" | "pathology" | "followup" | "capsule";
type Severity       = "normal" | "moderate" | "high";
type SortKey        = "date" | "patient" | "status" | "type";
type FilterStatus   = "All" | ReportStatus;

interface Finding {
  label: string;
  detail: string;
  severity: Severity;
}

interface Report {
  id: number;
  title: string;
  patient: string;
  patientId: number;
  patientAge: number;
  patientGender: "Male" | "Female";
  doctor: string;
  date: string;
  type: ReportType;
  status: ReportStatus;
  pages: number;
  aiModel: string;
  xaiMethod: string;
  overallRisk: Severity;
  summary: string;
  recommendation: string;
  findings: Finding[];
  tags: string[];
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const mockReports: Report[] = [
  {
    id: 1001, title: "Upper GI Endoscopy – March 2025",
    patient: "Ahmed Benali", patientId: 1042, patientAge: 46, patientGender: "Male",
    doctor: "Dr. K. Boumediene", date: "2025-03-28", type: "endoscopy",
    status: "validated", pages: 4, aiModel: "ViT Hybrid", xaiMethod: "Grad-CAM",
    overallRisk: "moderate",
    summary: "Active gastric ulcer detected in the antrum measuring 1.2 cm with surrounding mucosal inflammation. H. pylori infection confirmed via rapid urease test.",
    recommendation: "Initiate triple therapy: Omeprazole 20mg + Amoxicillin 1g + Clarithromycin 500mg for 14 days. Schedule follow-up endoscopy in 6–8 weeks to confirm healing.",
    findings: [
      { label: "Gastric Ulcer", detail: "1.2 cm active ulcer in gastric antrum", severity: "moderate" },
      { label: "Mucosal Inflammation", detail: "Erythema and edema surrounding ulcer bed", severity: "moderate" },
      { label: "H. pylori", detail: "Rapid urease test positive", severity: "moderate" },
      { label: "Fundus", detail: "Normal mucosa, no lesions detected", severity: "normal" },
    ],
    tags: ["Gastric Ulcer", "H. pylori", "Triple Therapy"],
  },
  {
    id: 1002, title: "Colonoscopy – Polypectomy Report",
    patient: "Fatima Khaled", patientId: 1043, patientAge: 34, patientGender: "Female",
    doctor: "Dr. K. Boumediene", date: "2025-04-01", type: "colonoscopy",
    status: "sent", pages: 5, aiModel: "ViT Hybrid", xaiMethod: "SHAP",
    overallRisk: "high",
    summary: "Two adenomatous polyps identified and removed during colonoscopy. Polyp A (5mm, sigmoid colon) and Polyp B (7mm, descending colon). No signs of malignancy on macroscopic examination.",
    recommendation: "Histopathology follow-up in 7–10 days. Repeat colonoscopy in 3 years as per surveillance guidelines. Patient to be counseled on dietary fiber and colorectal cancer risk.",
    findings: [
      { label: "Polyp A – Sigmoid", detail: "5mm sessile polyp, removed via cold snare", severity: "high" },
      { label: "Polyp B – Descending", detail: "7mm pedunculated polyp, removed via hot biopsy", severity: "high" },
      { label: "Rectal Mucosa", detail: "Normal, no inflammation or lesions", severity: "normal" },
    ],
    tags: ["Polypectomy", "Adenoma", "Surveillance"],
  },
  {
    id: 1003, title: "Upper Endoscopy – GERD Follow-up",
    patient: "Omar Mansouri", patientId: 1044, patientAge: 60, patientGender: "Male",
    doctor: "Dr. S. Merazga", date: "2025-02-15", type: "endoscopy",
    status: "sent", pages: 3, aiModel: "CNN ResNet-50", xaiMethod: "LIME",
    overallRisk: "moderate",
    summary: "Esophagitis Grade B identified with linear erosions in the lower esophagus. No Barrett's changes or malignant transformation observed. Hiatal hernia of 2cm confirmed.",
    recommendation: "Continue PPI therapy (Omeprazole 40mg once daily). Lifestyle modifications: elevate bed head, avoid late meals, reduce caffeine. Repeat endoscopy in 12 months.",
    findings: [
      { label: "Esophagitis Grade B", detail: "Linear erosions <5mm, non-confluent", severity: "moderate" },
      { label: "Hiatal Hernia", detail: "2cm sliding hiatal hernia confirmed", severity: "moderate" },
      { label: "Gastroesophageal Junction", detail: "Z-line intact, no Barrett's changes", severity: "normal" },
    ],
    tags: ["GERD", "Esophagitis", "PPI Therapy"],
  },
  {
    id: 1004, title: "Ileocolonoscopy – Crohn's Assessment",
    patient: "Leila Bouzid", patientId: 1045, patientAge: 39, patientGender: "Female",
    doctor: "Dr. K. Boumediene", date: "2025-03-10", type: "colonoscopy",
    status: "validated", pages: 4, aiModel: "ViT Hybrid", xaiMethod: "Grad-CAM",
    overallRisk: "moderate",
    summary: "Mild active inflammation noted in the terminal ileum consistent with Crohn's disease activity. Scattered aphthous ulcers observed. No strictures or fistulas identified.",
    recommendation: "Continue biologic therapy (Adalimumab). Consider steroid taper for acute flare. Repeat ileocolonoscopy in 6 months to assess treatment response.",
    findings: [
      { label: "Terminal Ileum", detail: "Mild active inflammation, aphthous ulcers", severity: "moderate" },
      { label: "Ileocecal Valve", detail: "Mildly thickened, no obstruction", severity: "moderate" },
      { label: "Colon", detail: "Normal mucosa throughout", severity: "normal" },
    ],
    tags: ["Crohn's Disease", "Biologic Therapy", "Ileitis"],
  },
  {
    id: 1005, title: "Post-op Colonoscopy – Oncology",
    patient: "Youcef Hamidi", patientId: 1046, patientAge: 72, patientGender: "Male",
    doctor: "Dr. S. Merazga", date: "2025-01-20", type: "colonoscopy",
    status: "sent", pages: 3, aiModel: "EfficientNet", xaiMethod: "Grad-CAM",
    overallRisk: "normal",
    summary: "Post-surgical surveillance colonoscopy performed. Anastomosis site appears well-healed with no signs of local recurrence. Colonic mucosa normal throughout.",
    recommendation: "Remission confirmed. Continue annual surveillance colonoscopy. Transfer to oncology outpatient clinic for systemic follow-up. No further GI intervention required.",
    findings: [
      { label: "Anastomosis Site", detail: "Well-healed, no recurrence detected", severity: "normal" },
      { label: "Remaining Colon", detail: "Normal mucosa, no polyps or masses", severity: "normal" },
    ],
    tags: ["Post-op", "Remission", "Surveillance"],
  },
  {
    id: 1006, title: "Routine Endoscopy – IBS Consultation",
    patient: "Samira Ait", patientId: 1047, patientAge: 30, patientGender: "Female",
    doctor: "Dr. K. Boumediene", date: "2025-03-22", type: "endoscopy",
    status: "draft", pages: 2, aiModel: "CNN ResNet-50", xaiMethod: "LIME",
    overallRisk: "normal",
    summary: "Normal upper GI endoscopy. No structural abnormality identified. Findings consistent with functional gastrointestinal disorder (IBS-D).",
    recommendation: "No further endoscopic intervention required. Recommend low-FODMAP diet, stress management, and regular follow-up with gastroenterologist every 6 months.",
    findings: [
      { label: "Esophagus", detail: "Normal mucosa, no inflammation", severity: "normal" },
      { label: "Stomach", detail: "Normal gastric folds, no pathology", severity: "normal" },
      { label: "Duodenum", detail: "Normal villi, no lesions", severity: "normal" },
    ],
    tags: ["IBS", "Functional GI", "Normal Findings"],
  },
  {
    id: 1007, title: "Liver Assessment – Cirrhosis Monitoring",
    patient: "Karim Ziani", patientId: 1048, patientAge: 54, patientGender: "Male",
    doctor: "Dr. K. Boumediene", date: "2025-03-05", type: "endoscopy",
    status: "validated", pages: 5, aiModel: "ViT Hybrid", xaiMethod: "Grad-CAM++",
    overallRisk: "high",
    summary: "Upper endoscopy for variceal surveillance in known Child-Pugh class B cirrhosis. Grade II esophageal varices identified. No active bleeding. Portal hypertensive gastropathy present.",
    recommendation: "Non-selective beta-blocker therapy (Propranolol 40mg). Consider prophylactic variceal banding. Monthly liver function monitoring. Urgent reassessment if hematemesis occurs.",
    findings: [
      { label: "Esophageal Varices", detail: "Grade II varices, no stigmata of bleeding", severity: "high" },
      { label: "Portal Hypertensive Gastropathy", detail: "Mosaic pattern, mild", severity: "moderate" },
      { label: "Cardia", detail: "No gastric varices identified", severity: "normal" },
    ],
    tags: ["Cirrhosis", "Varices", "Beta-blocker"],
  },
  {
    id: 1008, title: "Capsule Endoscopy – Celiac Assessment",
    patient: "Nadia Ferhat", patientId: 1049, patientAge: 36, patientGender: "Female",
    doctor: "Dr. S. Merazga", date: "2025-02-28", type: "capsule",
    status: "sent", pages: 6, aiModel: "ViT Hybrid", xaiMethod: "SHAP",
    overallRisk: "normal",
    summary: "Capsule endoscopy for small bowel assessment in known celiac disease on gluten-free diet. Villous atrophy significantly improved compared to prior study. Mucosa appears healing.",
    recommendation: "Continue strict gluten-free diet. Annual capsule endoscopy or gastroscopy with duodenal biopsy. Dietary review with nutritionist recommended.",
    findings: [
      { label: "Duodenum", detail: "Partial villous recovery, Marsh Grade I", severity: "normal" },
      { label: "Jejunum", detail: "Healing mucosa, no active inflammation", severity: "normal" },
      { label: "Ileum", detail: "Normal appearance throughout", severity: "normal" },
    ],
    tags: ["Celiac Disease", "Capsule Endoscopy", "Gluten-free"],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const avatarGradients = [
  ["#dbeafe","#4f8ef7"], ["#dcfce7","#22c55e"], ["#ffedd5","#f97316"],
  ["#f3e8ff","#a855f7"], ["#fee2e2","#ef4444"], ["#ccfbf1","#14b8a6"],
  ["#fef9c3","#eab308"], ["#fce7f3","#ec4899"],
];

function patientInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function severityStyle(s: Severity) {
  if (s === "high")     return { color: "#ef4444", bg: "#fee2e2", border: "#fca5a5", label: "High Risk", dot: "#ef4444" };
  if (s === "moderate") return { color: "#f97316", bg: "#fff7ed", border: "#fdba74", label: "Moderate",  dot: "#f97316" };
  return                       { color: "#22c55e", bg: "#f0fdf4", border: "#86efac", label: "Normal",    dot: "#22c55e" };
}

function statusStyle(s: ReportStatus) {
  if (s === "validated") return { color: "#22c55e", bg: "#f0fdf4", border: "#86efac", label: "Validated", icon: "✓" };
  if (s === "sent")      return { color: "#4f8ef7", bg: "#eff6ff", border: "#93c5fd", label: "Sent",      icon: "→" };
  return                        { color: "#f97316", bg: "#fff7ed", border: "#fdba74", label: "Draft",     icon: "✎" };
}

function typeLabel(t: ReportType) {
  const map: Record<ReportType, { label: string; icon: string; color: string }> = {
    endoscopy:  { label: "Endoscopy",   icon: "🔬", color: "#4f8ef7" },
    colonoscopy:{ label: "Colonoscopy", icon: "🔍", color: "#a855f7" },
    pathology:  { label: "Pathology",   icon: "🧫", color: "#ef4444" },
    followup:   { label: "Follow-up",   icon: "📋", color: "#22c55e" },
    capsule:    { label: "Capsule",     icon: "💊", color: "#f97316" },
  };
  return map[t];
}

function relativeDate(d: string) {
  const days = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30)  return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

// ─── Report Preview Panel ──────────────────────────────────────────────────────
function ReportPreview({ report, onClose }: { report: Report; onClose: () => void }) {
  const st  = statusStyle(report.status);
  const sev = severityStyle(report.overallRisk);
  const typ = typeLabel(report.type);
  const [bg, fg] = avatarGradients[report.patientId % avatarGradients.length];

  return (
    <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", overflow: "hidden" }}>
      {/* Color top bar */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${sev.dot}, ${sev.dot}55)` }} />

      {/* Header */}
      <div style={{ padding: "1.5rem 1.75rem 1.25rem", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: typ.color, background: typ.color + "18", padding: "0.2rem 0.65rem", borderRadius: "2rem" }}>{typ.icon} {typ.label}</span>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: st.color, background: st.bg, border: `1px solid ${st.border}`, padding: "0.2rem 0.65rem", borderRadius: "2rem" }}>{st.icon} {st.label}</span>
          </div>
          <button type="button" onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6b7280", fontSize: "1rem", flexShrink: 0 }}>×</button>
        </div>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 800, color: "#1a1d23", letterSpacing: "-0.01em", lineHeight: 1.4 }}>{report.title}</h2>

        {/* Patient strip */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", background: "#f9fafb", borderRadius: "0.6rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${bg}, ${fg}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 800, color: fg, flexShrink: 0 }}>
            {patientInitials(report.patient)}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "#1a1d23" }}>{report.patient}</p>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#9ca3af" }}>#{report.patientId} · {report.patientAge} yrs · {report.patientGender}</p>
          </div>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: sev.color, background: sev.bg, border: `1px solid ${sev.border}`, padding: "0.2rem 0.6rem", borderRadius: "2rem" }}>{sev.label}</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ padding: "1.25rem 1.75rem", maxHeight: "60vh", overflowY: "auto" }}>
        {/* Meta grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1.25rem" }}>
          {[
            ["Date",      report.date],
            ["Doctor",    report.doctor],
            ["AI Model",  report.aiModel],
            ["XAI",       report.xaiMethod],
            ["Pages",     `${report.pages} pages`],
            ["Report ID", `#${report.id}`],
          ].map(([l, v]) => (
            <div key={l} style={{ background: "#f9fafb", borderRadius: "0.5rem", padding: "0.6rem 0.75rem" }}>
              <p style={{ margin: "0 0 0.18rem", fontSize: "0.62rem", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</p>
              <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 600, color: "#1a1d23" }}>{v}</p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Summary</p>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#374151", lineHeight: 1.7 }}>{report.summary}</p>
        </div>

        {/* Findings */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ margin: "0 0 0.6rem", fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Findings ({report.findings.length})</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {report.findings.map((f, i) => {
              const fs = severityStyle(f.severity);
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.7rem 0.85rem", background: "#f9fafb", borderRadius: "0.55rem", border: `1px solid ${fs.border}` }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: fs.dot, flexShrink: 0, marginTop: "0.3rem" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.15rem" }}>
                      <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 700, color: "#1a1d23" }}>{f.label}</p>
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, color: fs.color, background: fs.bg, padding: "0.1rem 0.5rem", borderRadius: "2rem", flexShrink: 0 }}>{fs.label}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.76rem", color: "#6b7280" }}>{f.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendation */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Recommendation</p>
          <div style={{ background: sev.bg, border: `1px solid ${sev.border}`, borderRadius: "0.55rem", padding: "0.85rem" }}>
            <p style={{ margin: 0, fontSize: "0.83rem", color: "#374151", lineHeight: 1.7 }}>{report.recommendation}</p>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {report.tags.map(t => (
            <span key={t} style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6b7280", background: "#f3f4f6", padding: "0.2rem 0.65rem", borderRadius: "2rem" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div style={{ padding: "1rem 1.75rem 1.5rem", borderTop: "1px solid #f3f4f6", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <button type="button" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", background: "#4f8ef7", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.65rem", cursor: "pointer", fontWeight: 700, fontSize: "0.82rem", fontFamily: "inherit", transition: "background 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#3b7de8")}
          onMouseLeave={e => (e.currentTarget.style.background = "#4f8ef7")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download PDF
        </button>
        {report.status === "draft" && (
          <button type="button" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", background: "#22c55e", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.65rem", cursor: "pointer", fontWeight: 700, fontSize: "0.82rem", fontFamily: "inherit" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Validate
          </button>
        )}
        {report.status === "validated" && (
          <button type="button" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", background: "#eff6ff", color: "#4f8ef7", border: "1px solid #93c5fd", borderRadius: "0.5rem", padding: "0.65rem", cursor: "pointer", fontWeight: 700, fontSize: "0.82rem", fontFamily: "inherit" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            Send to Patient
          </button>
        )}
        <button type="button" style={{ background: "#f9fafb", color: "#6b7280", border: "1px solid #e2e5eb", borderRadius: "0.5rem", padding: "0.65rem 0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Report List Item ──────────────────────────────────────────────────────────
function ReportListItem({ report, isSelected, onClick }: { report: Report; isSelected: boolean; onClick: () => void }) {
  const st  = statusStyle(report.status);
  const sev = severityStyle(report.overallRisk);
  const typ = typeLabel(report.type);
  const [bg, fg] = avatarGradients[report.patientId % avatarGradients.length];

  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem",
      borderBottom: "1px solid #f9fafb", cursor: "pointer", transition: "background 0.12s",
      background: isSelected ? "#eff6ff" : "transparent",
      borderLeft: isSelected ? "3px solid #4f8ef7" : "3px solid transparent",
    }}
      onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "#f9fafb"; }}
      onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
    >
      {/* Type icon */}
      <div style={{ width: 40, height: 40, borderRadius: "0.55rem", background: typ.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
        {typ.icon}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
          <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "#1a1d23", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220 }}>{report.title}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: `linear-gradient(135deg, ${bg}, ${fg}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.52rem", fontWeight: 800, color: fg, flexShrink: 0 }}>
            {patientInitials(report.patient)}
          </div>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{report.patient} · {report.doctor}</p>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", flexShrink: 0 }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: st.color, background: st.bg, border: `1px solid ${st.border}`, padding: "0.15rem 0.55rem", borderRadius: "2rem" }}>{st.icon} {st.label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: sev.dot, display: "inline-block" }} />
          <span style={{ fontSize: "0.68rem", color: "#9ca3af" }}>{relativeDate(report.date)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [reports, setReports]     = useState<Report[]>(mockReports);
  const [selected, setSelected]   = useState<Report | null>(mockReports[0]);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [typeFilter, setTypeFilter]     = useState<"All" | ReportType>("All");
  const [sortKey, setSortKey]           = useState<SortKey>("date");

  const stats = {
    total:     reports.length,
    draft:     reports.filter(r => r.status === "draft").length,
    validated: reports.filter(r => r.status === "validated").length,
    sent:      reports.filter(r => r.status === "sent").length,
    highRisk:  reports.filter(r => r.overallRisk === "high").length,
  };

  const filtered = reports
    .filter(r => {
      const q = search.toLowerCase();
      const matchSearch = r.title.toLowerCase().includes(q) || r.patient.toLowerCase().includes(q) || r.doctor.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q));
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      const matchType   = typeFilter   === "All" || r.type   === typeFilter;
      return matchSearch && matchStatus && matchType;
    })
    .sort((a, b) => {
      if (sortKey === "date")    return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortKey === "patient") return a.patient.localeCompare(b.patient);
      if (sortKey === "status")  return a.status.localeCompare(b.status);
      return a.type.localeCompare(b.type);
    });

  return (
    <div style={{ 
      background: "#f4f6f9", 
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      width: "100%",
      overflowY: "auto",
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
          overflow-y: auto !important;
          overflow-x: hidden;
        }
      `}</style>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#1a1d23", letterSpacing: "-0.03em" }}>Reports</h1>
            <p style={{ margin: "0.3rem 0 0", fontSize: "0.82rem", color: "#9ca3af" }}>View, validate, and manage all endoscopy diagnostic reports.</p>
          </div>
          <button type="button" style={{
            display: "flex", alignItems: "center", gap: "0.45rem",
            background: "#4f8ef7", color: "#fff", border: "none",
            borderRadius: "0.6rem", padding: "0.7rem 1.35rem", cursor: "pointer",
            fontWeight: 700, fontSize: "0.875rem", fontFamily: "inherit",
            transition: "background 0.15s", boxShadow: "0 4px 12px #4f8ef730"
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#3b7de8")}
            onMouseLeave={e => (e.currentTarget.style.background = "#4f8ef7")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Generate Report
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.875rem", marginBottom: "1.75rem" }}>
          {[
            { label: "Total Reports", value: stats.total,     color: "#4f8ef7", bg: "#eff6ff"  },
            { label: "Draft",         value: stats.draft,     color: "#f97316", bg: "#fff7ed"  },
            { label: "Validated",     value: stats.validated, color: "#22c55e", bg: "#f0fdf4"  },
            { label: "Sent",          value: stats.sent,      color: "#4f8ef7", bg: "#eff6ff"  },
            { label: "High Risk",     value: stats.highRisk,  color: "#ef4444", bg: "#fee2e2"  },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1rem 1.25rem", borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.7rem", color: "#9ca3af", fontWeight: 600, marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: "0.65rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#fff", border: "1px solid #e2e5eb", borderRadius: "0.55rem", padding: "0.6rem 0.9rem", flex: 1, minWidth: 200, transition: "border-color 0.15s" }}
            onFocus={e => (e.currentTarget.style.borderColor = "#4f8ef7")}
            onBlur={e => (e.currentTarget.style.borderColor = "#e2e5eb")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} placeholder="Search reports, patients, tags…" style={{ border: "none", outline: "none", fontFamily: "inherit", fontSize: "0.875rem", color: "#1a1d23", background: "transparent", width: "100%" }} />
            {search && <button type="button" onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "1rem", lineHeight: 1, padding: 0 }}>×</button>}
          </div>

          <div style={{ display: "flex", background: "#fff", border: "1px solid #e2e5eb", borderRadius: "0.55rem", overflow: "hidden", flexShrink: 0 }}>
            {(["All", "draft", "validated", "sent"] as FilterStatus[]).map(f => (
              <button key={f} type="button" onClick={() => setStatusFilter(f)} style={{
                padding: "0.6rem 0.9rem", border: "none", borderRight: "1px solid #e2e5eb",
                background: statusFilter === f ? "#4f8ef7" : "transparent",
                cursor: "pointer", fontSize: "0.78rem", fontWeight: 600,
                color: statusFilter === f ? "#fff" : "#6b7280",
                fontFamily: "inherit", transition: "all 0.15s", textTransform: "capitalize"
              }}>
                {f === "All" ? "All Status" : statusStyle(f as ReportStatus).label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", background: "#fff", border: "1px solid #e2e5eb", borderRadius: "0.55rem", overflow: "hidden", flexShrink: 0 }}>
            {(["All", "endoscopy", "colonoscopy", "capsule"] as const).map(f => (
              <button key={f} type="button" onClick={() => setTypeFilter(f)} style={{
                padding: "0.6rem 0.9rem", border: "none", borderRight: "1px solid #e2e5eb",
                background: typeFilter === f ? "#4f8ef7" : "transparent",
                cursor: "pointer", fontSize: "0.78rem", fontWeight: 600,
                color: typeFilter === f ? "#fff" : "#6b7280",
                fontFamily: "inherit", transition: "all 0.15s", textTransform: "capitalize"
              }}>
                {f === "All" ? "All Types" : typeLabel(f as ReportType).icon + " " + typeLabel(f as ReportType).label}
              </button>
            ))}
          </div>

          <select className="select-ctrl" value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)} style={{
            border: "1px solid #e2e5eb", borderRadius: "0.55rem", padding: "0.6rem 0.85rem",
            fontSize: "0.78rem", color: "#1a1d23", background: "#fff", outline: "none",
            fontFamily: "inherit", cursor: "pointer", flexShrink: 0
          }}>
            <option value="date">Sort: Latest</option>
            <option value="patient">Sort: Patient</option>
            <option value="status">Sort: Status</option>
            <option value="type">Sort: Type</option>
          </select>
        </div>

        {/* Main layout */}
        <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: "1.25rem", alignItems: "start" }}>
          {/* List panel */}
          <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 600 }}>{filtered.length} report{filtered.length !== 1 ? "s" : ""}</span>
              <span style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 600 }}>Click to preview →</span>
            </div>
            <div style={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}>
              {filtered.length === 0 ? (
                <div style={{ padding: "3rem 1.5rem", textAlign: "center", color: "#9ca3af" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📄</div>
                  <p style={{ fontWeight: 600, color: "#6b7280" }}>No reports found</p>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>Try adjusting your filters.</p>
                </div>
              ) : (
                filtered.map(r => (
                  <ReportListItem
                    key={r.id}
                    report={r}
                    isSelected={selected?.id === r.id}
                    onClick={() => setSelected(r)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Preview panel */}
          {selected ? (
            <ReportPreview report={selected} onClose={() => setSelected(null)} />
          ) : (
            <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "4rem 2rem", textAlign: "center", color: "#9ca3af" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📋</div>
              <p style={{ fontWeight: 700, color: "#1a1d23", marginBottom: "0.35rem" }}>No report selected</p>
              <p style={{ fontSize: "0.82rem" }}>Select a report from the list to preview its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
