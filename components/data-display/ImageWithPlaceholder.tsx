import Image, { ImageProps } from 'next/image'
import React from 'react'
import cc from 'classcat'
import { AnimatePresence, m } from 'framer-motion'
import {
  imageOpacityVar,
  placeholderOpacityVar,
  styles,
} from './imageWithPlaceholder.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type ImageWithPlaceholderProps = ImageProps & { placeholderUrl: string }

export const ImageWithPlaceholder = ({
  placeholderUrl,
  ...imageProps
}: ImageWithPlaceholderProps): JSX.Element => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false)
  const [isPlaceholderLoaded, setIsPlaceholderLoaded] = React.useState(false)

  return (
    <>
      <Image
        {...imageProps}
        alt={imageProps.alt}
        onLoadingComplete={(img): void => {
          if (imageProps.onLoadingComplete) {
            imageProps.onLoadingComplete(img)
          }
          setIsImageLoaded(true)
        }}
        style={assignInlineVars({
          [imageOpacityVar]: isImageLoaded && isPlaceholderLoaded ? '1' : '0',
        })}
        loading="eager"
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
            style={assignInlineVars({
              [placeholderOpacityVar]: isPlaceholderLoaded ? '1' : '0',
            })}
            className={styles.placeholderContainer}
          >
            <Image
              {...imageProps}
              src={placeholderUrl}
              alt={imageProps.alt}
              className={cc([imageProps.className, styles.placeholder])}
              onLoadingComplete={(): void => setIsPlaceholderLoaded(true)}
              quality={20}
              loading="eager"
              priority
            />
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
