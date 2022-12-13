import Image from 'next/image'
import { styles } from './designProductGrid.css'
import cc from 'classcat'
import { Grid, GridProps } from '../../../../components/layout/Grid/Grid'
import { DesignItem, PortraitColumn } from '../../domain/entities/design'
import { DesignProductPresentation } from '../DesignProductPresentation/DesignProductPresentation'
import { themeVars } from '../../../../styles/theme.css'
import { Responsive } from '../../../shared/domain/entities/responsive'

type GridItemFromPortraitColumnProps = {
  portraitColumn: PortraitColumn
  lineNumber: number
  columnNumber: number
  gridColumn: Responsive<string>
  hideBorderBottom: boolean
}

const gridItemFromPortraitColumn = ({
  portraitColumn,
  lineNumber,
  columnNumber,
  gridColumn,
  hideBorderBottom,
}: GridItemFromPortraitColumnProps): GridProps['gridItems'][number] => {
  if (portraitColumn.type === 'blank') {
    return {
      key: `blank-${lineNumber}-${columnNumber}`,
      gridColumn,
      component: (
        <div
          className={cc([
            styles.blankContainer,
            { [styles.hideBorderBottom]: hideBorderBottom },
          ])}
        />
      ),
    }
  } else {
    return {
      key: portraitColumn.image.title,
      gridColumn,
      component: (
        <div
          className={cc([
            styles.imageContainer,
            { [styles.hideBorderBottom]: hideBorderBottom },
          ])}
        >
          <Image
            src={portraitColumn.image.url}
            alt={portraitColumn.image.alt ?? portraitColumn.image.title}
            className={styles.image}
            priority
            fill
            sizes="33vw"
            quality={20}
          />
        </div>
      ),
    }
  }
}

type GetGridItemsFromImageLineProps = {
  line: DesignItem['imagesProductPage'][number]
  lineNumber: number
  hideBorderBottom: boolean
}

const getGridItemsFromImageLine = ({
  line,
  lineNumber,
  hideBorderBottom,
}: GetGridItemsFromImageLineProps): GridProps['gridItems'] => {
  if (line.imageType === 'landscape') {
    return [
      {
        key: line.landscapeImage.title,
        component: (
          <div
            className={cc([
              styles.imageContainer,
              { [styles.hideBorderBottom]: hideBorderBottom },
            ])}
          >
            <Image
              src={line.landscapeImage.url}
              alt={line.landscapeImage.alt ?? line.landscapeImage.title}
              className={styles.image}
              priority
              fill
              sizes="66vw"
              quality={20}
            />
          </div>
        ),
        gridColumn: { mobile: '1 / 3', desktop: '1 / 3' },
      },
    ]
  } else {
    return [
      gridItemFromPortraitColumn({
        portraitColumn: line.firstColumn,
        lineNumber,
        columnNumber: 1,
        gridColumn: { mobile: '1', desktop: '1' },
        hideBorderBottom,
      }),
      gridItemFromPortraitColumn({
        portraitColumn: line.secondColumn,
        lineNumber,
        columnNumber: 2,
        gridColumn: { mobile: '2', desktop: '2 / 3' },
        hideBorderBottom,
      }),
    ]
  }
}

const getGridItemsFromImageLines = (
  designItem: DesignItem
): GridProps['gridItems'] => {
  const gridItems: GridProps['gridItems'] = []

  designItem.imagesProductPage.forEach((imageLine, index) => {
    const hideBorderBottom = index === designItem.imagesProductPage.length - 1

    if (index === 0) {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
          hideBorderBottom,
        }),
        {
          key: 'product-presention',
          component: <DesignProductPresentation designItem={designItem} />,
          gridColumn: { mobile: '1 / 3', desktop: '3 / 4' },
        }
      )
    } else if (index === 1) {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
          hideBorderBottom,
        }),
        {
          key: 'technical-sheet',
          component: null,
          gridColumn: { mobile: null, desktop: '3 / 4' },
        }
      )
    } else {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
          hideBorderBottom,
        }),
        {
          key: `blank-${index + 1}`,
          component: <div />,
          gridColumn: { mobile: null, desktop: '3 / 4' },
        }
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
      mobile: '70vw',
      desktop: `calc(100vh - ${themeVars.sizes.headerLogoHeight} - ${themeVars.sizes.navItemHeight.small})`,
    }}
    gridTemplateColumns={{
      mobile: 'repeat(2, 1fr)',
      desktop: 'repeat(3, 1fr)',
    }}
    gridItems={getGridItemsFromImageLines(designItem)}
  />
)
