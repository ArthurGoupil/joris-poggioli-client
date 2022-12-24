import Image from 'next/image'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'
import { Image as ImageProps } from '../../../shared/domain/entities/image'
import { styles } from './maintenanceModeScreen.css'
import Logo from '../../../../public/logo.svg'
import Link from 'next/link'
import cc from 'classcat'
import Head from 'next/head'

type MaintenanceModeScreenProps = {
  backgroundDesktop: ImageProps
  backgroundMobile: ImageProps
}

export const MaintenanceModeScreen = ({
  backgroundDesktop,
  backgroundMobile,
}: MaintenanceModeScreenProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>JORIS POGGIOLI - Design & Architecture</title>
        <meta name="description" content="Joris Poggioli" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ImageWithPlaceholder
        src={backgroundDesktop.url}
        alt={backgroundDesktop.alt ?? backgroundDesktop.title}
        className={cc([styles.background, styles.hideMobile])}
        fill
        quality={80}
        placeholderUrl={backgroundDesktop.base64Thumbnail}
        priority
      />
      <ImageWithPlaceholder
        src={backgroundMobile.url}
        alt={backgroundMobile.alt ?? backgroundMobile.title}
        className={cc([styles.background, styles.hideDesktop])}
        fill
        quality={80}
        placeholderUrl={backgroundMobile.base64Thumbnail}
        priority
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
}
