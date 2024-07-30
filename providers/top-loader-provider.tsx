"use client";

import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { useState, useEffect } from "react";

function TopLoaderProvider() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const color = theme === "dark" ? "#ffffff" : "#000000";
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return <NextTopLoader showSpinner={false} height={2} color={color} />;
}

export default TopLoaderProvider;
