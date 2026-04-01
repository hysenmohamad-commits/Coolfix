import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileShell } from "@/components/layout/MobileShell";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CoolFix",
  description: "Outil de Technicien Professionnel pour la Réparation d'Électroménager",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("font-sans", inter.variable, "dark")}>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50 min-h-screen`}
      >
        {/* Desktop sidebar – fixed, hidden on mobile */}
        <Sidebar />

        {/* Mobile shell: sticky header + bottom nav (client component for drawer state) */}
        <MobileShell />

        {/* Page content */}
        <main className="md:ml-64 min-h-screen flex flex-col pt-14 md:pt-0 pb-16 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
