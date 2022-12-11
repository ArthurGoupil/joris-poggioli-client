import type { AppProps } from 'next/app'
import '../styles/reset.css'
import '../styles/globals.css'
import { Footer } from '../components/layout/Footer/Footer'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
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
import { useFixPageTransitionIssue } from '../styles/hooks/useFixPageTransitionIssue'
import { CounterLoader } from '../components/feedback/CounterLoader/CounterLoader'
import {
  LoadedImagesCountProvider,
  useLoadedImagesCount,
} from '../context/loaded-images-count.context'
import { Header } from '../components/layout/Header/Header'

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

const fade: AnimationProps = {
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

const AppWithProviders = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()

  // Next removes css modules too early on page transitions.
  // see: https://github.com/vercel/next.js/issues/17464
  const { removeFixStyles } = useFixPageTransitionIssue()

  const { imagesToLoad, loadedImagesCount } = useLoadedImagesCount()

  const [isFakeLoading, setIsFakeLoading] = React.useState(true)
  const hasAlreadyLoaded = React.useRef(false)

  React.useEffect(() => {
    setTimeout(() => {
      setIsFakeLoading(false)
      hasAlreadyLoaded.current = true
    }, 2000)
  }, [])

  React.useEffect(() => {
    if ((loadedImagesCount / imagesToLoad) * 100 === 100) {
      hasAlreadyLoaded.current = true
    }
  }, [imagesToLoad, loadedImagesCount])

  const showCounterLoader =
    (imagesToLoad > 0 || isFakeLoading) && !hasAlreadyLoaded.current

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {showCounterLoader && (
            <CounterLoader
              percentage={
                isFakeLoading ? 100 : (loadedImagesCount / imagesToLoad) * 100
              }
            />
          )}
        </AnimatePresence>
      </LazyMotion>
      <Header navItems={pageProps.navItems} />
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait" onExitComplete={removeFixStyles}>
          <m.div
            key={router.asPath}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fade.variants}
            transition={fade.transition}
          >
            <div className={scrollbarContainer}>
              <Scrollbars
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
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </>
  )
}

const App = (props: AppProps): JSX.Element => (
  <div className={myFont.className}>
    <LoadedImagesCountProvider>
      <AppWithProviders {...props} />
    </LoadedImagesCountProvider>
  </div>
)

export default App
