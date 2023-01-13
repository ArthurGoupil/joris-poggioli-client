import { styles } from './designProductGrid.css'
import cc from 'classcat'
import { Grid, GridProps } from '../../../../components/layout/Grid/Grid'
import { DesignItem, PortraitColumn } from '../../domain/entities/design'
import { DesignProductPresentation } from '../DesignProductPresentation/DesignProductPresentation'
import { themeVars } from '../../../../styles/theme.css'
import { Responsive } from '../../../shared/domain/entities/responsive'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'

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

type GetGridItemsFromImageLineProps = {
  designItem: DesignItem
  line: DesignItem['imagesProductPage'][number]
  lineNumber: number
  isLastLine: boolean
}

const getGridItemsFromImageLine = ({
  designItem,
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

  const gridItems = []

  const presentationItem = {
    key: 'product-presention',
    // make sure this is the last item in mobile
    order: { mobile: '100', desktop: 'unset' },
    component: <DesignProductPresentation {...designItem} />,
    gridColumn: { mobile: '1 / 3', desktop: '3' },
  }

  switch (line.imageType) {
    case 'landscape': {
      gridItems.push({
        key: line.landscapeImage.title,
        gridColumn: {
          mobile: '1',
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
              quality={100}
              placeholderUrl={line.landscapeImage.base64Thumbnail}
              priority={lineNumber === 1}
            />
          </div>
        ),
      })

      if (lineNumber === 1) {
        gridItems.push(presentationItem)
      }

      if (lineNumber === 2) {
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

      if (lineNumber === 1) {
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
        getGridItemFromPortraitColumn({
          portraitColumn: line.portraitColumn,
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
          key: line.landscapeImage.title,
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
                src={line.landscapeImage.url}
                alt={line.landscapeImage.alt ?? line.landscapeImage.title}
                className={styles.image}
                width={line.landscapeImage.width}
                height={line.landscapeImage.height}
                quality={100}
                placeholderUrl={line.landscapeImage.base64Thumbnail}
                priority={lineNumber === 1}
              />
            </div>
          ),
        }
      )

      break
    }
    case 'landscape-portrait': {
      gridItems.push(
        {
          key: line.landscapeImage.title,
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
                src={line.landscapeImage.url}
                alt={line.landscapeImage.alt ?? line.landscapeImage.title}
                className={styles.image}
                width={line.landscapeImage.width}
                height={line.landscapeImage.height}
                quality={100}
                placeholderUrl={line.landscapeImage.base64Thumbnail}
                priority={lineNumber === 1}
              />
            </div>
          ),
        },
        getGridItemFromPortraitColumn({
          portraitColumn: line.portraitColumn,
          lineNumber,
          columnNumber: 1,
          gridColumn: { mobile: '1', desktop: '3 / 4' },
          hasBorderBottom,
          hasBorderRight: {
            mobile: false,
            desktop: true,
          },
        })
      )

      break
    }
  }

  return gridItems
}

const getGridItemsFromImageLines = (
  designItem: DesignItem
): GridProps['gridItems'] =>
  designItem.imagesProductPage.reduce<GridProps['gridItems']>(
    (gridItems, imageLine, index) => {
      const isLastLine = index === designItem.imagesProductPage.length - 1

      gridItems.push(
        ...getGridItemsFromImageLine({
          designItem,
          line: imageLine,
          lineNumber: index + 1,
          isLastLine,
        })
      )

      return gridItems
    },
    []
  )

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
