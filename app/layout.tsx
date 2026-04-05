// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <html lang="en">
// //       <body>{children}</body>
// //     </html>
// //   );
// // }


// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "GastroVisIA — AI Diagnostic Platform",
//   description: "Real-time AI analysis of gastrointestinal endoscopy feeds.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }


// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GastroVisIA — AI Diagnostic Platform",
  description: "Real-time AI analysis of gastrointestinal endoscopy feeds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}