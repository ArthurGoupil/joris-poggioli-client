import { style, createVar } from '@vanilla-extract/css'
import { themeVars } from '../../../styles/theme.css'

export const gridTemplateColumnsVar = createVar()
export const gridAutoRowsVar = createVar()

const gridContainer = style({
  width: '100%',
  display: 'grid',
  justifyContent: 'center',
  backgroundColor: themeVars.colors.background,
  gridAutoRows: gridAutoRowsVar,
  gridTemplateColumns: gridTemplateColumnsVar,
  borderBottom: themeVars.borders.default,
})

export const gridColumnVar = createVar()

const gridItem = style({
  gridColumn: gridColumnVar,
})

export const styles = {
  gridItem,
  gridContainer,
}
