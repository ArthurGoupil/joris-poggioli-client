import { DesignItem } from '../../../Design/domain/entities/design'
import { styles } from './designProductPresentation.css'
import parse from 'html-react-parser'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import cc from 'classcat'

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
  limitedEdtionOf,
  material,
  dimensions,
  leadTime,
  freeText,
  technicalSheet,
  imagesBy,
}: DesignItem): JSX.Element => {
  const router = useRouter()

  const showFirstParagraph =
    year ?? designBy ?? madeIn ?? hasNumberedSignedPieces

  return (
    <div className={styles.presentationContainer}>
      <div className={styles.textContainer}>
        <div className={styles.titleContainer}>
          <h2>{name}</h2>
        </div>
        {showFirstParagraph && (
          <div className={styles.paragraph}>
            {year && <div>{year}</div>}
            {designBy && <div>design by {designBy}</div>}
            {madeIn && <div>made in {madeIn}</div>}
            {hasNumberedSignedPieces && <div>numbered and signed pieces</div>}
            {limitedEdtionOf && <div>limited edition of {limitedEdtionOf}</div>}
          </div>
        )}
        {material && (
          <div className={styles.paragraph}>
            MATERIALS<div>{material}</div>
          </div>
        )}
        {dimensions && (
          <div className={styles.paragraph}>
            DIMENSIONS
            <div>
              {dimensions.width && (
                <div>
                  width: {formatStringNumber(dimensions.width)} cm (
                  {formatStringNumberToInches(dimensions.width)} inches)
                </div>
              )}
              {dimensions.height && (
                <div>
                  height: {formatStringNumber(dimensions.height)} cm (
                  {formatStringNumberToInches(dimensions.height)} inches)
                </div>
              )}
              {dimensions.diameter && (
                <div>
                  diameter: {formatStringNumber(dimensions.diameter)} cm (
                  {formatStringNumberToInches(dimensions.diameter)} inches)
                </div>
              )}
              {dimensions.depth && (
                <div>
                  depth: {formatStringNumber(dimensions.depth)} cm (
                  {formatStringNumberToInches(dimensions.depth)} inches)
                </div>
              )}
            </div>
          </div>
        )}
        {leadTime && (
          <div className={styles.paragraph}>
            LEAD TIME<div>{leadTime}</div>
          </div>
        )}
        {freeText && <div>{parse(freeText)}</div>}
      </div>
      <div>
        {imagesBy && (
          <div className={cc([styles.paragraph, styles.images])}>
            IMAGES<div>{imagesBy}</div>
          </div>
        )}
        <Link href={`/design/${router.query.type}`} className={styles.back}>
          BACK
        </Link>
        <div>
          {technicalSheet && (
            <button className={styles.technicalSheet}>
              <Link
                href={technicalSheet}
                target="_blank"
                className={styles.link}
              >
                DOWNLOAD TECHNICAL SHEET
              </Link>
            </button>
          )}
          <button className={styles.priceInformation}>
            <Link
              href={`mailto:contact@jorispoggioli.com?subject=Price information for ${name}`}
              target="_blank"
              className={styles.link}
            >
              PRICE INFORMATION
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
