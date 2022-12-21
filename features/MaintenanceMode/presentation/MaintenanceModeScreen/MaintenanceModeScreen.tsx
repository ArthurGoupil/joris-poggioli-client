import Image from 'next/image'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'
import { Image as ImageProps } from '../../../shared/domain/entities/image'
import { styles } from './maintenanceModeScreen.css'
import Logo from '../../../../public/logo.svg'
import Link from 'next/link'

export const MaintenanceModeScreen = ({
  url,
  alt,
  title,
  base64Thumbnail,
}: ImageProps): JSX.Element => (
  <div className={styles.container}>
    <ImageWithPlaceholder
      src={url}
      alt={alt ?? title}
      className={styles.background}
      priority
      fill
      quality={80}
      placeholderUrl={base64Thumbnail}
    />
    <Image
      src={Logo}
      alt="Logo Joris Poggioli"
      className={styles.logo}
      priority
    />
    <div className={styles.text}>
      Site under maintenance
      <Link href="mailto:contact@jorispoggioli.com" className={styles.link}>
        contact@jorispoggioli.com
      </Link>
    </div>
  </div>
)
