import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { QueryClientProvider } from '@tanstack/react-query';

import { UserProvider } from '@/contexts/user-context';
import { queryClient } from '@/hooks/queries';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <LocalizationProvider>
            <QueryClientProvider client={queryClient}>
              <UserProvider>
                <ThemeProvider>{children}</ThemeProvider>
              </UserProvider>
            </QueryClientProvider>
          </LocalizationProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
