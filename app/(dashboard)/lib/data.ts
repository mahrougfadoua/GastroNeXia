// lib/data.ts

import type { Case, DistItem, NavItem } from "@/Types";

export const cases: Case[] = [
  { id: "GV-0891", type: "Polyp",       region: "Sigmoid Colon", conf: 97, risk: "High",     date: "Today 09:14",  color: "#DC2626" },
  { id: "GV-0890", type: "Normal",      region: "Duodenum",      conf: 99, risk: "Low",      date: "Today 08:52",  color: "#059669" },
  { id: "GV-0889", type: "Ulcer",       region: "Gastric Body",  conf: 88, risk: "Moderate", date: "Yesterday",    color: "#D97706" },
  { id: "GV-0888", type: "Polyp",       region: "Cecum",         conf: 94, risk: "High",     date: "Yesterday",    color: "#DC2626" },
  { id: "GV-0887", type: "Normal",      region: "Rectum",        conf: 98, risk: "Low",      date: "Mar 28",       color: "#059669" },
  { id: "GV-0886", type: "Inflammation",region: "Ileum",         conf: 85, risk: "Moderate", date: "Mar 27",       color: "#D97706" },
];

export const weekData:   number[] = [58, 72, 49, 88, 66, 79, 91];
export const weekLabels: string[] = ["M", "T", "W", "T", "F", "S", "S"];
export const trendData:  number[] = [62, 58, 74, 69, 83, 78, 91, 87, 95, 91];

export const distData: DistItem[] = [
  { label: "Polyp",  count: 142, pct: 42, color: "#DC2626" },
  { label: "Ulcer",  count: 67,  pct: 20, color: "#D97706" },
  { label: "Normal", count: 129, pct: 38, color: "#059669" },
];

export const navItems: NavItem[] = [
  { id: "home",     label: "Home",          ico: "home"     },
  { id: "dashboard",label: "Dashboard",     ico: "dash"     },
  { id: "live",     label: "Live Analysis", ico: "live"     },
  { id: "cases",    label: "Cases",         ico: "cases"    },
  { id: "reports",  label: "Reports",       ico: "reports"  },
];