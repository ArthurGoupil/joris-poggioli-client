import React from 'react'
import { styles } from './counterLoader.css'
import { m } from 'framer-motion'

export const CounterLoader = ({
  percentage,
}: {
  percentage: number
}): JSX.Element => {
  const [counter, setCounter] = React.useState(1)

  React.useEffect(() => {
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
  }, [percentage])

  return (
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
  )
}
