import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientNavbar from "@/components/custom-ui/clientnavbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "./query-provider";
import MainLayout from "@/components/custom-ui/mainLayout";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <QueryProvider>
            <main>
              <MainLayout>
                {children}
                <Toaster />
              </MainLayout>
            </main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
