import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
  description: "Hector Harris's Triathlon Training App for BCDE211. This application describes various generic triathlon types and allows users to create training plans for them.",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/triathlon">Triathlon</Link>
          <Link href="/training">Training</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
