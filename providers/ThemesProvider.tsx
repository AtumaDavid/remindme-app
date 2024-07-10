"use client";
import React, { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ThemesProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="class" enableSystem>
      {children}
    </NextThemeProvider>
  );
}
