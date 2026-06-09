/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Used in main.tsx
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
