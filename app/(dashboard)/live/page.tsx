"use client";

import React, { useState, useRef, useCallback, ChangeEvent, useEffect } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type PageMode = "upload" | "live";
type AnalysisState = "idle" | "uploading" | "analyzing" | "done";
type Severity = "normal" | "moderate" | "high";
type XaiMethod = "Grad-CAM" | "LIME" | "SHAP";

interface Detection {
  id: number;
  label: string;
  confidence: number;
  severity: Severity;
  location: string;
  x: number; y: number; w: number; h: number;
}

interface AnalysisResult {
  model: string;
  duration: string;
  frameCount: number;
  detections: Detection[];
  overallRisk: Severity;
  recommendation: string;
}

// ─── Mock Results ──────────────────────────────────────────────────────────────
const MOCK_RESULT: AnalysisResult = {
  model: "ViT Hybrid",
  duration: "2.4s",
  frameCount: 1,
  overallRisk: "moderate",
  recommendation: "Gastric ulcer detected. Recommend H. pylori testing and PPI therapy. Schedule follow-up endoscopy in 6–8 weeks.",
  detections: [
    { id: 1, label: "Gastric Ulcer", confidence: 94, severity: "moderate", location: "Antrum", x: 28, y: 32, w: 22, h: 18 },
    { id: 2, label: "Mucosal Inflammation", confidence: 78, severity: "moderate", location: "Body", x: 55, y: 18, w: 15, h: 12 },
    { id: 3, label: "Normal Mucosa", confidence: 99, severity: "normal", location: "Fundus", x: 10, y: 60, w: 18, h: 14 },
  ],
};

const MOCK_LIVE_DETECTIONS: Detection[] = [
  { id: 1, label: "Suspicious Region", confidence: 87, severity: "high", location: "Sigmoid Colon", x: 35, y: 25, w: 20, h: 16 },
  { id: 2, label: "Normal Mucosa", confidence: 97, severity: "normal", location: "Descending Colon", x: 62, y: 50, w: 14, h: 12 },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function severityStyle(s: Severity) {
  if (s === "high")     return { color: "#ef4444", bg: "#fee2e2", border: "#fca5a5", label: "High Risk", dot: "#ef4444" };
  if (s === "moderate") return { color: "#f97316", bg: "#fff7ed", border: "#fdba74", label: "Moderate",  dot: "#f97316" };
  return                       { color: "#22c55e", bg: "#f0fdf4", border: "#86efac", label: "Normal",    dot: "#22c55e" };
}

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ flex: 1, height: 6, background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: "3px", transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: "0.75rem", fontWeight: 700, color, minWidth: 32 }}>{value}%</span>
    </div>
  );
}

// ─── XAI Heatmap Overlay (SVG simulation) ─────────────────────────────────────
function XaiOverlay({ method, detections }: { method: XaiMethod; detections: Detection[] }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="blur-xai">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      {detections.map(d => {
        const s = severityStyle(d.severity);
        const opacity = method === "Grad-CAM" ? 0.35 : method === "LIME" ? 0.25 : 0.28;
        return (
          <g key={d.id}>
            <rect x={d.x} y={d.y} width={d.w} height={d.h} fill={s.dot} opacity={opacity} filter="url(#blur-xai)" rx="2" />
            <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="none" stroke={s.dot} strokeWidth="0.6" opacity={0.8} rx="2" strokeDasharray={method === "LIME" ? "2,1" : "none"} />
            <rect x={d.x} y={d.y - 5} width={d.w} height={4} fill={s.dot} opacity={0.85} rx="1" />
            <text x={d.x + d.w / 2} y={d.y - 2.2} textAnchor="middle" fontSize="2.2" fill="#fff" fontWeight="bold">{d.label} {d.confidence}%</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Upload / Analysis Mode ────────────────────────────────────────────────────
function UploadMode() {
  const [state, setState] = useState<AnalysisState>("idle");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [xaiMethod, setXaiMethod] = useState<XaiMethod>("Grad-CAM");
  const [showXai, setShowXai] = useState(true);
  const [model, setModel] = useState("ViT Hybrid");
  const [patient, setPatient] = useState("");
  const [dragging, setDragging] = useState(false);
  const [activeDetection, setActiveDetection] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setState("idle");
    setResult(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const runAnalysis = () => {
    if (!file) return;
    setState("uploading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setState("analyzing"); return 100; }
        return p + Math.random() * 18;
      });
    }, 150);
    setTimeout(() => {
      setState("done");
      setResult(MOCK_RESULT);
    }, 3200);
  };

  const reset = () => { setState("idle"); setFile(null); setPreview(null); setResult(null); setProgress(0); };

  const overallStyle = result ? severityStyle(result.overallRisk) : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: result ? "1fr 380px" : "1fr", gap: "1.25rem", alignItems: "start" }}>
      {/* Left: Upload + Preview */}
      <div>
        {/* Config Bar */}
        <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1rem 1.5rem", marginBottom: "1.25rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280" }}>Patient</label>
            <input value={patient} onChange={(e: ChangeEvent<HTMLInputElement>) => setPatient(e.target.value)} placeholder="Search patient…" style={{ border: "1px solid #e2e5eb", borderRadius: "0.45rem", padding: "0.4rem 0.75rem", fontSize: "0.82rem", color: "#1a1d23", background: "#fafbfc", outline: "none", fontFamily: "inherit", width: 160 }}
              onFocus={e => e.target.style.borderColor = "#4f8ef7"}
              onBlur={e => e.target.style.borderColor = "#e2e5eb"} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280" }}>Model</label>
            <select value={model} onChange={e => setModel(e.target.value)} style={{ border: "1px solid #e2e5eb", borderRadius: "0.45rem", padding: "0.4rem 0.75rem", fontSize: "0.82rem", color: "#1a1d23", background: "#fafbfc", outline: "none", fontFamily: "inherit" }}>
              {["ViT Hybrid", "CNN (ResNet-50)", "EfficientNet"].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280" }}>XAI</label>
            <select value={xaiMethod} onChange={e => setXaiMethod(e.target.value as XaiMethod)} style={{ border: "1px solid #e2e5eb", borderRadius: "0.45rem", padding: "0.4rem 0.75rem", fontSize: "0.82rem", color: "#1a1d23", background: "#fafbfc", outline: "none", fontFamily: "inherit" }}>
              {(["Grad-CAM", "LIME", "SHAP"] as XaiMethod[]).map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <button type="button" onClick={() => setShowXai(!showXai)} style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: showXai ? "#eff6ff" : "#f9fafb", border: `1px solid ${showXai ? "#4f8ef7" : "#e2e5eb"}`, borderRadius: "0.45rem", padding: "0.4rem 0.85rem", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: showXai ? "#4f8ef7" : "#6b7280", fontFamily: "inherit" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            XAI Overlay
          </button>
        </div>

        {/* Upload Zone or Preview */}
        {!preview ? (
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              background: dragging ? "#eff6ff" : "#fff",
              border: `2px dashed ${dragging ? "#4f8ef7" : "#d1d9e6"}`,
              borderRadius: "0.875rem", padding: "3.5rem 2rem",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s", textAlign: "center",
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: dragging ? "#dbeafe" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", transition: "background 0.2s" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={dragging ? "#4f8ef7" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <p style={{ margin: "0 0 0.35rem", fontWeight: 700, color: "#1a1d23", fontSize: "0.95rem" }}>Drop endoscopy image or video here</p>
            <p style={{ margin: "0 0 1.25rem", fontSize: "0.8rem", color: "#9ca3af" }}>Supports JPG, PNG, MP4, AVI — max 500MB</p>
            <span style={{ background: "#4f8ef7", color: "#fff", borderRadius: "0.5rem", padding: "0.55rem 1.25rem", fontSize: "0.82rem", fontWeight: 700 }}>Browse Files</span>
            <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", overflow: "hidden" }}>
            {/* Image Preview with XAI Overlay */}
            <div style={{ position: "relative", background: "#0b0f1a", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={preview} alt="Endoscopy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              {showXai && result && <XaiOverlay method={xaiMethod} detections={result.detections} />}
              {/* Processing overlay */}
              {(state === "uploading" || state === "analyzing") && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(11,15,26,0.75)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, border: "3px solid #1e2d42", borderTop: "3px solid #4f8ef7", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{state === "uploading" ? "Uploading…" : "AI Analyzing…"}</p>
                  {state === "uploading" && (
                    <div style={{ width: 200, height: 6, background: "#1e2d42", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.min(progress, 100)}%`, background: "#4f8ef7", borderRadius: "3px", transition: "width 0.2s" }} />
                    </div>
                  )}
                </div>
              )}
              {/* Status badge */}
              {state === "done" && result && (
                <div style={{ position: "absolute", top: 10, left: 10, background: overallStyle?.bg, border: `1px solid ${overallStyle?.border}`, borderRadius: "2rem", padding: "0.25rem 0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: overallStyle?.dot, display: "inline-block" }} />
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: overallStyle?.color }}>{overallStyle?.label} Risk</span>
                </div>
              )}
              {/* XAI badge */}
              {showXai && result && (
                <div style={{ position: "absolute", top: 10, right: 10, background: "#1e293b", borderRadius: "2rem", padding: "0.25rem 0.7rem" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8" }}>{xaiMethod}</span>
                </div>
              )}
            </div>

            {/* Actions bar */}
            <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #f3f4f6", display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.82rem", color: "#6b7280", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file?.name}</span>
              {state === "idle" && (
                <button type="button" onClick={runAnalysis} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#4f8ef7", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.55rem 1.2rem", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  Run Analysis
                </button>
              )}
              {state === "done" && (
                <button type="button" style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#22c55e", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.55rem 1.1rem", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  Save Report
                </button>
              )}
              <button type="button" onClick={reset} style={{ background: "none", border: "1px solid #e2e5eb", color: "#6b7280", borderRadius: "0.5rem", padding: "0.55rem 0.9rem", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", fontFamily: "inherit" }}>Reset</button>
            </div>
          </div>
        )}
      </div>

      {/* Right: Results Panel */}
      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Summary Card */}
          <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1.5rem" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "0.9rem", fontWeight: 700, color: "#1a1d23" }}>Analysis Summary</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
              {[
                ["Model", result.model],
                ["Duration", result.duration],
                ["Detections", String(result.detections.length)],
                ["Overall Risk", result.overallRisk.charAt(0).toUpperCase() + result.overallRisk.slice(1)],
              ].map(([label, value]) => (
                <div key={label} style={{ background: "#f9fafb", borderRadius: "0.55rem", padding: "0.75rem" }}>
                  <p style={{ margin: "0 0 0.2rem", fontSize: "0.68rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
                  <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color: label === "Overall Risk" ? overallStyle?.color : "#1a1d23" }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: overallStyle?.bg, border: `1px solid ${overallStyle?.border}`, borderRadius: "0.55rem", padding: "0.85rem" }}>
              <p style={{ margin: "0 0 0.25rem", fontSize: "0.68rem", fontWeight: 700, color: overallStyle?.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>Recommendation</p>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#374151", lineHeight: 1.6 }}>{result.recommendation}</p>
            </div>
          </div>

          {/* Detections List */}
          <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1.5rem" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "0.9rem", fontWeight: 700, color: "#1a1d23" }}>Detected Findings ({result.detections.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {result.detections.map(d => {
                const s = severityStyle(d.severity);
                const isActive = activeDetection === d.id;
                return (
                  <div key={d.id} onClick={() => setActiveDetection(isActive ? null : d.id)} style={{ padding: "0.9rem", borderRadius: "0.6rem", border: `1px solid ${isActive ? s.border : "#f3f4f6"}`, background: isActive ? s.bg : "#f9fafb", cursor: "pointer", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "#1a1d23" }}>{d.label}</p>
                        <p style={{ margin: "0.15rem 0 0", fontSize: "0.72rem", color: "#6b7280" }}>Location: {d.location}</p>
                      </div>
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, padding: "0.18rem 0.6rem", borderRadius: "2rem", flexShrink: 0 }}>{s.label}</span>
                    </div>
                    <ConfidenceBar value={d.confidence} color={s.color} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Live Endoscopy Mode ───────────────────────────────────────────────────────
function LiveMode() {
  const [isLive, setIsLive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showXai, setShowXai] = useState(true);
  const [xaiMethod, setXaiMethod] = useState<XaiMethod>("Grad-CAM");
  const [detections, setDetections] = useState<Detection[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [frameRate, setFrameRate] = useState(0);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fpsRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const detectionRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLive = () => {
    setIsLive(true);
    setElapsed(0);
    setDetections([]);
    setAlerts([]);

    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    fpsRef.current = setInterval(() => setFrameRate(24 + Math.floor(Math.random() * 6)), 800);
    detectionRef.current = setInterval(() => {
      const updated = MOCK_LIVE_DETECTIONS.map(d => ({
        ...d,
        confidence: Math.max(60, Math.min(99, d.confidence + Math.floor(Math.random() * 10) - 5)),
        x: Math.max(5, Math.min(75, d.x + Math.floor(Math.random() * 4) - 2)),
        y: Math.max(5, Math.min(75, d.y + Math.floor(Math.random() * 4) - 2)),
      }));
      setDetections(updated);
      if (updated.some(d => d.severity === "high" && d.confidence > 85)) {
        setAlerts(prev => [`⚠ High-risk finding: ${updated.find(d => d.severity === "high")?.label} (${updated.find(d => d.severity === "high")?.confidence}%)`, ...prev].slice(0, 4));
      }
    }, 1200);
  };

  const stopLive = () => {
    setIsLive(false);
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (fpsRef.current) clearInterval(fpsRef.current);
    if (detectionRef.current) clearInterval(detectionRef.current);
  };

  const captureFrame = () => {
    setCapturedFrames(f => [`Frame ${f.length + 1} · ${new Date().toLocaleTimeString()}`, ...f].slice(0, 6));
  };

  useEffect(() => () => { stopLive(); }, []);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem", alignItems: "start" }}>
      {/* Live Feed */}
      <div>
        {/* Controls Bar */}
        <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1rem 1.5rem", marginBottom: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <button type="button" onClick={isLive ? stopLive : startLive} style={{
            display: "flex", alignItems: "center", gap: "0.45rem",
            background: isLive ? "#fee2e2" : "#4f8ef7",
            color: isLive ? "#ef4444" : "#fff",
            border: `1px solid ${isLive ? "#fca5a5" : "transparent"}`,
            borderRadius: "0.5rem", padding: "0.55rem 1.1rem", cursor: "pointer",
            fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit", transition: "all 0.2s",
          }}>
            {isLive ? (
              <><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>Stop</>
            ) : (
              <><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>Start Live</>
            )}
          </button>

          {isLive && (
            <>
              <button type="button" onClick={() => setIsRecording(!isRecording)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: isRecording ? "#fef2f2" : "#f9fafb", border: `1px solid ${isRecording ? "#fca5a5" : "#e2e5eb"}`, color: isRecording ? "#ef4444" : "#6b7280", borderRadius: "0.5rem", padding: "0.55rem 0.9rem", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", fontFamily: "inherit" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: isRecording ? "#ef4444" : "#9ca3af", display: "inline-block", animation: isRecording ? "pulse 1s infinite" : "none" }} />
                {isRecording ? "Recording…" : "Record"}
              </button>
              <button type="button" onClick={captureFrame} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#f9fafb", border: "1px solid #e2e5eb", color: "#6b7280", borderRadius: "0.5rem", padding: "0.55rem 0.9rem", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", fontFamily: "inherit" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                Capture
              </button>
            </>
          )}

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <select value={xaiMethod} onChange={e => setXaiMethod(e.target.value as XaiMethod)} style={{ border: "1px solid #e2e5eb", borderRadius: "0.45rem", padding: "0.4rem 0.65rem", fontSize: "0.78rem", color: "#1a1d23", background: "#fafbfc", outline: "none", fontFamily: "inherit" }}>
              {(["Grad-CAM", "LIME", "SHAP"] as XaiMethod[]).map(m => <option key={m}>{m}</option>)}
            </select>
            <button type="button" onClick={() => setShowXai(!showXai)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: showXai ? "#eff6ff" : "#f9fafb", border: `1px solid ${showXai ? "#4f8ef7" : "#e2e5eb"}`, borderRadius: "0.45rem", padding: "0.4rem 0.75rem", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, color: showXai ? "#4f8ef7" : "#6b7280", fontFamily: "inherit" }}>
              XAI
            </button>
          </div>
        </div>

        {/* Feed Window */}
        <div style={{ background: "#0b0f1a", borderRadius: "0.875rem", overflow: "hidden", position: "relative", aspectRatio: "16/9" }}>
          {/* Simulated feed */}
          {isLive ? (
            <>
              {/* Simulated endoscopy background */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 45%, #1a3a2a 0%, #0d1f15 40%, #060e0a 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 55%, #1f2a1a 0%, transparent 60%)", opacity: 0.6 }} />
              {/* Scan lines effect */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)", pointerEvents: "none" }} />
              {/* XAI detections */}
              {showXai && detections.length > 0 && (
                <XaiOverlay method={xaiMethod} detections={detections} />
              )}
              {/* HUD overlays */}
              <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ background: "#ef4444", color: "#fff", fontSize: "0.65rem", fontWeight: 800, padding: "0.2rem 0.55rem", borderRadius: "2rem", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "pulse 1s infinite" }} />
                  LIVE
                </span>
                <span style={{ background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, padding: "0.2rem 0.55rem", borderRadius: "2rem" }}>{formatTime(elapsed)}</span>
                {isRecording && <span style={{ background: "rgba(239,68,68,0.2)", border: "1px solid #ef4444", color: "#ef4444", fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: "2rem" }}>● REC</span>}
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: "0.4rem" }}>
                <span style={{ background: "rgba(0,0,0,0.5)", color: "#94a3b8", fontSize: "0.65rem", fontWeight: 600, padding: "0.2rem 0.55rem", borderRadius: "2rem" }}>{frameRate} FPS</span>
                <span style={{ background: "rgba(0,0,0,0.5)", color: "#94a3b8", fontSize: "0.65rem", fontWeight: 600, padding: "0.2rem 0.55rem", borderRadius: "2rem" }}>1080p</span>
              </div>
              {/* AI indicator */}
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4f8ef7", animation: "pulse 1.5s infinite" }} />
                <span style={{ color: "#94a3b8", fontSize: "0.68rem", fontWeight: 600 }}>AI Analyzing · {xaiMethod}</span>
              </div>
            </>
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#111827", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <p style={{ color: "#4b5563", fontSize: "0.88rem", fontWeight: 600 }}>Live feed not started</p>
              <p style={{ color: "#374151", fontSize: "0.78rem" }}>Connect endoscope and press Start Live</p>
            </div>
          )}
        </div>

        {/* Captured Frames */}
        {capturedFrames.length > 0 && (
          <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginTop: "1.25rem" }}>
            <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.88rem", fontWeight: 700, color: "#1a1d23" }}>Captured Frames ({capturedFrames.length})</h3>
            <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
              {capturedFrames.map((f, i) => (
                <div key={i} style={{ background: "#0b0f1a", borderRadius: "0.5rem", padding: "0.75rem 1rem", border: "1px solid #1e2d42", minWidth: 120 }}>
                  <p style={{ margin: 0, fontSize: "0.72rem", fontWeight: 700, color: "#4f8ef7" }}>#{capturedFrames.length - i}</p>
                  <p style={{ margin: "0.15rem 0 0", fontSize: "0.68rem", color: "#6b7280" }}>{f.split("·")[1]?.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {/* Live Status */}
        <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 1rem", fontSize: "0.88rem", fontWeight: 700, color: "#1a1d23" }}>Session Status</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
            {[
              ["Status", isLive ? "Live" : "Offline", isLive ? "#22c55e" : "#9ca3af"],
              ["Duration", isLive ? formatTime(elapsed) : "—", "#1a1d23"],
              ["Findings", String(detections.length), "#4f8ef7"],
              ["Frame Rate", isLive ? `${frameRate} FPS` : "—", "#1a1d23"],
            ].map(([label, value, color]) => (
              <div key={label} style={{ background: "#f9fafb", borderRadius: "0.55rem", padding: "0.7rem" }}>
                <p style={{ margin: "0 0 0.2rem", fontSize: "0.65rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
                <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Detections */}
        <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.88rem", fontWeight: 700, color: "#1a1d23" }}>Live Detections</h3>
          {detections.length === 0 ? (
            <p style={{ fontSize: "0.8rem", color: "#9ca3af", textAlign: "center", padding: "1rem 0" }}>
              {isLive ? "Scanning…" : "No active session"}
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {detections.map(d => {
                const s = severityStyle(d.severity);
                return (
                  <div key={d.id} style={{ padding: "0.75rem", background: "#f9fafb", borderRadius: "0.55rem", border: `1px solid ${s.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.45rem" }}>
                      <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 700, color: "#1a1d23" }}>{d.label}</p>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: s.color, background: s.bg, padding: "0.12rem 0.5rem", borderRadius: "2rem" }}>{s.label}</span>
                    </div>
                    <ConfidenceBar value={d.confidence} color={s.color} />
                    <p style={{ margin: "0.3rem 0 0", fontSize: "0.7rem", color: "#9ca3af" }}>{d.location}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Alerts */}
        <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: "0.875rem", padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.88rem", fontWeight: 700, color: "#1a1d23" }}>
            Alerts
            {alerts.length > 0 && <span style={{ marginLeft: "0.5rem", background: "#ef4444", color: "#fff", fontSize: "0.65rem", fontWeight: 800, padding: "0.1rem 0.5rem", borderRadius: "2rem" }}>{alerts.length}</span>}
          </h3>
          {alerts.length === 0 ? (
            <p style={{ fontSize: "0.8rem", color: "#9ca3af", textAlign: "center", padding: "0.75rem 0" }}>No alerts</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {alerts.map((a, i) => (
                <div key={i} style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontSize: "0.78rem", color: "#92400e", fontWeight: 500 }}>{a}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AnalysisLivePage() {
  const [mode, setMode] = useState<PageMode>("upload");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: auto !important; overflow-y: auto !important; }
        body { background: #f4f6f9; font-family: 'DM Sans', sans-serif; min-height: 100vh; color: #1a1d23; }
        .page-wrap { max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }
      `}</style>

      <div className="page-wrap">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1d23", letterSpacing: "-0.03em", margin: 0 }}>
              {mode === "upload" ? "Image Analysis" : "Live Endoscopy"}
            </h1>
            <p style={{ margin: "0.3rem 0 0", fontSize: "0.82rem", color: "#9ca3af" }}>
              {mode === "upload" ? "Upload and analyze endoscopic images or videos with AI." : "Real-time AI detection during live endoscopy sessions."}
            </p>
          </div>

          {/* Mode Toggle */}
          <div style={{ display: "flex", background: "#fff", border: "1px solid #e2e5eb", borderRadius: "0.6rem", padding: "0.3rem", gap: "0.25rem" }}>
            {([
              { id: "upload", label: "Image Analysis", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg> },
              { id: "live",   label: "Live Feed",      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg> },
            ] as { id: PageMode; label: string; icon: React.ReactNode }[]).map(m => (
              <button key={m.id} type="button" onClick={() => setMode(m.id)} style={{
                display: "flex", alignItems: "center", gap: "0.45rem",
                padding: "0.55rem 1.1rem", borderRadius: "0.4rem", border: "none", cursor: "pointer",
                fontFamily: "inherit", fontSize: "0.85rem", fontWeight: 700,
                background: mode === m.id ? "#4f8ef7" : "transparent",
                color: mode === m.id ? "#fff" : "#6b7280",
                transition: "all 0.18s",
              }}>
                {m.icon} {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {mode === "upload" ? <UploadMode /> : <LiveMode />}
      </div>
    </>
  );
}
