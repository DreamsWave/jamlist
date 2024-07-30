import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/utils/tailwind";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/features/layout/layout";
import { ThemeProvider } from "@/providers/theme-provider";
import StoresProvider from "@/providers/stores-provider";
import ReactQueryProvider from "@/providers/react-query-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "JamList",
  description: "JamList is a song list app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <StoresProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader showSpinner={false} height={2} color="#ffffff" />
            <TooltipProvider>
              <ReactQueryProvider>
                <Layout>{children}</Layout>
              </ReactQueryProvider>
            </TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </StoresProvider>
      </body>
    </html>
  );
}
