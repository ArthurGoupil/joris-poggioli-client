import parse from 'html-react-parser'
import { styles } from './aboutInformationsGrid.css'
import { Image as ImageType } from '../../../shared/domain/entities/image'
import { Grid } from '../../../../components/layout/Grid/Grid'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'

type AboutInformationsGridProps = {
  textContent: string
  image: ImageType
}

export const AboutInformationsGrid = ({
  textContent,
  image,
}: AboutInformationsGridProps): JSX.Element => (
  <Grid
    gridTemplateColumns={{ mobile: '1fr', desktop: 'repeat(3, 1fr)' }}
    gridAutoRows={{ mobile: 'auto', desktop: 'auto' }}
    hasBorderBottom={{ mobile: true, desktop: true }}
    gridItems={[
      {
        key: 'text',
        gridColumn: { mobile: '1', desktop: '1' },
        component: (
          <div className={styles.textContainer}>
            <h2>INFORMATIONS</h2>
            {parse(textContent)}
          </div>
        ),
      },
      {
        key: 'image',
        gridColumn: { mobile: '1', desktop: '2' },
        component: (
          <div className={styles.imageContainer}>
            <ImageWithPlaceholder
              src={image.url}
              alt={image.alt ?? image.title}
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={50}
              placeholderUrl={image.base64Thumbnail}
              priority
            />
          </div>
        ),
      },
    ]}
  />
)
