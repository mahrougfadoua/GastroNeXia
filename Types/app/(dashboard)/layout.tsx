// app/layout.tsx
import type { Metadata } from "next";
import "@/lib/globals.css";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export const metadata: Metadata = {
  title: "GastroVisIA — Clinical AI",
  description: "AI-powered gastrointestinal endoscopy analysis platform",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <Sidebar />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
            <Topbar />
            <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}