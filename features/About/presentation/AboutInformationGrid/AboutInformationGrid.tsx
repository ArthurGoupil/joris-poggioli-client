import parse from 'html-react-parser'
import { styles } from './aboutInformationGrid.css'
import { Image as ImageType } from '../../../shared/domain/entities/image'
import { Grid } from '../../../../components/layout/Grid/Grid'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'

type AboutInformationGridProps = {
  textContent: string
  image: ImageType
}

export const AboutInformationGrid = ({
  textContent,
  image,
}: AboutInformationGridProps): JSX.Element => (
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
            <h2>INFORMATION</h2>
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
              quality={100}
              placeholderUrl={image.base64Thumbnail}
              priority
            />
          </div>
        ),
      },
    ]}
  />
)
