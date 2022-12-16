import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import cc from 'classcat'
import { styles } from './imageGridItem.css'
import { Responsive } from '../../../../features/shared/domain/entities/responsive'
import { ImageWithPlaceholder } from '../../../data-display/ImageWithPlaceholder'

type ImageGridItemProps = Omit<ImageProps, 'className'> & {
  title: string
  subtitle?: string
  href: string
  base64Thumbnail: string
  hasBorderRight: Responsive<boolean>
  hasBorderBottom: Responsive<boolean>
  hasTargetBlank?: boolean
}

export const ImageGridItem = ({
  title,
  subtitle,
  href,
  base64Thumbnail,
  hasBorderRight,
  hasBorderBottom,
  hasTargetBlank,
  ...imageProps
}: ImageGridItemProps): JSX.Element => (
  <Link
    href={href}
    target={hasTargetBlank ? '_blank' : '_self'}
    className={cc([
      styles.itemContainer,
      {
        [styles.containerBorderRight]: hasBorderRight.desktop,
        [styles.containerBorderRightMobile]: hasBorderRight.mobile,
        [styles.containerBorderBottom]: hasBorderBottom.desktop,
        [styles.containerBorderBottomMobile]: hasBorderBottom.mobile,
      },
    ])}
  >
    <ImageWithPlaceholder
      {...imageProps}
      alt={imageProps.alt}
      className={styles.image}
      priority
      fill
      sizes="(max-width: 768px) 50vw, 33vw"
      quality={30}
      placeholderUrl={base64Thumbnail}
    />
    <div className={styles.imageTitleContainer}>
      <div>{title.toUpperCase()}</div>
      {subtitle && <div>{subtitle.toUpperCase()}</div>}
    </div>
  </Link>
)
