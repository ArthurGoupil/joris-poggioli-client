import { Grid } from '../../../../components/layout/Grid/Grid'
import { DesignItem } from '../../domain/entities/design'
import { themeVars } from '../../../../styles/theme.css'
import { getGridItemsFromImageLines } from '../../../shared/presentation/GridItems/GridItems'

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
    gridItems={getGridItemsFromImageLines({
      lines: designItem.imagesProductPage,
      type: 'design',
      designItem,
    })}
  />
)
