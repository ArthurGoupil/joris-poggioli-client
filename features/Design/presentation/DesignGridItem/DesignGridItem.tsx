import Image from 'next/image'
import Link from 'next/link'
import { styles } from './designGridItem.css'
import cc from 'classcat'
import { slugify } from '../../../../components/layout/shared/slugify'

type DesignGridItemProps = {
  src: string
  blurDataURL: string
  alt: string
  name: string
  slug: string
  designType: string
  width: number
  height: number
  hasBorderRight: boolean
  hasBorderBottom: boolean
}

export const DesignGridItem = ({
  src,
  blurDataURL,
  alt,
  name,
  slug,
  designType,
  width,
  height,
  hasBorderRight,
  hasBorderBottom,
}: DesignGridItemProps): JSX.Element => (
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
      width={width}
      height={height}
      priority
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
    <div className={styles.imageTitle}>{name.toUpperCase()}</div>
  </Link>
)
