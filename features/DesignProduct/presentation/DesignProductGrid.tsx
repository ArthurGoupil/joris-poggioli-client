import Image from 'next/image'
import { Grid, GridProps } from '../../../components/layout/Grid/Grid'
import { DesignItem, PortraitColumn } from '../../Design/domain/entities/design'
import { styles } from './designProductGrid.css'

type GridItemFromPortraitColumnProps = {
  portraitColumn: PortraitColumn
  lineNumber: number
  columnNumber: number
  gridColumn: string
}

const gridItemFromPortraitColumn = ({
  portraitColumn,
  lineNumber,
  columnNumber,
  gridColumn,
}: GridItemFromPortraitColumnProps): GridProps['gridItems'][number] => {
  if (portraitColumn.type === 'blank') {
    return {
      key: `blank-${lineNumber}-${columnNumber}`,
      gridColumn,
      component: <div />,
    }
  } else {
    console.log(
      'portraitColumn.image.base64Thumbnail',
      portraitColumn.image.base64Thumbnail
    )

    return {
      key: portraitColumn.image.title,
      gridColumn,
      component: (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <Image
            src={portraitColumn.image.url}
            alt={portraitColumn.image.alt ?? portraitColumn.image.title}
            className={styles.image}
            priority
            placeholder="blur"
            blurDataURL={portraitColumn.image.base64Thumbnail}
            quality={30}
            fill
          />
        </div>
      ),
    }
  }
}

type GetGridItemsFromImageLineProps = {
  line: DesignItem['imagesProductPage'][number]
  lineNumber: number
}

const getGridItemsFromImageLine = ({
  line,
  lineNumber,
}: GetGridItemsFromImageLineProps): GridProps['gridItems'] => {
  if (line.imageType === 'landscape') {
    return [
      {
        key: line.landscapeImage.title,
        component: (
          <Image
            src={line.landscapeImage.url}
            alt={line.landscapeImage.alt ?? line.landscapeImage.title}
            className={styles.image}
            width={line.landscapeImage.width}
            height={line.landscapeImage.height}
            priority
            placeholder="blur"
            blurDataURL={line.landscapeImage.base64Thumbnail}
          />
        ),
        gridColumn: '1 / 3',
      },
    ]
  } else {
    return [
      gridItemFromPortraitColumn({
        portraitColumn: line.firstColumn,
        lineNumber,
        columnNumber: 1,
        gridColumn: '1',
      }),
      gridItemFromPortraitColumn({
        portraitColumn: line.secondColumn,
        lineNumber,
        columnNumber: 2,
        gridColumn: '2 / 3',
      }),
    ]
  }
}

const getGridItemsFromImageLines = (
  imageLines: DesignItem['imagesProductPage'] | undefined
): GridProps['gridItems'] => {
  const gridItems: GridProps['gridItems'] = []

  imageLines?.forEach((imageLine, index) => {
    if (index === 0) {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
        }),
        {
          key: 'product-presention',
          component: <div>presentation</div>,
          gridColumn: '3 / 4',
        }
      )
    } else if (index === 1) {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
        }),
        {
          key: 'technical-sheet',
          component: <div>technical-sheet</div>,
          gridColumn: '3 / 4',
        }
      )
    } else {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
        }),
        {
          key: `blank-${index + 1}`,
          component: <div />,
          gridColumn: '3 / 4',
        }
      )
    }
  })
  return gridItems
}

type DesignProductGridProps = {
  imagesProductPage: DesignItem['imagesProductPage']
}

export const DesignProductGrid = ({
  imagesProductPage,
}: DesignProductGridProps): JSX.Element => (
  <Grid
    gridAutoRows="40vw"
    gridTemplateColumns="repeat(3, 1fr)"
    gridItems={getGridItemsFromImageLines(imagesProductPage)}
  />
)
