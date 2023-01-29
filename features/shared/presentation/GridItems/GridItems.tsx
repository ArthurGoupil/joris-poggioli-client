import { GridProps } from '../../../../components/layout/Grid/Grid'
import { Responsive } from '../../domain/entities/responsive'
import cc from 'classcat'
import {
  LandscapePortraitLine,
  Lines,
  PortraitColumn,
  PortraitLandscapeLine,
} from '../../domain/entities/lines'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'
import { Image } from '../../domain/entities/image'
import { styles } from './gridItems.css'
import { DesignItem } from '../../../Design/domain/entities/design'
import { DesignProductPresentation } from '../../../Design/presentation/DesignProductPresentation/DesignProductPresentation'

type GetBorderClassNames = {
  hasBorderBottom: Responsive<boolean>
  hasBorderRight: Responsive<boolean>
}

const getBorderClassNames = ({
  hasBorderBottom,
  hasBorderRight,
}: GetBorderClassNames): Record<string, boolean>[] => [
  { [styles.hasBorderBottom]: hasBorderBottom.desktop },
  { [styles.hasBorderBottomMobile]: hasBorderBottom.mobile },
  { [styles.hasBorderRight]: hasBorderRight.desktop },
  { [styles.hasBorderRightMobile]: hasBorderRight.mobile },
]

type GetBlankItemProps = {
  gridColumn: Responsive<string>
  lineNumber: number
  columnNumber: number
  borderClassNames: Record<string, boolean>[]
}

const getBlankItem = ({
  gridColumn,
  lineNumber,
  columnNumber,
  borderClassNames,
}: GetBlankItemProps): GridProps['gridItems'][number] => ({
  key: `blank-${lineNumber}-${columnNumber}`,
  gridColumn,
  component: <div className={cc([styles.blankContainer, borderClassNames])} />,
  isHidden: { mobile: true, desktop: false },
})

type GetGridItemFromPortraitColumnProps = {
  portraitColumn: PortraitColumn | null
  lineNumber: number
  columnNumber: number
  gridColumn: Responsive<string>
  hasBorderBottom: Responsive<boolean>
  hasBorderRight: Responsive<boolean>
}

const getGridItemFromPortraitColumn = ({
  portraitColumn,
  lineNumber,
  columnNumber,
  gridColumn,
  hasBorderBottom,
  hasBorderRight,
}: GetGridItemFromPortraitColumnProps): GridProps['gridItems'][number] => {
  const borderClassNames = getBorderClassNames({
    hasBorderBottom,
    hasBorderRight,
  })

  const blankItem = getBlankItem({
    gridColumn,
    lineNumber,
    columnNumber,
    borderClassNames,
  })

  if (portraitColumn === null) {
    return blankItem
  }

  if (portraitColumn.type === 'blank') {
    return blankItem
  } else {
    return {
      key: portraitColumn.image.title,
      gridColumn,
      component: (
        <div className={cc([styles.imageContainer, ...borderClassNames])}>
          <ImageWithPlaceholder
            src={portraitColumn.image.url}
            alt={portraitColumn.image.alt ?? portraitColumn.image.title}
            className={styles.image}
            width={portraitColumn.image.width}
            height={portraitColumn.image.height}
            quality={100}
            placeholderUrl={portraitColumn.image.base64Thumbnail}
            priority={lineNumber === 1}
          />
        </div>
      ),
    }
  }
}

type GetGridItemFromLandscapeColumnProps = {
  landscapeImage: Image
  lineNumber: number
  gridColumn: Responsive<string>
  hasBorderBottom: Responsive<boolean>
  hasBorderRight: Responsive<boolean>
}

const getGridItemFromLandscapeColumn = ({
  landscapeImage,
  lineNumber,
  gridColumn,
  hasBorderBottom,
  hasBorderRight,
}: GetGridItemFromLandscapeColumnProps): GridProps['gridItems'][number] => {
  return {
    key: landscapeImage.title,
    gridColumn,
    component: (
      <div
        className={cc([
          styles.imageContainer,
          ...getBorderClassNames({ hasBorderBottom, hasBorderRight }),
        ])}
      >
        <ImageWithPlaceholder
          src={landscapeImage.url}
          alt={landscapeImage.alt ?? landscapeImage.title}
          className={styles.image}
          width={landscapeImage.width}
          height={landscapeImage.height}
          quality={100}
          placeholderUrl={landscapeImage.base64Thumbnail}
          priority={lineNumber === 1}
        />
      </div>
    ),
  }
}

type GetGridItemFromPortraitLanscapeColumnProps = {
  portraitLandscapeLine: PortraitLandscapeLine
  lineNumber: number
  hasBorderBottom: Responsive<boolean>
}

const getGridItemFromPortraitLanscapeColumn = ({
  portraitLandscapeLine,
  lineNumber,
  hasBorderBottom,
}: GetGridItemFromPortraitLanscapeColumnProps): GridProps['gridItems'][number][] => {
  return [
    getGridItemFromPortraitColumn({
      portraitColumn: portraitLandscapeLine.portraitColumn,
      lineNumber,
      columnNumber: 1,
      gridColumn: { mobile: '1', desktop: '1' },
      hasBorderBottom,
      hasBorderRight: {
        mobile: false,
        desktop: true,
      },
    }),
    {
      key: portraitLandscapeLine.landscapeImage.title,
      gridColumn: {
        mobile: '1',
        desktop: '2 / 4',
      },
      component: (
        <div
          className={cc([
            styles.imageContainer,
            { [styles.hasBorderBottom]: hasBorderBottom.desktop },
            { [styles.hasBorderBottomMobile]: hasBorderBottom.mobile },
            { [styles.hasBorderRight]: false },
            {
              [styles.hasBorderRightMobile]: false,
            },
          ])}
        >
          <ImageWithPlaceholder
            src={portraitLandscapeLine.landscapeImage.url}
            alt={
              portraitLandscapeLine.landscapeImage.alt ??
              portraitLandscapeLine.landscapeImage.title
            }
            className={styles.image}
            width={portraitLandscapeLine.landscapeImage.width}
            height={portraitLandscapeLine.landscapeImage.height}
            quality={100}
            placeholderUrl={
              portraitLandscapeLine.landscapeImage.base64Thumbnail
            }
            priority={lineNumber === 1}
          />
        </div>
      ),
    },
  ]
}

type GetGridItemFromLanscapePortraitColumnProps = {
  landscapePortraitLine: LandscapePortraitLine
  lineNumber: number
  hasBorderBottom: Responsive<boolean>
}

const getGridItemFromLanscapePortraitColumn = ({
  landscapePortraitLine,
  lineNumber,
  hasBorderBottom,
}: GetGridItemFromLanscapePortraitColumnProps): GridProps['gridItems'][number][] => {
  return [
    {
      key: landscapePortraitLine.landscapeImage.title,
      gridColumn: {
        mobile: '1',
        desktop: '1 / 3',
      },
      component: (
        <div
          className={cc([
            styles.imageContainer,
            { [styles.hasBorderBottom]: hasBorderBottom.desktop },
            { [styles.hasBorderBottomMobile]: hasBorderBottom.mobile },
            { [styles.hasBorderRight]: true },
            {
              [styles.hasBorderRightMobile]: false,
            },
          ])}
        >
          <ImageWithPlaceholder
            src={landscapePortraitLine.landscapeImage.url}
            alt={
              landscapePortraitLine.landscapeImage.alt ??
              landscapePortraitLine.landscapeImage.title
            }
            className={styles.image}
            width={landscapePortraitLine.landscapeImage.width}
            height={landscapePortraitLine.landscapeImage.height}
            quality={100}
            placeholderUrl={
              landscapePortraitLine.landscapeImage.base64Thumbnail
            }
            priority={lineNumber === 1}
          />
        </div>
      ),
    },
    getGridItemFromPortraitColumn({
      portraitColumn: landscapePortraitLine.portraitColumn,
      lineNumber,
      columnNumber: 1,
      gridColumn: { mobile: '1', desktop: '3 / 4' },
      hasBorderBottom,
      hasBorderRight: {
        mobile: false,
        desktop: true,
      },
    }),
  ]
}

type GetGridItemsFromImageLineProps = {
  line: DesignItem['imagesProductPage'][number]
  lineNumber: number
  isLastLine: boolean
  type: GridItemsType
  designItem?: DesignItem
}

const getGridItemsFromImageLine = ({
  line,
  lineNumber,
  isLastLine,
  type,
  designItem,
}: GetGridItemsFromImageLineProps): GridProps['gridItems'] => {
  const hasBorderBottom = {
    mobile: true,
    desktop: !isLastLine,
  }
  const hasBorderRightLandscape = {
    mobile: false,
    desktop: lineNumber > 2 ? false : true,
  }

  const gridItems = []

  const presentationItem = {
    key: 'product-presention',
    // make sure this is the last item in mobile
    order: { mobile: '100', desktop: 'unset' },
    component: designItem ? (
      <DesignProductPresentation {...designItem} />
    ) : null,
    gridColumn: { mobile: '1 / 3', desktop: '3' },
  }

  switch (line.imageType) {
    case 'landscape': {
      gridItems.push(
        getGridItemFromLandscapeColumn({
          landscapeImage: line.landscapeImage,
          lineNumber,
          gridColumn: {
            mobile: '1',
            desktop:
              lineNumber > 2 || type === 'architecture' ? '1 / 4' : '1 / 3',
          },
          hasBorderBottom,
          hasBorderRight: hasBorderRightLandscape,
        })
      )

      if (lineNumber === 1 && type === 'design') {
        gridItems.push(presentationItem)
      }

      if (lineNumber === 2 && type === 'design') {
        gridItems.push(
          getBlankItem({
            gridColumn: { mobile: 'auto', desktop: '3' },
            lineNumber,
            columnNumber: 3,
            borderClassNames: getBorderClassNames({
              hasBorderBottom,
              hasBorderRight: { mobile: false, desktop: false },
            }),
          })
        )
      }

      break
    }
    case 'portrait': {
      gridItems.push(
        getGridItemFromPortraitColumn({
          portraitColumn: line.firstColumn,
          lineNumber,
          columnNumber: 1,
          gridColumn: { mobile: '1', desktop: '1' },
          hasBorderBottom,
          hasBorderRight: {
            mobile: false,
            desktop:
              line.firstColumn.type === 'image' ||
              line.secondColumn.type === 'image',
          },
        }),
        getGridItemFromPortraitColumn({
          portraitColumn: line.secondColumn,
          lineNumber,
          columnNumber: 2,
          gridColumn: { mobile: '1', desktop: '2' },
          hasBorderBottom,
          hasBorderRight: {
            mobile: false,
            desktop:
              line.secondColumn.type === 'image' ||
              line.thirdColumn?.type === 'image' ||
              lineNumber === 1 ||
              lineNumber === 2,
          },
        })
      )

      if (lineNumber === 1 && type === 'design') {
        gridItems.push(presentationItem)
      } else {
        gridItems.push(
          getGridItemFromPortraitColumn({
            portraitColumn: line.thirdColumn,
            lineNumber,
            columnNumber: 3,
            gridColumn: { mobile: '1', desktop: '3' },
            hasBorderBottom,
            hasBorderRight: { mobile: false, desktop: false },
          })
        )
      }

      break
    }
    case 'portrait-landscape': {
      gridItems.push(
        ...getGridItemFromPortraitLanscapeColumn({
          portraitLandscapeLine: line,
          lineNumber,
          hasBorderBottom,
        })
      )

      break
    }
    case 'landscape-portrait': {
      gridItems.push(
        ...getGridItemFromLanscapePortraitColumn({
          landscapePortraitLine: line,
          lineNumber,
          hasBorderBottom,
        })
      )

      break
    }
  }

  return gridItems
}

type GridItemsType = 'design' | 'architecture'

type GetGridItemsFromImageLinesProps = {
  lines: Lines
  type: GridItemsType
  designItem?: DesignItem
}

export const getGridItemsFromImageLines = ({
  lines,
  type,
  designItem,
}: GetGridItemsFromImageLinesProps): GridProps['gridItems'] =>
  lines.reduce<GridProps['gridItems']>((gridItems, imageLine, index) => {
    const isLastLine = index === lines.length - 1

    gridItems.push(
      ...getGridItemsFromImageLine({
        designItem,
        line: imageLine,
        lineNumber: index + 1,
        isLastLine,
        type,
      })
    )

    return gridItems
  }, [])
