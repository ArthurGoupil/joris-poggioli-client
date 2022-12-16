import parse from 'html-react-parser'
import { styles } from './aboutJorisPoggioliGrid.css'
import Image from 'next/image'
import { Image as ImageType } from '../../../shared/domain/entities/image'
import { Grid } from '../../../../components/layout/Grid/Grid'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'

type AboutJorisPoggioliGridProps = {
  textContent: string
  image: ImageType
}

export const AboutJorisPoggioliGrid = ({
  textContent,
  image,
}: AboutJorisPoggioliGridProps): JSX.Element => (
  <Grid
    gridTemplateColumns={{ mobile: '1fr', desktop: 'repeat(3, 1fr)' }}
    gridAutoRows={{ mobile: 'auto', desktop: 'auto' }}
    hasBorderBottom={{ mobile: true, desktop: true }}
    gridItems={[
      {
        key: 'text',
        gridColumn: { mobile: '1', desktop: '1 / 2' },
        component: (
          <div className={styles.textContainer}>
            <h2>JORIS POGGIOLI</h2>
            {parse(textContent)}
          </div>
        ),
      },
      {
        key: 'image',
        gridColumn: { mobile: '1', desktop: '2 / 3' },
        component: (
          <div className={styles.imageContainer}>
            <ImageWithPlaceholder
              src={image.url}
              alt={image.alt ?? image.title}
              className={styles.image}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={40}
              placeholderUrl={image.base64Thumbnail}
            />
          </div>
        ),
      },
    ]}
  />
)
