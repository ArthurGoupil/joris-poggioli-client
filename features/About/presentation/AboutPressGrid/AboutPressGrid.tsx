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
  const firstlastRowItemIndex = pressItems
    ? pressItems.length % 3 === 0
      ? pressItems.length - 3
      : pressItems.length - (pressItems.length % 3)
    : 0

  return (
    <Grid
      gridTemplateColumns={{ mobile: null, desktop: 'repeat(3, 1fr)' }}
      gridAutoRows={{ mobile: null, desktop: '30vw' }}
      gridBackgroundColor={themeVars.colors.background}
      gridItems={pressItems.map((item, index) => {
        const isFirstColumn = index === 0 || index % 3 === 0
        const isSecondColumn = (index - 1) % 3 === 0

        const getGridColumn = (): string => {
          if (isFirstColumn) {
            return '1'
          }
          if (isSecondColumn) {
            return '2 / 3'
          }
          return '3 / 4'
        }

        return {
          key: item.id.toString(),
          gridColumn: { mobile: null, desktop: getGridColumn() },
          component: (
            <ImageGridItem
              src={item.cover.url}
              alt={item.cover.alt ?? item.cover.title}
              title={item.name}
              subtitle={item.year}
              href={item.pdf}
              hasBorderRight={{
                mobile: null,
                desktop: isFirstColumn || isSecondColumn,
              }}
              hasBorderBottom={{
                mobile: null,
                desktop: index < firstlastRowItemIndex,
              }}
              hasTargetBlank
            />
          ),
        }
      })}
    />
  )
}
