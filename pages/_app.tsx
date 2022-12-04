import type { AppProps } from 'next/app'
import '../styles/reset.css'
import '../styles/globals.css'
import { Footer } from '../components/layout/Footer/Footer'
import { Header } from '../components/layout/Header/Header'
import React, { useRef } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query'
import {
  scrollbarContainer,
  scrollbarThumb,
  scrollbarView,
} from '../styles/globals.css'
import localFont from '@next/font/local'
import { useRouter } from 'next/router'
import {
  AnimatePresence,
  AnimationProps,
  domAnimation,
  LazyMotion,
  m,
} from 'framer-motion'
import { fetchNavItems } from '../features/Nav/domain/repository/fetchNavItems'
import { CounterLoader } from '../components/feedback/CounterLoader/CounterLoader'

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

const slideUp: AnimationProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  transition: {
    duration: 0.3,
  },
}

const AppWithQueryClient = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  const router = useRouter()
  const ref = useRef<Scrollbars>(null)

  const [isFakeLoading, setIsFakeLoading] = React.useState(true)

  const { data } = useQuery('nav-items', fetchNavItems)

  React.useEffect(() => {
    setTimeout(() => {
      setIsFakeLoading(false)
    }, 2000)
  }, [])

  if (!data?.navItems || isFakeLoading) {
    return (
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
            key={router.asPath}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideUp.variants}
            transition={slideUp.transition}
          >
            <CounterLoader />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    )
  }

  return (
    <Hydrate state={pageProps.dehydratedState}>
      <Header navItems={data.navItems} />
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
            key={router.asPath}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideUp.variants}
            transition={slideUp.transition}
            onAnimationEnd={(): void => {
              if (ref.current) {
                ref.current?.scrollToTop()
              }
            }}
          >
            {!data?.navItems || isFakeLoading ? (
              <CounterLoader />
            ) : (
              <div className={scrollbarContainer}>
                <Scrollbars
                  ref={ref}
                  universal
                  renderThumbVertical={(): JSX.Element => (
                    <div className={scrollbarThumb} />
                  )}
                  renderView={(): JSX.Element => (
                    <div className={scrollbarView} />
                  )}
                >
                  <main>
                    <Component {...pageProps} />
                  </main>
                  <Footer />
                </Scrollbars>
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </Hydrate>
  )
}

const App = (props: AppProps): JSX.Element => (
  <div className={myFont.className}>
    <QueryClientProvider client={queryClient}>
      <AppWithQueryClient {...props} />
    </QueryClientProvider>
  </div>
)

export default App
