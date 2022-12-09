import React from 'react'
import { styles } from './counterLoader.css'

export const CounterLoader = (): JSX.Element => {
  const [counter, setCounter] = React.useState(1)

  const hasStartedCounter = React.useRef(false)

  React.useEffect(() => {
    if (!hasStartedCounter.current) {
      hasStartedCounter.current = true
      setInterval(() => setCounter((counter) => counter + 1), 20)
    }
  }, [])

  return <div className={styles.loaderContainer}>{counter}</div>
}
