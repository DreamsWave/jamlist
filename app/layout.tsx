import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/features/layout/sidebar/sidebar";
import Layout from "@/features/layout/layout";
// import ResizableLayout from "@/components/resizable-layout";
// import { getDefaultLayout } from "@/server/utils";
// import { Suspense } from "react";
// import { Loader } from "lucide-react";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "JamList",
  description: "JamList is a song list app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { defaultLayout, defaultCollapsed } = getDefaultLayout();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TooltipProvider>
          {/* <ResizableLayout
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
          >
              {children}
          </ResizableLayout> */}
          <Layout>{children}</Layout>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
