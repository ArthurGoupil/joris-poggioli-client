import Image from 'next/image'
import Link from 'next/link'
import { styles } from './footer.css'
import Logo from '../../../public/logo.svg'

export const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    <Link href="/" className={styles.footerLink}>
      <Image
        src={Logo}
        alt="Logo Joris Poggioli"
        className={styles.logo}
        priority
      />
    </Link>
  </footer>
)
