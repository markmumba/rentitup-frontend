// components/ClientNavbar.tsx

"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/register"];

  if (hideNavbarRoutes.includes(pathname)) return null;

  return <Navbar />;
}
