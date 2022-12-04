import Image from 'next/image'
import Link from 'next/link'
import { styles } from './designGridItem.css'
import cc from 'classcat'
import { slugify } from '../../../../components/layout/shared/logic/slugify'

type DesignGridItemProps = {
  src: string
  alt: string
  name: string
  slug: string
  designType: string
  hasBorderRight: boolean
  hasBorderBottom: boolean
}

export const DesignGridItem = ({
  src,
  alt,
  name,
  slug,
  designType,
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
    <Image src={src} alt={alt} className={styles.image} priority fill />
    <div className={styles.imageTitle}>{name.toUpperCase()}</div>
  </Link>
)
