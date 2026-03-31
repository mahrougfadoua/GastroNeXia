// types/index.ts

export type RiskLevel = "High" | "Moderate" | "Low";

export interface Case {
  id: string;
  type: string;
  region: string;
  conf: number;
  risk: RiskLevel;
  date: string;
  color: string;
}

export interface DistItem {
  label: string;
  count: number;
  pct: number;
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
  ico: string;
}