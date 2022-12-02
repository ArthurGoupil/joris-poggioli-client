import { DesignItem } from '../../../Design/domain/entities/design'
import { styles } from './designProductPresentation.css'
import parse from 'html-react-parser'
import Link from 'next/link'
import { useRouter } from 'next/router'

const formatStringNumber = (number: string): string =>
  Number(number)
    .toFixed(2)
    .replace(/\.?0+$/, '')
const formatStringNumberToInches = (number: string): string =>
  (Number(number) / 2.54).toFixed(2).replace(/\.?0+$/, '')

export const DesignProductPresentation = ({
  name,
  year,
  designBy,
  madeIn,
  hasNumberedSignedPieces,
  material,
  dimensions,
  freeText,
  technicalSheet,
}: DesignItem): JSX.Element => {
  const router = useRouter()

  const showFirstParagraph =
    year ?? designBy ?? madeIn ?? hasNumberedSignedPieces

  return (
    <div className={styles.presentationContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{name}</h2>
        <Link href={`/design/${router.query.type}`} className={styles.back}>
          BACK
        </Link>
      </div>
      {showFirstParagraph && (
        <div className={styles.paragraph}>
          {year && <div>{year}</div>}
          {designBy && <div>design by {designBy}</div>}
          {madeIn && <div>made in {madeIn}</div>}
          {hasNumberedSignedPieces && <div>numbered and signed pieces</div>}
        </div>
      )}
      {material && (
        <div className={styles.paragraph}>
          MATERIAL<div>{material}</div>
        </div>
      )}
      {dimensions && (
        <div className={styles.paragraph}>
          DIMENSIONS
          <div>
            {dimensions.width && (
              <div>
                width: {formatStringNumberToInches(dimensions.width)} inches (
                {formatStringNumber(dimensions.width)} cm)
              </div>
            )}
            {dimensions.height && (
              <div>
                height: {formatStringNumberToInches(dimensions.height)} inches (
                {formatStringNumber(dimensions.height)} cm)
              </div>
            )}
            {dimensions.diameter && (
              <div>
                diameter: {formatStringNumberToInches(dimensions.diameter)}{' '}
                inches ({formatStringNumber(dimensions.diameter)} cm)
              </div>
            )}
          </div>
        </div>
      )}
      {freeText && <div className={styles.freeText}>{parse(freeText)}</div>}

      <div className={styles.buttonContainer}>
        {technicalSheet && (
          <button className={styles.technicalSheet}>
            <Link href={technicalSheet} target="_blank" className={styles.link}>
              DOWNLOAD TECHNICAL SHEET
            </Link>
          </button>
        )}
        <button className={styles.priceInformation}>
          <Link
            href={`mailto:joris@jorispoggioli.com?subject=Price information for ${name}`}
            target="_blank"
            className={styles.link}
          >
            PRICE INFORMATION
          </Link>
        </button>
      </div>
    </div>
  )
}
