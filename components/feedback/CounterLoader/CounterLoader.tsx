import React from 'react'
import { styles } from './counterLoader.css'
import { AnimatePresence, m } from 'framer-motion'
import { useLoadedImagesCount } from '../../../context/loaded-images-count.context'
import { useRouter } from 'next/router'

const pagesWithImagesToLoad = ['/', '/design/[type]']

export const CounterLoader = (): JSX.Element => {
  const router = useRouter()
  const { imagesToLoad, loadedImagesCount } = useLoadedImagesCount()

  const [counter, setCounter] = React.useState(1)
  const [showCounter, setShowCounter] = React.useState(true)

  const shouldFakeLoading = !pagesWithImagesToLoad.includes(router.pathname)

  React.useEffect(() => {
    setShowCounter((imagesToLoad > 0 || shouldFakeLoading) && counter !== 100)
  }, [counter, imagesToLoad, shouldFakeLoading])

  React.useEffect(() => {
    const percentage = shouldFakeLoading
      ? 100
      : Math.round((loadedImagesCount / imagesToLoad) * 100)

    if (showCounter) {
      const interval = setInterval(() => {
        setCounter((counter) => {
          if (counter < percentage) {
            return counter + 1
          } else {
            clearInterval(interval)
            return counter
          }
        })
      }, 20)

      return () => clearInterval(interval)
    }
  }, [imagesToLoad, loadedImagesCount, shouldFakeLoading, showCounter])

  return (
    <AnimatePresence>
      {showCounter && (
        <m.div
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
        >
          {counter}
        </m.div>
      )}
    </AnimatePresence>
  )
}
