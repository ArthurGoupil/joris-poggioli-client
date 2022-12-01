import Link from 'next/link'
import { styles } from './footer.css'

export const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    <Link href="/" className={styles.footerLink}>
      JORIS POGGIOLI
    </Link>
  </footer>
)
