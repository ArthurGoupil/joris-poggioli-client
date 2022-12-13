import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import cc from 'classcat'
import { styles } from './imageGridItem.css'
import { Responsive } from '../../../../features/shared/domain/entities/responsive'

type ImageGridItemProps = Omit<ImageProps, 'className'> & {
  title: string
  subtitle?: string
  href: string
  hasBorderRight: Responsive<boolean>
  hasBorderBottom: Responsive<boolean>
  hasTargetBlank?: boolean
}

export const ImageGridItem = ({
  title,
  subtitle,
  href,
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
    <Image
      {...imageProps}
      alt={imageProps.alt}
      className={styles.image}
      priority
      fill
      sizes="33vw"
      quality={20}
    />
    <div className={styles.imageTitleContainer}>
      <div>{title.toUpperCase()}</div>
      {subtitle && <div>{subtitle.toUpperCase()}</div>}
    </div>
  </Link>
)
