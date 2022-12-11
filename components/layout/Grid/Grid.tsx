import {
  gridAutoRowsVar,
  gridBackgroundColorVar,
  gridColumnVar,
  gridTemplateColumnsVar,
  styles,
} from './grid.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { themeVars } from '../../../styles/theme.css'

type GridItem = {
  key: string
  gridColumn: string
  component: React.ReactNode
}

export type GridProps = {
  gridItems: GridItem[]
  gridTemplateColumns: string
  gridAutoRows: string
  gridBackgroundColor?: string
}

export const Grid = ({
  gridItems,
  gridTemplateColumns,
  gridAutoRows,
  gridBackgroundColor = themeVars.colors.lightBackground,
}: GridProps): JSX.Element => (
  <div
    className={styles.gridContainer}
    style={assignInlineVars({
      [gridAutoRowsVar]: gridAutoRows,
      [gridTemplateColumnsVar]: gridTemplateColumns,
      [gridBackgroundColorVar]: gridBackgroundColor,
    })}
  >
    {gridItems.map(({ key, gridColumn, component }) => (
      <div
        key={key}
        className={styles.gridItem}
        style={assignInlineVars({
          [gridColumnVar]: gridColumn,
        })}
      >
        {component}
      </div>
    ))}
  </div>
)
