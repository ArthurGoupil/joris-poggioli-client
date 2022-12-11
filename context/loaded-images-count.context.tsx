import * as React from 'react'

type LoadedImagesCountContextValue = {
  loadedImagesCount: number
  setLoadedImagesCount: React.Dispatch<React.SetStateAction<number>>
  imagesToLoad: number
  setImagesToLoad: React.Dispatch<React.SetStateAction<number>>
}

const LoadedImagesCountContext = React.createContext<
  LoadedImagesCountContextValue | undefined
>(undefined)

const LoadedImagesCountProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [loadedImagesCount, setLoadedImagesCount] = React.useState(0)
  const [imagesToLoad, setImagesToLoad] = React.useState(0)

  const value = {
    loadedImagesCount,
    setLoadedImagesCount,
    imagesToLoad,
    setImagesToLoad,
  }
  return (
    <LoadedImagesCountContext.Provider value={value}>
      {children}
    </LoadedImagesCountContext.Provider>
  )
}

const useLoadedImagesCount = (): LoadedImagesCountContextValue => {
  const context = React.useContext(LoadedImagesCountContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a LoadedImagesCountProvider')
  }
  return context
}

export { LoadedImagesCountProvider, useLoadedImagesCount }
