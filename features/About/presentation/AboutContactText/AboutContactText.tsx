import parse from 'html-react-parser'
import { styles } from './aboutContactText.css'

type AboutContactTextProps = {
  contactText: string
}

export const AboutContactText = ({
  contactText,
}: AboutContactTextProps): JSX.Element => (
  <div className={styles.textContainer}>
    <h2>CONTACT</h2>
    <div>{parse(contactText)}</div>
  </div>
)
