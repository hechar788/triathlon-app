import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/app/_components/ui/navigation-menu";
import { cn } from "@/app/_lib/utils";
import { ScrollToTop } from "@/app/_components/scroll-to-top";

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
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} m-0 p-0`}>
        <ScrollToTop />
        <NavigationMenu className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-[60px] flex justify-center items-center border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 rounded-lg shadow-lg px-4">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={cn(
                  navigationMenuTriggerStyle(), 
                  "min-w-[120px] px-8 py-3 text-sm font-semibold transition-all duration-300 ease-in-out",
                  "hover:bg-accent/70 hover:text-accent-foreground hover:shadow-md hover:scale-105",
                  "active:scale-95 active:shadow-sm",
                  "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                  "hover:border-accent/50"
                )}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/triathlon" className={cn(
                  navigationMenuTriggerStyle(), 
                  "min-w-[120px] px-8 py-3 text-sm font-semibold transition-all duration-300 ease-in-out",
                  "hover:bg-accent/70 hover:text-accent-foreground hover:shadow-md hover:scale-105",
                  "active:scale-95 active:shadow-sm",
                  "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                  "hover:border-accent/50"
                )}>
                  Triathlons
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/training" className={cn(
                  navigationMenuTriggerStyle(), 
                  "min-w-[120px] px-8 py-3 text-sm font-semibold transition-all duration-300 ease-in-out",
                  "hover:bg-accent/70 hover:text-accent-foreground hover:shadow-md hover:scale-105",
                  "active:scale-95 active:shadow-sm",
                  "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                  "hover:border-accent/50"
                )}>
                  Training
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="h-24"></div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
