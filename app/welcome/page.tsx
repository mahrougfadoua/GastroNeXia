// // // "use client";

// // // import React from "react";
// // // import Link from "next/link";
// // // import { 
// // //   Stethoscope, Calendar, Search, MapPin, 
// // //   Clock, Heart, Activity, ArrowRight, Eye, 
// // //   ChevronRight
// // // } from "lucide-react";

// // // export default function WelcomePage() {
// // //   return (
// // //     <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#2D3748" }}>
      
// // //       {/* 1. NAVBAR */}
// // //       <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 80px", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
// // //         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // //           <div style={{ color: "#3B82F6" }}><Stethoscope size={32} /></div>
// // //           <span style={{ fontSize: 24, fontWeight: 800, color: "#1E3A8A" }}>medCare</span>
// // //         </div>
// // //         <div style={{ display: "flex", gap: 32, fontSize: 15, fontWeight: 600, color: "#64748B" }}>
// // //           <Link href="#">About</Link>
// // //           <Link href="#">Services</Link>
// // //           <Link href="#">Doctors</Link>
// // //           <Link href="#">Blog</Link>
// // //           <Link href="#">Contact</Link>
// // //         </div>
// // //         <button style={{ background: "#3B82F6", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>
// // //           Appointment
// // //         </button>
// // //       </nav>

// // //       {/* 2. HERO SECTION */}
// // //       <section style={{ padding: "40px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "radial-gradient(circle at 80% 50%, #E0F2FE 0%, #fff 60%)" }}>
// // //         <div style={{ flex: 1 }}>
// // //           <div style={{ color: "#3B82F6", fontWeight: 800, fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>MEDICAL</div>
// // //           <h1 style={{ fontSize: 64, fontWeight: 900, color: "#1E3A8A", lineHeight: 1.1, marginBottom: 24 }}>
// // //             Healthcare <br /> Solutions
// // //           </h1>
// // //           <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.8, maxWidth: 450, marginBottom: 32 }}>
// // //             Provide all the services you need for your healthcare with the help of professional AI and medical experts.
// // //           </p>
// // //           <button style={{ background: "#3B82F6", color: "#fff", border: "none", padding: "16px 36px", borderRadius: 30, fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)" }}>
// // //             Find Doctors
// // //           </button>
// // //         </div>
        
// // //         {/* Placeholder for Doctor Image (As in the medCare design) */}
// // //         <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative" }}>
// // //           <div style={{ width: 500, height: 500, background: "#3B82F6", borderRadius: "50% 50% 50% 0", position: "relative", overflow: "hidden" }}>
// // //              {/* هنا تضع صورة الطبيب بصيغة PNG شفافة */}
// // //              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "90%", height: "90%", background: "rgba(255,255,255,0.1)", borderRadius: "50%" }}></div>
// // //           </div>
// // //           {/* Floating badges */}
// // //           <div style={{ position: "absolute", top: 40, right: 20, background: "#fff", padding: 15, borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
// // //             <Heart color="#EF4444" fill="#EF4444" size={24} />
// // //           </div>
// // //           <div style={{ position: "absolute", bottom: 60, left: 0, background: "#fff", padding: 15, borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
// // //             <Activity color="#3B82F6" size={24} />
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* 3. QUICK INFO CARDS */}
// // //       <section style={{ padding: "0 80px", marginTop: -60, position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
// // //         <div style={{ background: "#1E40AF", padding: 30, borderRadius: 24, color: "#fff" }}>
// // //           <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
// // //              <Clock size={24} /> <span style={{ fontWeight: 700 }}>Opening Hours</span>
// // //           </div>
// // //           <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.8 }}>
// // //             Monday - Friday <br /> 8:00am - 12:00pm <br /> <br /> Informatics Nederland BV
// // //           </div>
// // //         </div>
        
// // //         <InfoCard icon={<Calendar />} title="Appointment" label="Request" />
// // //         <InfoCard icon={<Search />} title="Find Doctors" label="Doctors" active />
// // //         <InfoCard icon={<MapPin />} title="Find Locations" label="Locations" />
// // //       </section>

// // //       {/* 4. SERVICES SECTION */}
// // //       <section style={{ padding: "100px 80px", textAlign: "center" }}>
// // //         <div style={{ color: "#3B82F6", fontWeight: 800, fontSize: 13, letterSpacing: 2, marginBottom: 10 }}>SERVICE</div>
// // //         <h2 style={{ fontSize: 36, fontWeight: 900, color: "#1E3A8A", marginBottom: 60 }}>Our Medical Services</h2>
        
// // //         <div style={{ display: "flex", alignItems: "center", gap: 100 }}>
// // //           <div style={{ flex: 1, position: "relative" }}>
// // //              <div style={{ width: 350, height: 350, border: "2px dashed #E2E8F0", borderRadius: "50%", margin: "0 auto", position: "relative" }}>
// // //                {/* Central Doctor Placeholder */}
// // //                <div style={{ position: "absolute", inset: 30, background: "#3B82F6", borderRadius: "50%" }}></div>
// // //                {/* Service Tags */}
// // //                <ServiceTag top={-20} left="50%" label="Eye Care" icon={<Eye size={14}/>} />
// // //                <ServiceTag top="50%" right={-40} label="Cardiology" icon={<Heart size={14}/>} />
// // //                <ServiceTag bottom={-20} left="50%" label="Medicine" icon={<Activity size={14}/>} />
// // //              </div>
// // //           </div>
// // //           <div style={{ flex: 1, textAlign: "left" }}>
// // //             <h3 style={{ fontSize: 32, fontWeight: 800, color: "#1E3A8A", marginBottom: 20 }}>Dental Care Service</h3>
// // //             <p style={{ color: "#64748B", lineHeight: 1.8, marginBottom: 30 }}>
// // //               Professional dental care using the latest technologies. We ensure a comfortable experience for all our patients.
// // //             </p>
// // //             <button style={{ background: "#3B82F6", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>
// // //               Learn more
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* 5. TEAM SECTION */}
// // //       <section style={{ padding: "80px", background: "#F8FAFC", textAlign: "center" }}>
// // //         <div style={{ color: "#3B82F6", fontWeight: 800, fontSize: 13, letterSpacing: 2, marginBottom: 10 }}>TEAM</div>
// // //         <h2 style={{ fontSize: 36, fontWeight: 900, color: "#1E3A8A", marginBottom: 60 }}>Our Doctors</h2>
        
// // //         <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
// // //           <DoctorCard name="Mamman Bo" specialty="Cardiology" />
// // //           <DoctorCard name="Reda Siana" specialty="Neurology" active />
// // //           <DoctorCard name="Yaroslav Hawa" specialty="Pediatrics" />
// // //         </div>
        
// // //         <button style={{ marginTop: 50, background: "#3B82F6", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 30, fontWeight: 700 }}>See All</button>
// // //       </section>

// // //     </div>
// // //   );
// // // }

// // // // Helper Components
// // // function InfoCard({ icon, title, label, active = false }: any) {
// // //   return (
// // //     <div style={{ background: "#fff", padding: 30, borderRadius: 24, boxShadow: "0 20px 40px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
// // //       <div>
// // //         <div style={{ color: "#3B82F6", marginBottom: 15 }}>{icon}</div>
// // //         <div style={{ fontWeight: 800, color: "#1E3A8A", marginBottom: 20 }}>{title}</div>
// // //       </div>
// // //       <button style={{ 
// // //         width: "100%", background: active ? "#3B82F6" : "#F1F5F9", 
// // //         color: active ? "#fff" : "#3B82F6", border: "none", 
// // //         padding: "10px", borderRadius: 12, fontWeight: 700, cursor: "pointer" 
// // //       }}>
// // //         {label}
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // function ServiceTag({ top, left, right, bottom, label, icon }: any) {
// // //   return (
// // //     <div style={{ 
// // //       position: "absolute", top, left, right, bottom, transform: "translateX(-50%)", 
// // //       background: "#fff", padding: "8px 16px", borderRadius: 20, 
// // //       boxShadow: "0 10px 20px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700 
// // //     }}>
// // //       <div style={{ color: "#3B82F6" }}>{icon}</div> {label}
// // //     </div>
// // //   );
// // // }

// // // function DoctorCard({ name, specialty, active = false }: any) {
// // //   return (
// // //     <div style={{ width: 280, background: "#fff", padding: 20, borderRadius: 32, boxShadow: active ? "0 30px 60px rgba(59,130,246,0.15)" : "none" }}>
// // //       <div style={{ width: "100%", height: 300, background: "#DBEAFE", borderRadius: 24, marginBottom: 20, overflow: "hidden" }}></div>
// // //       <div style={{ fontSize: 18, fontWeight: 800, color: "#1E3A8A" }}>{name}</div>
// // //       <div style={{ fontSize: 14, color: "#64748B", marginTop: 5 }}>{specialty}</div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import Link from "next/link";

// // export default function WelcomePage() {
// //   return (
// //     <div className="welcome-root">

// //       {/* ── NAVBAR ── */}
// //       <nav className="nav">
// //         <div className="nav-logo">
// //           <div className="logo-icon">
// //             <PlusIcon />
// //           </div>
// //           GastroVisIA
// //         </div>

// //         <div className="nav-links">
// //           <a href="#">Platform</a>
// //           <a href="#">Research</a>
// //           <a href="#">Clinicians</a>
// //           <a href="#">About</a>
// //         </div>

// //         <Link href="/auth">
// //           <button className="btn-nav">Sign In →</button>
// //         </Link>
// //       </nav>

// //       {/* ── HERO ── */}
// //       <section className="hero">
// //         <div className="hero-left">
// //           <div className="hero-tag">
// //             <span className="pulse-dot" />
// //             AI Diagnostic System · Active
// //           </div>

// //           <h1 className="hero-h1">
// //             Endoscopy.<br />
// //             <em>Redefined</em><br />
// //             by AI.
// //           </h1>

// //           <p className="hero-sub">
// //             GastroVisIA delivers real-time lesion detection, classification,
// //             and segmentation for gastrointestinal endoscopy — clinical-grade,
// //             frame by frame.
// //           </p>

// //           <div className="btn-group">
// //             <Link href="/auth">
// //               <button className="btn-primary">Get Started Free</button>
// //             </Link>
// //           </div>
// //         </div>

// //         {/* VISUAL RING */}
// //         <div className="hero-right">
// //           <div className="scan-ring">
// //             <div className="ring-outer" />
// //             <div className="ring-inner" />
// //             <div className="scan-core">
// //               <span className="scan-num">97%</span>
// //               <span className="scan-label">Accuracy</span>
// //             </div>
// //           </div>

// //           <div className="float-card fc-tl">
// //             <div className="fc-label">Detection Speed</div>
// //             <div className="fc-val accent2">&lt; 48ms</div>
// //           </div>

// //           <div className="float-card fc-br">
// //             <div className="fc-label">Risk Level</div>
// //             <div className="fc-val">
// //               <span className="fc-dot" style={{ background: "#FF5C5C" }} />
// //               High — Polyp
// //             </div>
// //           </div>

// //           <div className="float-card fc-top">
// //             <div className="fc-label">Active Cases</div>
// //             <div className="fc-val">2,847</div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── STATS STRIP ── */}
// //       <div className="stats-strip">
// //         {[
// //           { num: "97%",  label: "Detection Accuracy" },
// //           { num: "48ms", label: "Avg Latency"        },
// //           { num: "12k+", label: "Cases Analyzed"     },
// //           { num: "6",    label: "Lesion Classes"     },
// //         ].map((s) => (
// //           <div key={s.label} className="stat-item">
// //             <div className="stat-num">{s.num}</div>
// //             <div className="stat-label">{s.label}</div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* ── FEATURES ── */}
// //       <section className="features">
// //         <div className="section-tag">Core Capabilities</div>
// //         <h2 className="section-title">Everything a gastroenterologist needs.</h2>

// //         <div className="features-grid">
// //           <div className="feat-card c1">
// //             <div className="feat-icon" style={{ background: "rgba(13,110,253,0.08)" }}>
// //               <DetectionIcon color="var(--accent)" />
// //             </div>
// //             <h3>Real-time Detection</h3>
// //             <p>Frame-by-frame lesion detection at sub-50ms latency. Zero interruption to procedure workflow.</p>
// //           </div>

// //           <div className="feat-card c2">
// //             <div className="feat-icon" style={{ background: "rgba(0,200,150,0.08)" }}>
// //               <ClassifyIcon color="var(--accent2)" />
// //             </div>
// //             <h3>AI Classification</h3>
// //             <p>Multi-class pathology diagnosis with confidence scoring across 6 GI lesion categories.</p>
// //           </div>

// //           <div className="feat-card c3">
// //             <div className="feat-icon" style={{ background: "rgba(255,92,92,0.08)" }}>
// //               <EyeIcon color="var(--accent3)" />
// //             </div>
// //             <h3>Pixel Segmentation</h3>
// //             <p>Precise mask overlays with exact lesion boundary delineation for clinical documentation.</p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── CTA ── */}
// //       <div className="cta-section">
// //         <h2>
// //           Ready to elevate your{" "}
// //           <em style={{ fontStyle: "normal", color: "var(--accent2)" }}>
// //             diagnostic precision?
// //           </em>
// //         </h2>
// //         <p>Join clinicians using AI-powered endoscopy analysis.</p>
// //         <Link href="/auth">
// //           <button className="btn-white">Create Your Account</button>
// //         </Link>
// //       </div>

// //     </div>
// //   );
// // }

// // /* ── INLINE SVG ICONS ── */
// // function PlusIcon() {
// //   return (
// //     <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
// //       stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
// //       <circle cx="12" cy="12" r="10" />
// //       <path d="M8 12h8M12 8v8" />
// //     </svg>
// //   );
// // }
// // function DetectionIcon({ color }: { color: string }) {
// //   return (
// //     <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
// //       stroke={color} strokeWidth="1.8" strokeLinecap="round">
// //       <circle cx="12" cy="12" r="2" />
// //       <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
// //     </svg>
// //   );
// // }
// // function ClassifyIcon({ color }: { color: string }) {
// //   return (
// //     <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
// //       stroke={color} strokeWidth="1.8" strokeLinecap="round">
// //       <rect x="2" y="2" width="20" height="20" rx="4" />
// //       <path d="M7 12h2l3-6 3 12 2-6h2" />
// //     </svg>
// //   );
// // }
// // function EyeIcon({ color }: { color: string }) {
// //   return (
// //     <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
// //       stroke={color} strokeWidth="1.8" strokeLinecap="round">
// //       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
// //       <circle cx="12" cy="12" r="3" />
// //     </svg>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { useEffect, useRef } from "react";

// export default function WelcomePage() {
//   const statsRef = useRef<HTMLDivElement>(null);
//   const featRef  = useRef<HTMLDivElement>(null);
//   const ctaRef   = useRef<HTMLDivElement>(null);

//   /* scroll-triggered reveal for below-fold sections */
//   useEffect(() => {
//     const targets = [statsRef.current, featRef.current, ctaRef.current];
//     const io = new IntersectionObserver(
//       (entries) =>
//         entries.forEach((e) => {
//           if (e.isIntersecting) {
//             (e.target as HTMLElement).classList.add("in-view");
//             io.unobserve(e.target);
//           }
//         }),
//       { threshold: 0.12 }
//     );
//     targets.forEach((el) => el && io.observe(el));
//     return () => io.disconnect();
//   }, []);

//   return (
//     <div className="welcome-root">

//       {/* ── NAVBAR ── */}
//       <nav className="nav nav-animate">
//         <div className="nav-logo">
//           <div className="logo-icon">
//             <PlusIcon />
//           </div>
//           GastroVisIA
//         </div>

//         <div className="nav-links">
//           <a href="#">Platform</a>
//           <a href="#">Research</a>
//           <a href="#">About</a>
//         </div>

//         <Link href="/auth">
//           <button className="btn-nav">Sign In →</button>
//         </Link>
//       </nav>

//       {/* ── HERO ── */}
//       <section className="hero">
//         {/* LEFT */}
//         <div className="hero-left">
//           <div className="hero-tag fade-up" style={{ animationDelay: "0.1s" }}>
//             <span className="pulse-dot" />
//             AI Diagnostic System · Active
//           </div>

//           <h1 className="hero-h1 fade-up" style={{ animationDelay: "0.22s" }}>
//             Endoscopy.<br />
//             <em>Redefined</em><br />
//             by AI.
//           </h1>

//           <p className="hero-sub fade-up" style={{ animationDelay: "0.36s" }}>
//             GastroVisIA delivers real-time lesion detection, classification,
//             and segmentation for gastrointestinal endoscopy — clinical-grade,
//             frame by frame.
//           </p>

//           <div className="btn-group fade-up" style={{ animationDelay: "0.5s" }}>
//             <Link href="/auth">
//               <button className="btn-primary">Get Started Free</button>
//             </Link>
//           </div>
//         </div>

//         {/* RIGHT – animated ring */}
//         <div className="hero-right fade-in-right" style={{ animationDelay: "0.25s" }}>
//           <div className="scan-ring">
//             <div className="ring-outer" />
//             <div className="ring-inner" />
//             <div className="orbit-track">
//               <div className="orbit-dot od1" />
//               <div className="orbit-dot od2" />
//             </div>
//             <div className="scan-core">
//               <span className="scan-num">97%</span>
//               <span className="scan-label">Accuracy</span>
//             </div>
//           </div>

//           <div className="float-card fc-tl float-bob" style={{ animationDelay: "0s" }}>
//             <div className="fc-label">Detection Speed</div>
//             <div className="fc-val accent2">&lt; 48ms</div>
//           </div>

//           <div className="float-card fc-br float-bob" style={{ animationDelay: "0.7s" }}>
//             <div className="fc-label">Risk Level</div>
//             <div className="fc-val">
//               <span className="fc-dot" style={{ background: "#FF5C5C" }} />
//               High — Polyp
//             </div>
//           </div>

//           <div className="float-card fc-top float-bob" style={{ animationDelay: "1.4s" }}>
//             <div className="fc-label">Active Cases</div>
//             <div className="fc-val">2,847</div>
//           </div>
//         </div>
//       </section>

//       {/* ── STATS STRIP ── */}
//       <div className="stats-strip reveal-section" ref={statsRef}>
//         {[
//           { num: "97%",  label: "Detection Accuracy" },
//           { num: "48ms", label: "Avg Latency"        },
//           { num: "12k+", label: "Cases Analyzed"     },
//           { num: "6",    label: "Lesion Classes"     },
//         ].map((s, i) => (
//           <div
//             key={s.label}
//             className="stat-item"
//             style={{ transitionDelay: `${i * 0.08}s` }}
//           >
//             <div className="stat-num">{s.num}</div>
//             <div className="stat-label">{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* ── FEATURES ── */}
//       <section className="features reveal-section" ref={featRef}>
//         <div className="section-tag">Core Capabilities</div>
//         <h2 className="section-title">Everything a gastroenterologist needs.</h2>

//         <div className="features-grid">
//           {[
//             {
//               cls: "c1", delay: "0s",
//               bg: "rgba(13,110,253,0.08)",
//               icon: <DetectionIcon color="var(--accent)" />,
//               title: "Real-time Detection",
//               desc: "Frame-by-frame lesion detection at sub-50ms latency. Zero interruption to procedure workflow.",
//             },
//             {
//               cls: "c2", delay: "0.12s",
//               bg: "rgba(0,200,150,0.08)",
//               icon: <ClassifyIcon color="var(--accent2)" />,
//               title: "AI Classification",
//               desc: "Multi-class pathology diagnosis with confidence scoring across 6 GI lesion categories.",
//             },
//             {
//               cls: "c3", delay: "0.24s",
//               bg: "rgba(255,92,92,0.08)",
//               icon: <EyeIcon color="var(--accent3)" />,
//               title: "Pixel Segmentation",
//               desc: "Precise mask overlays with exact lesion boundary delineation for clinical documentation.",
//             },
//           ].map((f) => (
//             <div
//               key={f.title}
//               className={`feat-card ${f.cls}`}
//               style={{ transitionDelay: f.delay }}
//             >
//               <div className="feat-icon" style={{ background: f.bg }}>{f.icon}</div>
//               <h3>{f.title}</h3>
//               <p>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <div className="cta-section reveal-section" ref={ctaRef}>
//         <h2>
//           Ready to elevate your{" "}
//           <em style={{ color: "var(--accent2)" }}>diagnostic precision?</em>
//         </h2>
//         <p>Join clinicians using AI-powered endoscopy analysis.</p>
//         <Link href="/auth">
//           <button className="btn-white">Create Your Account</button>
//         </Link>
//       </div>

//     </div>
//   );
// }

// /* ── SVG ICONS ── */
// function PlusIcon() {
//   return (
//     <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
//       stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
//       <circle cx="12" cy="12" r="10" />
//       <path d="M8 12h8M12 8v8" />
//     </svg>
//   );
// }
// function DetectionIcon({ color }: { color: string }) {
//   return (
//     <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
//       stroke={color} strokeWidth="1.8" strokeLinecap="round">
//       <circle cx="12" cy="12" r="2" />
//       <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
//     </svg>
//   );
// }
// function ClassifyIcon({ color }: { color: string }) {
//   return (
//     <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
//       stroke={color} strokeWidth="1.8" strokeLinecap="round">
//       <rect x="2" y="2" width="20" height="20" rx="4" />
//       <path d="M7 12h2l3-6 3 12 2-6h2" />
//     </svg>
//   );
// }
// function EyeIcon({ color }: { color: string }) {
//   return (
//     <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
//       stroke={color} strokeWidth="1.8" strokeLinecap="round">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router   = useRouter();
  const statsRef = useRef<HTMLDivElement>(null);
  const featRef  = useRef<HTMLDivElement>(null);
  const ctaRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [statsRef.current, featRef.current, ctaRef.current];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    targets.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="welcome-root">

      {/* ── NAVBAR ── */}
      <nav className="nav nav-animate">
        <div className="nav-logo" onClick={() => router.push("/welcome")}>
          <div className="logo-icon">
            <PlusIcon />
          </div>
          GastroVisIA
        </div>

        {/* <div className="nav-links">
          <a href="#features">Platform</a>
          <a href="#stats">Research</a>
          <a href="#cta">About</a>
        </div> */}

        <div className="nav-actions">
          {/* <button
            className="btn-nav-ghost"
            onClick={() => router.push("/dashboard")}
          >
            <EyeIconSmall />
            Try Dashboard
          </button> */}

          <button
            className="btn-nav-signin"
            onClick={() => router.push("/auth")}
          >
            <span className="btn-signin-text">Sign In</span>
            <span className="btn-signin-arrow">→</span>
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="pulse-dot" />
            AI Diagnostic System · Active
          </div>

          <h1 className="hero-h1 fade-up" style={{ animationDelay: "0.22s" }}>
            Endoscopy.<br />
            <em>Redefined</em><br />
            by AI.
          </h1>

          <p className="hero-sub fade-up" style={{ animationDelay: "0.36s" }}>
            GastroVisIA delivers real-time lesion detection, classification,
            and segmentation for gastrointestinal endoscopy — clinical-grade,
            frame by frame.
          </p>

          <div className="btn-group fade-up" style={{ animationDelay: "0.5s" }}>
            {/* primary: go to auth / register */}
            <button
              className="btn-primary"
              onClick={() => router.push("/auth")}
            >
              Get Started Free
            </button>

            
          </div>
        </div>

        {/* ring visual */}
        <div className="hero-right fade-in-right" style={{ animationDelay: "0.25s" }}>
          <div className="scan-ring">
            <div className="ring-outer" />
            <div className="ring-inner" />
            <div className="orbit-track">
              <div className="orbit-dot od1" />
              <div className="orbit-dot od2" />
            </div>
            <div className="scan-core">
              <span className="scan-num">97%</span>
              <span className="scan-label">Accuracy</span>
            </div>
          </div>

          <div
            className="float-card fc-tl float-bob"
            style={{ animationDelay: "0s", cursor: "pointer" }}
            onClick={() => router.push("/dashboard")}
          >
            <div className="fc-label">Detection Speed</div>
            <div className="fc-val accent2">&lt; 48ms</div>
          </div>

          <div
            className="float-card fc-br float-bob"
            style={{ animationDelay: "0.7s", cursor: "pointer" }}
            onClick={() => router.push("/dashboard")}
          >
            <div className="fc-label">Risk Level</div>
            <div className="fc-val">
              <span className="fc-dot" style={{ background: "#FF5C5C" }} />
              High — Polyp
            </div>
          </div>

          <div
            className="float-card fc-top float-bob"
            style={{ animationDelay: "1.4s", cursor: "pointer" }}
            onClick={() => router.push("/dashboard")}
          >
            <div className="fc-label">Active Cases</div>
            <div className="fc-val">2,847</div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div id="stats" className="stats-strip reveal-section" ref={statsRef}>
        {[
          { num: "97%",  label: "Detection Accuracy" },
          { num: "48ms", label: "Avg Latency"        },
          { num: "12k+", label: "Cases Analyzed"     },
          { num: "6",    label: "Lesion Classes"     },
        ].map((s, i) => (
          <div
            key={s.label}
            className="stat-item"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <section className="features">
       <div className="section-tag">Core Capabilities</div>
         <h2 className="section-title">Everything a gastroenterologist needs.</h2>

         <div className="features-grid">
           <div className="feat-card c1">
             <div className="feat-icon" style={{ background: "rgba(13,110,253,0.08)" }}>
               <DetectionIcon color="var(--accent)" />
             </div>
            <h3>Real-time Detection</h3>
             <p>Frame-by-frame lesion detection at sub-50ms latency. Zero interruption to procedure workflow.</p>
          </div>

           <div className="feat-card c2">
             <div className="feat-icon" style={{ background: "rgba(0,200,150,0.08)" }}>
               <ClassifyIcon color="var(--accent2)" />
             </div>             <h3>AI Classification</h3>
            <p>Multi-class pathology diagnosis with confidence scoring across 6 GI lesion categories.</p>
           </div>

           <div className="feat-card c3">
             <div className="feat-icon" style={{ background: "rgba(255,92,92,0.08)" }}>
               <EyeIcon color="var(--accent3)" />
             </div>
             <h3>Pixel Segmentation</h3>
             <p>Precise mask overlays with exact lesion boundary delineation for clinical documentation.</p>
           </div>
         </div>
       </section>

      {/* ── CTA ── */}
      <div id="cta" className="cta-section reveal-section" ref={ctaRef}>
        <h2>
          Ready to elevate your{" "}
          <em style={{ color: "var(--accent2)" }}>diagnostic precision?</em>
        </h2>
        <p>Join clinicians using AI-powered endoscopy analysis.</p>
        <div className="cta-buttons">
          <button
            className="btn-white"
            onClick={() => router.push("/auth")}
          >
            Create Your Account
          </button>
          <button
            className="btn-white-ghost"
            onClick={() => router.push("/dashboard")}
          >
            Explore Dashboard
          </button>
        </div>
      </div>

    </div>
  );
}

/* ── SVG ICONS ── */
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function EyeIconSmall() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function DetectionIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
    </svg>
  );
}
function ClassifyIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M7 12h2l3-6 3 12 2-6h2" />
    </svg>
  );
}
function EyeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}