import React from 'react'
import { Grid } from '../../../../components/layout/Grid/Grid'
import { ImageGridItem } from '../../../../components/layout/Grid/ImageGridItem/ImageGridItem'
import { useLoadedImagesCount } from '../../../../context/loaded-images-count.context'
import { themeVars } from '../../../../styles/theme.css'
import { IMAGES_TO_LOAD_BEFORE_DISPLAY } from '../../../shared/constants/image-loading'
import { DesignItem } from '../../domain/entities/design'

type DesignProductsListGridProps = {
  designItems: DesignItem[]
  gridKey?: string
}

export const DesignProductsListGrid = ({
  designItems,
  gridKey,
}: DesignProductsListGridProps): JSX.Element | null => {
  const firstlastRowItemIndex = {
    mobile:
      designItems.length % 2 === 0
        ? designItems.length - 2
        : designItems.length - 1,
    desktop:
      designItems.length % 3 === 0
        ? designItems.length - 3
        : designItems.length - (designItems.length % 3),
  }

  const { imagesToLoad, setImagesToLoad, setLoadedImagesCount } =
    useLoadedImagesCount()

  React.useEffect(() => {
    setImagesToLoad(
      designItems.length < IMAGES_TO_LOAD_BEFORE_DISPLAY
        ? designItems.length
        : IMAGES_TO_LOAD_BEFORE_DISPLAY
    )
  }, [designItems.length, setImagesToLoad])

  if (!imagesToLoad) {
    return null
  }

  return (
    <Grid
      key={gridKey}
      gridTemplateColumns={{
        mobile: 'repeat(2, 1fr)',
        desktop: 'repeat(3, 1fr)',
      }}
      gridAutoRows={{ mobile: '55vw', desktop: '40vw' }}
      gridBackgroundColor={themeVars.colors.background}
      hasBorderBottom={{ mobile: true, desktop: true }}
      gridItems={designItems.map((item, index) => {
        const isFirstColumn = { desktop: index === 0 || index % 3 === 0 }
        const isSecondColumn = {
          mobile: (index + 1) % 2 === 0,
          desktop: (index - 1) % 3 === 0,
        }

        const getGridColumn = (): string => {
          if (isFirstColumn.desktop) {
            return '1'
          }
          if (isSecondColumn.desktop) {
            return '2'
          }
          return '3'
        }

        const getMobileGridColumn = (): string => {
          if (isSecondColumn.mobile) {
            return '2'
          }

          return '1'
        }

        return {
          key: item.id,
          gridColumn: {
            mobile: getMobileGridColumn(),
            desktop: getGridColumn(),
          },
          component: (
            <ImageGridItem
              src={item.imageGrid.url}
              base64Thumbnail={item.imageGrid.base64Thumbnail}
              alt={item.imageGrid.alt ?? item.imageGrid.title}
              title={item.name}
              href={`/design/${item.designTypeSlug}/${item.slug}`}
              hasBorderRight={{
                mobile: index === 0 || index % 2 === 0,
                desktop: isFirstColumn.desktop || isSecondColumn.desktop,
              }}
              hasBorderBottom={{
                mobile: index < firstlastRowItemIndex.mobile,
                desktop: index < firstlastRowItemIndex.desktop,
              }}
              onLoadingComplete={(): void => {
                // we want the 6 first images to be loaded before displaying the page
                if (index < imagesToLoad) {
                  setLoadedImagesCount((count) => count + 1)
                }
              }}
              priority={index < 6}
            />
          ),
        }
      })}
    />
  )
}
