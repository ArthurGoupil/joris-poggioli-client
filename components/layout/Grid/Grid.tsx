import {
  gridAutoRowsMobileVar,
  gridAutoRowsVar,
  gridBackgroundColorVar,
  gridColumnMobileVar,
  gridColumnVar,
  gridTemplateColumnsMobileVar,
  gridTemplateColumnsVar,
  styles,
} from './grid.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { themeVars } from '../../../styles/theme.css'
import { Responsive } from '../../../features/shared/domain/entities/responsive'
import cc from 'classcat'

type GridItem = {
  key: string
  gridColumn: Responsive<string>
  component: React.ReactNode
}

export type GridProps = {
  gridItems: GridItem[]
  gridTemplateColumns: Responsive<string>
  gridAutoRows: Responsive<string>
  gridBackgroundColor?: string
  hasBorderBottom?: Responsive<boolean>
}

export const Grid = ({
  gridItems,
  gridTemplateColumns,
  gridAutoRows,
  gridBackgroundColor = themeVars.colors.lightBackground,
  hasBorderBottom = { mobile: false, desktop: true },
}: GridProps): JSX.Element => (
  <div
    className={cc([
      styles.gridContainer,
      {
        [styles.containerBorderBottom]: hasBorderBottom.desktop,
        [styles.containerBorderBottomMobile]: hasBorderBottom.mobile,
      },
    ])}
    style={assignInlineVars({
      [gridTemplateColumnsVar]: gridTemplateColumns.desktop,
      [gridAutoRowsVar]: gridAutoRows.desktop,
      [gridTemplateColumnsMobileVar]: gridTemplateColumns.mobile,
      [gridAutoRowsMobileVar]: gridAutoRows.mobile,
      [gridBackgroundColorVar]: gridBackgroundColor,
    })}
  >
    {gridItems.map(({ key, gridColumn, component }) => (
      <div
        key={key}
        className={styles.gridItem}
        style={assignInlineVars({
          [gridColumnVar]: gridColumn.desktop,
          [gridColumnMobileVar]: gridColumn.mobile,
        })}
      >
        {component}
      </div>
    ))}
  </div>
)
