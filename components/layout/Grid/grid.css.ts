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
  backgroundColor: gridBackgroundColorVar,
  gridTemplateColumns: gridTemplateColumnsVar,
  gridAutoRows: gridAutoRowsVar,
  position: 'relative',

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
      '::after': {
        content: '',
        height: '1px',
        width: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1,
      },
    },
  },
})

export const gridColumnVar = createVar()
export const gridColumnMobileVar = createVar()
export const orderVar = createVar()
export const orderMobileVar = createVar()

const gridItem = style({
  gridColumn: gridColumnVar,
  order: orderVar,

  '@media': {
    [`${mediaQueries.mobile}`]: {
      gridColumn: gridColumnMobileVar,
      order: orderMobileVar,
    },
  },
})

const hide = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      display: 'none',
    },
  },
})
const hideMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      display: 'none',
    },
  },
})

export const styles = {
  gridContainer,
  containerBorderBottom,
  containerBorderBottomMobile,
  gridItem,
  hide,
  hideMobile,
}
