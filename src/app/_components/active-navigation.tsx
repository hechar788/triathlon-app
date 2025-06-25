"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/app/_components/ui/navigation-menu";
import { cn } from "@/app/_lib/utils";

export function ActiveNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <NavigationMenu className="fixed top-4 left-1/2 transform -translate-x-1/2 w-fit h-[60px] flex justify-center items-center border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 rounded-lg shadow-lg px-16">
      <NavigationMenuList className="flex items-center justify-center gap-20">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className={cn(
              navigationMenuTriggerStyle(), 
              "min-w-[120px] px-8 py-3 text-sm font-semibold transition-all duration-300",
              "hover:bg-accent/70 hover:text-accent-foreground hover:shadow-md hover:scale-105",
              isActive("/") && "bg-blue-100 text-blue-800 border-blue-200 shadow-sm"
            )}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/triathlon" className={cn(
              navigationMenuTriggerStyle(), 
              "min-w-[120px] px-8 py-3 text-sm font-semibold transition-all duration-300",
              "hover:bg-accent/70 hover:text-accent-foreground hover:shadow-md hover:scale-105",
              isActive("/triathlon") && "bg-blue-100 text-blue-800 border-blue-200 shadow-sm"
            )}>
              Triathlons
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/training" className={cn(
              navigationMenuTriggerStyle(), 
              "min-w-[120px] px-8 py-3 text-sm font-semibold transition-all duration-300",
              "hover:bg-accent/70 hover:text-accent-foreground hover:shadow-md hover:scale-105",
              isActive("/training") && "bg-blue-100 text-blue-800 border-blue-200 shadow-sm"
            )}>
              Training
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
} 