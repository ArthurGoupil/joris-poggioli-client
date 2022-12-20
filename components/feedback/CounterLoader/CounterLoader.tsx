import React from 'react'
import { styles } from './counterLoader.css'
import { AnimatePresence, m } from 'framer-motion'
import { useLoadedImagesCount } from '../../../context/loaded-images-count.context'
import { useRouter } from 'next/router'

const pagesWithImagesToLoad = ['/', '/design/[type]']

export const CounterLoader = (): JSX.Element => {
  const router = useRouter()
  const { imagesToLoad, loadedImagesCount } = useLoadedImagesCount()

  const [showCounter, setShowCounter] = React.useState(true)

  const counterRef = React.useRef<HTMLDivElement>(null)
  const shouldFakeLoading = !pagesWithImagesToLoad.includes(router.pathname)

  const hasAlreadyShownLoader = React.useRef(false)

  React.useEffect(() => {
    setShowCounter(imagesToLoad > 0 || shouldFakeLoading)
  }, [imagesToLoad, shouldFakeLoading])

  React.useEffect(() => {
    const percentage = shouldFakeLoading
      ? 100
      : Math.round((loadedImagesCount / imagesToLoad) * 100)

    if (showCounter && !hasAlreadyShownLoader.current) {
      const interval = setInterval(() => {
        if (Number(counterRef.current?.textContent) === 100) {
          setShowCounter(false)
          hasAlreadyShownLoader.current = true
        }

        if (
          Number(counterRef.current?.textContent) < percentage &&
          counterRef.current
        ) {
          counterRef.current.textContent = (
            Number(counterRef.current.textContent) + 1
          ).toString()
        } else {
          clearInterval(interval)
        }
      }, 20)

      return () => clearInterval(interval)
    }
  }, [imagesToLoad, loadedImagesCount, shouldFakeLoading, showCounter])

  return (
    <AnimatePresence>
      {showCounter && (
        <m.div
          ref={counterRef}
          className={styles.loaderContainer}
          key="loader"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: {
              opacity: 1,
            },
            animate: {
              opacity: 1,
            },
            exit: {
              opacity: 0,
            },
          }}
          transition={{
            duration: 0.3,
          }}
        />
      )}
    </AnimatePresence>
  )
}
