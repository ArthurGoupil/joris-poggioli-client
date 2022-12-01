import type { AppProps } from 'next/app'
import './styles/reset.css'
import './styles/globals.css'
import { Footer } from '../components/layout/Footer/Footer'
import { Header } from '../components/layout/Header/Header'
import React, { useEffect, useRef } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import {
  scrollbarContainer,
  scrollbarThumb,
  scrollbarView,
} from './styles/globals.css'
import localFont from '@next/font/local'
import Router, { useRouter } from 'next/router'

export const queryClient = new QueryClient()
const myFont = localFont({
  src: [
    {
      path: 'fonts/helveticaneue-regular.ttf',
      weight: '400',
    },
    {
      path: 'fonts/helveticaneue-medium.ttf',
      weight: '500',
    },
    {
      path: 'fonts/helveticaneue-bold.ttf',
      weight: '700',
    },
  ],
})

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()
  const ref = useRef<Scrollbars>(null)

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      if (ref.current) {
        ref.current.scrollToTop()
      }
    })
  }, [router.pathname])

  return (
    <div className={myFont.className}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          <div className={scrollbarContainer}>
            <Scrollbars
              ref={ref}
              universal
              renderThumbVertical={(): JSX.Element => (
                <div className={scrollbarThumb} />
              )}
              renderView={(): JSX.Element => <div className={scrollbarView} />}
            >
              <main>
                <Component {...pageProps} />
              </main>
              <Footer />
            </Scrollbars>
          </div>
        </Hydrate>
      </QueryClientProvider>
    </div>
  )
}

export default App
