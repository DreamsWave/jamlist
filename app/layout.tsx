import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import ResizableLayout from "@/components/resizable-layout";
import { getDefaultLayout } from "@/server/utils";
import { Suspense } from "react";
import { Loader } from "lucide-react";

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
  const { defaultLayout, defaultCollapsed } = getDefaultLayout();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TooltipProvider>
          <ResizableLayout
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
          >
            <Suspense
              fallback={
                <div className="flex min-h-screen w-full items-center justify-center">
                  <Loader className="h-12 w-12 animate-spin" />
                </div>
              }
            >
              {children}
            </Suspense>
          </ResizableLayout>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
