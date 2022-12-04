import React from 'react'
import { styles } from './counterLoader.css'
import { AnimatePresence, motion } from 'framer-motion'

export const CounterLoader = (): JSX.Element => {
  const [counter, setCounter] = React.useState(1)

  const hasStartedCounter = React.useRef(false)

  React.useEffect(() => {
    if (!hasStartedCounter.current) {
      hasStartedCounter.current = true
      setInterval(() => setCounter((counter) => counter + 1), 1000)
    }
  }, [])

  return (
    <div className={styles.loaderContainer}>
      <AnimatePresence>
        <motion.div
          key={counter}
          exit={{ y: 75, opacity: 0, position: 'absolute' }}
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
        >
          {counter}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
