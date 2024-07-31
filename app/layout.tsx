import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/utils/tailwind";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/features/layout/layout";
import { ThemeProvider } from "@/providers/theme-provider";
import StoresProvider from "@/providers/stores-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import TopLoaderProvider from "@/providers/top-loader-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
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
            <TooltipProvider>
              <ReactQueryProvider>
                <TopLoaderProvider />
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
