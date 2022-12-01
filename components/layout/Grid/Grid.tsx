import {
  gridAutoRowsVar,
  gridColumnVar,
  gridTemplateColumnsVar,
  styles,
} from './grid.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type GridItem = {
  key: string
  gridColumn: string
  component: React.ReactNode
}

export type GridProps = {
  gridItems: GridItem[]
  gridTemplateColumns: string
  gridAutoRows: string
}

export const Grid = ({
  gridItems,
  gridTemplateColumns,
  gridAutoRows,
}: GridProps): JSX.Element => (
  <div
    className={styles.gridContainer}
    style={assignInlineVars({
      [gridAutoRowsVar]: gridAutoRows,
      [gridTemplateColumnsVar]: gridTemplateColumns,
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
