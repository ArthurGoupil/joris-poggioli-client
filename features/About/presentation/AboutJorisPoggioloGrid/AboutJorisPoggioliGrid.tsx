import parse from 'html-react-parser'
import { styles } from './aboutJorisPoggioliGrid.css'
import Image from 'next/image'
import { Image as ImageType } from '../../../shared/domain/entities/image'
import { Grid } from '../../../../components/layout/Grid/Grid'

type AboutJorisPoggioliGridProps = {
  textContent: string
  image: ImageType
}

export const AboutJorisPoggioliGrid = ({
  textContent,
  image,
}: AboutJorisPoggioliGridProps): JSX.Element => (
  <Grid
    gridTemplateColumns={{ mobile: null, desktop: 'repeat(3, 1fr)' }}
    gridAutoRows={{ mobile: null, desktop: 'auto' }}
    gridItems={[
      {
        key: 'text',
        gridColumn: { mobile: null, desktop: '1 / 2' },
        component: (
          <div className={styles.textContainer}>
            <h2>JORIS POGGIOLI</h2>
            {parse(textContent)}
          </div>
        ),
      },
      {
        key: 'image',
        gridColumn: { mobile: null, desktop: '2 / 3' },
        component: (
          <div className={styles.imageContainer}>
            <Image
              src={image.url}
              alt={image.alt ?? image.title}
              className={styles.image}
              priority
              fill
              sizes="33vw"
              quality={40}
            />
          </div>
        ),
      },
    ]}
  />
)
