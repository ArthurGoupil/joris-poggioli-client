import { useRouter } from 'next/router'
import React from 'react'
import { savePageStyles } from '../logic/savePageStyles'

type UseFixPageTransitionIssueReturn = {
  removeFixStyles: () => void
}

export const useFixPageTransitionIssue =
  (): UseFixPageTransitionIssueReturn => {
    const router = useRouter()

    React.useEffect(() => {
      savePageStyles()
    }, [])

    React.useEffect(() => {
      const handleRouteChangeComplete = (): void => {
        savePageStyles()
      }

      router.events.on('beforeHistoryChange', handleRouteChangeComplete)

      return () => {
        router.events.off('beforeHistoryChange', handleRouteChangeComplete)
      }
    }, [router])

    const removeFixStyles = (): void => {
      const head = document.head
      const previousStylesFixes = head.querySelectorAll('[data-pt-fix]')

      if (previousStylesFixes) {
        for (let i = 0; i < previousStylesFixes.length; i++) {
          head.removeChild(previousStylesFixes[i])
        }
      }
    }

    return { removeFixStyles }
  }
