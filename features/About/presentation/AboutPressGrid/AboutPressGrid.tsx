import { Grid } from '../../../../components/layout/Grid/Grid'
import { themeVars } from '../../../../styles/theme.css'
import { AboutPress } from '../../domain/entities/press'
import { ImageGridItem } from '../../../../components/layout/Grid/ImageGridItem/ImageGridItem'

type AboutPressGridProps = {
  pressItems: AboutPress[]
}

export const AboutPressGrid = ({
  pressItems,
}: AboutPressGridProps): JSX.Element => {
  const firstlastRowItemIndex = {
    mobile:
      pressItems.length % 2 === 0
        ? pressItems.length - 2
        : pressItems.length - 1,
    desktop:
      pressItems.length % 3 === 0
        ? pressItems.length - 3
        : pressItems.length - (pressItems.length % 3),
  }

  return (
    <Grid
      gridTemplateColumns={{
        mobile: 'repeat(2, 1fr)',
        desktop: 'repeat(3, 1fr)',
      }}
      gridAutoRows={{ mobile: '55vw', desktop: '30vw' }}
      gridBackgroundColor={themeVars.colors.background}
      hasBorderBottom={{ mobile: true, desktop: true }}
      gridItems={pressItems.map((item, index) => {
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
            return '2 / 3'
          }
          return '3 / 4'
        }

        const getMobileGridColumn = (): string => {
          if (isSecondColumn.mobile) {
            return '2'
          }

          return '1'
        }

        return {
          key: item.id.toString(),
          gridColumn: {
            mobile: getMobileGridColumn(),
            desktop: getGridColumn(),
          },
          component: (
            <ImageGridItem
              src={item.cover.url}
              base64Thumbnail={item.cover.base64Thumbnail}
              alt={item.cover.alt ?? item.cover.title}
              title={item.name}
              subtitle={item.year}
              href={item.pdf ?? item.link ?? '#'}
              hasBorderRight={{
                mobile: index === 0 || index % 2 === 0,
                desktop: isFirstColumn.desktop || isSecondColumn.desktop,
              }}
              hasBorderBottom={{
                mobile: index < firstlastRowItemIndex.mobile,
                desktop: index < firstlastRowItemIndex.desktop,
              }}
              hasTargetBlank
            />
          ),
        }
      })}
    />
  )
}
