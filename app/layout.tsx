import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "./query-provider";
import MainLayout from "@/components/customui/common/mainlayout";
import { satoshi } from "./fonts"
import { GeistSans } from 'geist/font/sans';




export const metadata: Metadata = {
  title: "RentItUp",
  description: "Software that gets the work done",
  icons :{
    icon:"/icons/0.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
