import { style, createVar } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../styles/theme.css'

export const gridTemplateColumnsVar = createVar()
export const gridAutoRowsVar = createVar()
export const gridTemplateColumnsMobileVar = createVar()
export const gridAutoRowsMobileVar = createVar()
export const gridBackgroundColorVar = createVar()

const gridContainer = style({
  width: '100%',
  display: 'grid',
  justifyContent: 'center',
  backgroundColor: gridBackgroundColorVar,
  gridTemplateColumns: gridTemplateColumnsVar,
  gridAutoRows: gridAutoRowsVar,

  '@media': {
    [`${mediaQueries.mobile}`]: {
      gridTemplateColumns: gridTemplateColumnsMobileVar,
      gridAutoRows: gridAutoRowsMobileVar,
    },
  },
})

const containerBorderBottom = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderBottom: themeVars.borders.default,
    },
  },
})

const containerBorderBottomMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderBottom: themeVars.borders.default,
    },
  },
})

export const gridColumnVar = createVar()
export const gridColumnMobileVar = createVar()

const gridItem = style({
  gridColumn: gridColumnVar,

  '@media': {
    [`${mediaQueries.mobile}`]: {
      gridColumn: gridColumnMobileVar,
    },
  },
})

export const styles = {
  gridContainer,
  containerBorderBottom,
  containerBorderBottomMobile,
  gridItem,
}
