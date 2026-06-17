import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Sidebar from "../components/Sidebar";

import { Providers } from "../components/Providers";
import { GlobalUploadProgress } from "../components/GlobalUploadProgress";

export const metadata: Metadata = {
  title: "Art Admin Panel",
  description: "Admin panel for art management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
        <Providers>
          <div className="flex h-full w-full">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full h-full bg-background">
              {/* Django Admin Top Header */}
              <header className="h-14 flex items-center justify-between px-6 bg-primary text-primary-foreground border-b border-border shadow-sm">
                <div className="text-sm font-medium">
                  {/* Breadcrumb placeholder or title */}
                  Administration
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-semibold text-[#f5dd5d]">Welcome, admin.</span>
                  <Link href="/" className="hover:underline text-primary-foreground/80 hover:text-white">View site</Link>
                  <span className="text-white/20">|</span>
                  <Link href="/login" className="hover:underline text-primary-foreground/80 hover:text-white">Log out</Link>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto p-6 md:p-8">
                {children}
              </main>
            </div>
          </div>
          <GlobalUploadProgress />
        </Providers>
      </body>
    </html>
  );
}
