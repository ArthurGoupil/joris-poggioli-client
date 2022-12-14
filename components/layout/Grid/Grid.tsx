import {
  gridAutoRowsMobileVar,
  gridAutoRowsVar,
  gridBackgroundColorVar,
  gridColumnMobileVar,
  gridColumnVar,
  gridTemplateColumnsMobileVar,
  gridTemplateColumnsVar,
  orderMobileVar,
  orderVar,
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
  order?: Responsive<string>
  isHidden?: Responsive<boolean>
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
    {gridItems.map(
      ({
        key,
        gridColumn,
        component,
        order,
        isHidden = { mobile: false, desktop: false },
      }) => (
        <div
          key={key}
          className={cc([
            styles.gridItem,
            {
              [styles.hide]: isHidden.desktop,
              [styles.hideMobile]: isHidden.mobile,
            },
          ])}
          style={assignInlineVars({
            [gridColumnVar]: gridColumn.desktop,
            [gridColumnMobileVar]: gridColumn.mobile,
            [orderVar]: order?.desktop ?? 'unset',
            [orderMobileVar]: order?.mobile ?? 'unset',
          })}
        >
          {component}
        </div>
      )
    )}
  </div>
)
