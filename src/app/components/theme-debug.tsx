"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeDebugger() {
  const { theme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-black p-4 rounded-lg shadow-lg z-50">
      <h2 className="font-bold mb-2">Theme Debug Info</h2>
      <p>Current Theme: {theme}</p>
      <p>Resolved Theme: {resolvedTheme}</p>
      <p>System Theme: {systemTheme}</p>
      <p>HTML Classes: {document.documentElement.className}</p>
    </div>
  );
}