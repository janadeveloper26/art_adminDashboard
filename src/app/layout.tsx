import type { Metadata } from "next";
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
            <div className="flex flex-col flex-1 w-full h-full">
              {/* Top Header Placeholder can go here if needed later */}
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
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
