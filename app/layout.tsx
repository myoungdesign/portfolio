import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import { Footer, Header, SmoothScroll, ThemeProvider } from '@/components';

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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Nata+Sans:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider theme="light">
          <SmoothScroll>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
