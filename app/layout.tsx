import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientNavbar from "./ui/clientnavbar";
import { Toaster } from "@/components/ui/toaster";

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
        <Toaster/>
      </body>
    </html>
  );
}
