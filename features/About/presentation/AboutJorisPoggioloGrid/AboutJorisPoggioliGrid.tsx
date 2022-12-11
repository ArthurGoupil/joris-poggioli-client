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
    gridTemplateColumns="repeat(3, 1fr)"
    gridAutoRows="auto"
    gridItems={[
      {
        key: 'text',
        gridColumn: '1 / 2',
        component: (
          <div className={styles.textContainer}>
            <h2>JORIS POGGIOLI</h2>
            {parse(textContent)}
          </div>
        ),
      },
      {
        key: 'image',
        gridColumn: '2 / 3',
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
