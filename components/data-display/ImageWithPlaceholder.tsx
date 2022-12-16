import Image, { ImageProps } from 'next/image'
import React from 'react'
import cc from 'classcat'
import { AnimatePresence, m } from 'framer-motion'
import { opacityVar, styles } from './imageWithPlaceholder.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type ImageWithPlaceholderProps = ImageProps & { placeholderUrl: string }

export const ImageWithPlaceholder = ({
  placeholderUrl,
  ...imageProps
}: ImageWithPlaceholderProps): JSX.Element => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false)

  return (
    <>
      <Image
        {...imageProps}
        onLoad={() => setIsImageLoaded(true)}
        style={assignInlineVars({
          [opacityVar]: isImageLoaded ? '1' : '0',
        })}
      />
      <AnimatePresence>
        {!isImageLoaded && (
          <m.div
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
            <Image
              {...imageProps}
              src={placeholderUrl}
              className={cc([imageProps.className, styles.placeholder])}
            />
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
