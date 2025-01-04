"use client";

import { usePathname } from "next/navigation";
import ProtectedSideNavbar from "@/components/customui/common/sidenavbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { isAuthenticated } from "@/lib/service";
import Navbar from "./navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const publicOnlyRoutes = ["/", "/about", "/commitment"];
  const protectedRoutes = ["/dashboard"];
  const flexibleRoutes = ["/categories", "/machines"];

  const isPathMatch = (path: string, patterns: string[]) => {
    return patterns.some(pattern => {
      if (pattern === path) return true;

      if (path.startsWith(pattern + '/')) return true;

      return false;
    });
  };

  const shouldShowNavbar = () => {
    if (isPathMatch(pathname, publicOnlyRoutes)) return true;

    if (isPathMatch(pathname, flexibleRoutes) && !isAuthenticated()) return true;

    return false;
  };

  const shouldShowSidebar = () => {
    if (isPathMatch(pathname, protectedRoutes)) return true;

    if (isPathMatch(pathname, flexibleRoutes) && isAuthenticated()) return true;

    return false;
  };

  return (
    <div className="flex w-full min-h-screen">
      {shouldShowNavbar() && <Navbar />}

      {shouldShowSidebar() ? (
        <SidebarProvider>
          <ProtectedSideNavbar />
          <SidebarTrigger />
          <main className="flex-1 w-full overflow-x-auto">{children}</main>
        </SidebarProvider>
      ) : (
        <main className="flex-1 w-full">{children}</main>
      )}
    </div>
  );
}