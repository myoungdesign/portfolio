import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import { ThemeProvider } from '@/components';

import '@/index.css';

export const metadata: Metadata = {
  title: 'Portfolio',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieTheme = cookieStore.get('theme')?.value;
  const hintTheme = headerStore.get('sec-ch-prefers-color-scheme');

  const resolvedTheme: 'light' | 'dark' =
    cookieTheme === 'dark' || cookieTheme === 'light'
      ? cookieTheme
      : hintTheme === 'dark'
        ? 'dark'
        : 'light';

  return (
    <html lang="en" data-theme={resolvedTheme} suppressHydrationWarning>
      <body>
        <ThemeProvider theme={resolvedTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
