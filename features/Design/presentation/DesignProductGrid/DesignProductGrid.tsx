import Image from 'next/image'
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
  hideBorderBottom: Responsive<boolean>
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
      order: { mobile: `${lineNumber + columnNumber - 1}`, desktop: 'unset' },
      component: (
        <div
          className={cc([
            styles.blankContainer,
            { [styles.hideBorderBottom]: hideBorderBottom.desktop },
            { [styles.hideBorderBottomMobile]: hideBorderBottom.mobile },
          ])}
        />
      ),
    }
  } else {
    return {
      key: portraitColumn.image.title,
      gridColumn,
      order: { mobile: `${lineNumber + columnNumber - 1}`, desktop: 'unset' },
      component: (
        <div
          className={cc([
            styles.imageContainer,
            { [styles.hideBorderBottom]: hideBorderBottom.desktop },
            { [styles.hideBorderBottomMobile]: hideBorderBottom.mobile },
          ])}
        >
          <ImageWithPlaceholder
            src={portraitColumn.image.url}
            alt={portraitColumn.image.alt ?? portraitColumn.image.title}
            className={styles.image}
            priority
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            quality={50}
            placeholderUrl={portraitColumn.image.base64Thumbnail}
          />
        </div>
      ),
    }
  }
}

type GetGridItemsFromImageLineProps = {
  line: DesignItem['imagesProductPage'][number]
  lineNumber: number
  hideBorderBottom: Responsive<boolean>
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
        order: { mobile: lineNumber.toString(), desktop: 'unset' },
        gridColumn: { mobile: '1 / 3', desktop: '1 / 3' },
        component: (
          <div
            className={cc([
              styles.imageContainer,
              { [styles.hideBorderBottom]: hideBorderBottom.desktop },
              { [styles.hideBorderBottomMobile]: hideBorderBottom.mobile },
            ])}
          >
            <ImageWithPlaceholder
              src={line.landscapeImage.url}
              alt={line.landscapeImage.alt ?? line.landscapeImage.title}
              className={styles.image}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              quality={50}
              placeholderUrl={line.landscapeImage.base64Thumbnail}
            />
          </div>
        ),
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
    const hideBorderBottom = {
      mobile: false,
      desktop: index === designItem.imagesProductPage.length - 1,
    }

    if (index === 0) {
      gridItems.push(
        ...getGridItemsFromImageLine({
          line: imageLine,
          lineNumber: index + 1,
          hideBorderBottom,
        }),
        {
          key: 'product-presention',
          // make sure this is the last item in mobile
          order: { mobile: '100', desktop: 'unset' },
          component: <DesignProductPresentation designItem={designItem} />,
          gridColumn: { mobile: '1 / 3', desktop: '3 / 4' },
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
          isHidden: { mobile: true, desktop: false },
          gridColumn: { mobile: 'auto', desktop: '3 / 4' },
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
      mobile: 'auto',
      desktop: `calc(100vh - ${themeVars.sizes.headerLogoHeight.desktop} - ${themeVars.sizes.navItemHeight.desktop})`,
    }}
    gridTemplateColumns={{
      mobile: 'repeat(2, 1fr)',
      desktop: 'repeat(3, 1fr)',
    }}
    gridItems={getGridItemsFromImageLines(designItem)}
  />
)
