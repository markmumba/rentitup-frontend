import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./ui/navbar";
import { usePathname } from "next/navigation";
import ClientNavbar from "./ui/clientnavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentItUp",
  description: "Software that gets the work done",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientNavbar />
        {children}
      </body>
    </html>
  );
}
