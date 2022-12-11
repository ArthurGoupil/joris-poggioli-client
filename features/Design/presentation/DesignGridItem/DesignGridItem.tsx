import Image from 'next/image'
import Link from 'next/link'
import { styles } from './designGridItem.css'
import cc from 'classcat'
import { slugify } from '../../../../components/layout/shared/logic/slugify'
import { useLoadedImagesCount } from '../../../../context/loaded-images-count.context'

type DesignGridItemProps = {
  src: string
  alt: string
  name: string
  slug: string
  designType: string
  hasBorderRight: boolean
  hasBorderBottom: boolean
  imageIndex: number
}

export const DesignGridItem = ({
  src,
  alt,
  name,
  slug,
  designType,
  hasBorderRight,
  hasBorderBottom,
  imageIndex,
}: DesignGridItemProps): JSX.Element => {
  const { setLoadedImagesCount, imagesToLoad } = useLoadedImagesCount()

  return (
    <Link
      href={`/design/${slugify(designType)}/${slug}`}
      className={cc([
        styles.itemContainer,
        {
          [styles.containerBorderRight]: hasBorderRight,
          [styles.containerBorderBottom]: hasBorderBottom,
        },
      ])}
    >
      <Image
        src={src}
        alt={alt}
        className={styles.image}
        priority
        fill
        sizes="33vw"
        quality={20}
        onLoadingComplete={(): void => {
          // we want the 6 first images to be loaded before displaying the page
          if (imageIndex < imagesToLoad) {
            setLoadedImagesCount((count) => count + 1)
          }
        }}
      />
      <div className={styles.imageTitle}>{name.toUpperCase()}</div>
    </Link>
  )
}
