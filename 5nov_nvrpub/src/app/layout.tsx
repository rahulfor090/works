'use client';

import { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { MUIProvider } from '@/providers';
import { createEmotionCache } from '@/utils';
import '@/styles/globals.css';
import '@/styles/react-slick.css';

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>NVR Publications</title>
        <meta name="description" content="NVR Publications API Documentation" />
      </head>
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <MUIProvider>
            <CssBaseline />
            {children}
          </MUIProvider>
        </CacheProvider>
      </body>
    </html>
  );
}

