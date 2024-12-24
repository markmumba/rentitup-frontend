"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
  const showNavbarRoutes = ["/","/about"];

  if (showNavbarRoutes.includes(pathname)) return <Navbar/>;
  return null;

}
