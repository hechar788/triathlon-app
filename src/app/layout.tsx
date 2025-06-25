import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/app/_components/scroll-to-top";
import { PWARegistration } from "./_components/pwa-registration";
import { ActiveNavigation } from "./_components/active-navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Triathlon Training App",
  description: "Triathlon Training App for BCDE211 - Hector Harris. This application describes various generic triathlon types and allows users to create training plans for them.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Triathlon App",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} m-0 p-0`}>
        <PWARegistration />
        <ScrollToTop />
        <ActiveNavigation />
        <div className="h-24"></div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
