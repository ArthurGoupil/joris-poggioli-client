import React from 'react'
import { styles } from './counterLoader.css'

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

  return <div className={styles.loaderContainer}>{counter}</div>
}
