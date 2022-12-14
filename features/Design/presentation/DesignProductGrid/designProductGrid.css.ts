import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'

const blankContainer = style({
  width: '100%',
  height: '100%',
  borderRight: themeVars.borders.default,
  borderBottom: themeVars.borders.default,
})

const imageContainer = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  borderRight: themeVars.borders.default,
  borderBottom: themeVars.borders.default,

  '@media': {
    [`${mediaQueries.mobile}`]: {
      height: '70vw',
    },
  },
})

const image = style({
  width: '100%',
  height: 'auto',
  maxHeight: '100%',
  objectFit: 'cover',
})

const hideBorderBottom = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderBottom: 'none',
    },
  },
})
const hideBorderBottomMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderBottom: 'none',
    },
  },
})

export const styles = {
  blankContainer,
  hideBorderBottom,
  hideBorderBottomMobile,
  imageContainer,
  image,
}
