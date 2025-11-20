import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useRouter } from 'next/router'
import { createEmotionCache } from '@/utils'
import { MUIProvider } from '@/providers'
import { PageLoader } from '@/components/loaders'
import { Toaster } from '@/app/new-home/components/ui/toaster'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/styles/globals.css'
import '@/styles/react-slick.css'
import '@/styles/App.css'
import '@/styles/index.css'
import { NextPageWithLayout } from '@/interfaces/layout'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type AppPropsWithLayout = AppProps & {
  emotionCache: EmotionCache
  Component: NextPageWithLayout
}

const App: FC<AppPropsWithLayout> = (props: AppPropsWithLayout) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle initial page load and hydration
  useEffect(() => {
    // Immediately hide loader after hydration
    setIsHydrated(true)
    setIsPageLoading(false)
  }, [])

  // Handle page transitions
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsPageLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setIsPageLoading(false)
    }

    const handleRouteChangeError = () => {
      setIsPageLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router.events])

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>React Coursespace</title>
      </Head>
      <MUIProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <PageLoader isLoading={isPageLoading || !isHydrated} />
        {isHydrated && getLayout(<Component {...pageProps} />)}
        <Toaster />
      </MUIProvider>
    </CacheProvider>
  )
}

export default App
