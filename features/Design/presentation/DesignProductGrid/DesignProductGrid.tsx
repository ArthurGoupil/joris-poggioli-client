import { styles } from './designProductGrid.css'
import cc from 'classcat'
import { Grid, GridProps } from '../../../../components/layout/Grid/Grid'
import { DesignItem, PortraitColumn } from '../../domain/entities/design'
import { DesignProductPresentation } from '../DesignProductPresentation/DesignProductPresentation'
import { themeVars } from '../../../../styles/theme.css'
import { Responsive } from '../../../shared/domain/entities/responsive'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'

type GridItemFromPortraitColumnProps = {
  portraitColumn: PortraitColumn
  lineNumber: number
  columnNumber: number
  gridColumn: Responsive<string>
  hasBorderBottom: Responsive<boolean>
  hasBorderRight: Responsive<boolean>
}

const gridItemFromPortraitColumn = ({
  portraitColumn,
  lineNumber,
  columnNumber,
  gridColumn,
  hasBorderBottom,
  hasBorderRight,
}: GridItemFromPortraitColumnProps): GridProps['gridItems'][number] => {
  const borderClassNames = [
    { [styles.hasBorderBottom]: hasBorderBottom.desktop },
    { [styles.hasBorderBottomMobile]: hasBorderBottom.mobile },
    { [styles.hasBorderRight]: hasBorderRight.desktop },
    { [styles.hasBorderRightMobile]: hasBorderRight.mobile },
  ]

  if (portraitColumn.type === 'blank') {
    return {
      key: `blank-${lineNumber}-${columnNumber}`,
      gridColumn,
      component: (
        <div className={cc([styles.blankContainer, ...borderClassNames])} />
      ),
    }
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
            quality={90}
            placeholderUrl={portraitColumn.image.base64Thumbnail}
            priority={lineNumber === 1}
          />
        </div>
      ),
    }
  }
}

type GetGridItemsFromImageLineProps = {
  line: DesignItem['imagesProductPage'][number]
  lineNumber: number
  isLastLine: boolean
}

const getGridItemsFromImageLine = ({
  line,
  lineNumber,
  isLastLine,
}: GetGridItemsFromImageLineProps): GridProps['gridItems'] => {
  const hasBorderBottom = {
    mobile: true,
    desktop: !isLastLine,
  }
  const hasBorderRightLandscape = {
    mobile: false,
    desktop: lineNumber > 2 ? false : true,
  }

  if (line.imageType === 'landscape') {
    return [
      {
        key: line.landscapeImage.title,
        gridColumn: {
          mobile: '1 / 3',
          desktop: lineNumber > 2 ? '1 / 4' : '1 / 3',
        },
        component: (
          <div
            className={cc([
              styles.imageContainer,
              { [styles.hasBorderBottom]: hasBorderBottom.desktop },
              { [styles.hasBorderBottomMobile]: hasBorderBottom.mobile },
              { [styles.hasBorderRight]: hasBorderRightLandscape.desktop },
              { [styles.hasBorderRightMobile]: hasBorderRightLandscape.mobile },
            ])}
          >
            <ImageWithPlaceholder
              src={line.landscapeImage.url}
              alt={line.landscapeImage.alt ?? line.landscapeImage.title}
              className={styles.image}
              width={line.landscapeImage.width}
              height={line.landscapeImage.height}
              quality={90}
              placeholderUrl={line.landscapeImage.base64Thumbnail}
              priority={lineNumber === 1}
            />
          </div>
        ),
      },
    ]
  } else {
    const portraitGridItems = []

    portraitGridItems.push(
      gridItemFromPortraitColumn({
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
      gridItemFromPortraitColumn({
        portraitColumn: line.secondColumn,
        lineNumber,
        columnNumber: 2,
        gridColumn: { mobile: '1', desktop: '2' },
        hasBorderBottom,
        hasBorderRight: {
          mobile: false,
          desktop:
            line.secondColumn.type === 'image' ||
            line.thirdColumn?.type === 'image',
        },
      })
    )

    if (line.thirdColumn) {
      portraitGridItems.push(
        gridItemFromPortraitColumn({
          portraitColumn: line.thirdColumn,
          lineNumber,
          columnNumber: 3,
          gridColumn: { mobile: '1', desktop: '3' },
          hasBorderBottom,
          hasBorderRight: { mobile: false, desktop: false },
        })
      )
    }

    return portraitGridItems
  }
}

const getGridItemsFromImageLines = (
  designItem: DesignItem
): GridProps['gridItems'] => {
  const gridItems: GridProps['gridItems'] = []

  designItem.imagesProductPage.forEach((imageLine, index) => {
    const isLastLine = index === designItem.imagesProductPage.length - 1

    if (index === 0) {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
          isLastLine,
        }),
        {
          key: 'product-presention',
          // make sure this is the last item in mobile
          order: { mobile: '100', desktop: 'unset' },
          component: <DesignProductPresentation {...designItem} />,
          gridColumn: { mobile: '1 / 3', desktop: '3' },
        }
      )
    } else if (index === 1) {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
          isLastLine,
        }),
        {
          key: `blank-${index + 1}`,
          component: (
            <div
              className={cc([styles.blankContainer, styles.hasBorderBottom])}
            />
          ),
          isHidden: { mobile: true, desktop: false },
          gridColumn: { mobile: 'auto', desktop: '3' },
        }
      )
    } else {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
          isLastLine,
        })
      )
    }
  })
  return gridItems
}

type DesignProductGridProps = {
  designItem: DesignItem
}

export const DesignProductGrid = ({
  designItem,
}: DesignProductGridProps): JSX.Element => (
  <Grid
    gridAutoRows={{
      mobile: 'auto',
      desktop: `calc(100vh - ${themeVars.sizes.headerLogoHeight.desktop} - ${themeVars.sizes.navItemHeight.desktop})`,
    }}
    gridTemplateColumns={{
      mobile: '1fr',
      desktop: 'repeat(3, 1fr)',
    }}
    gridItems={getGridItemsFromImageLines(designItem)}
  />
)
