import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'

const blankContainer = style({
  width: '100%',
  height: '100%',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      display: 'none',
    },
  },
})

const imageContainer = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
})

const image = style({
  width: '100%',
  height: 'auto',
  maxHeight: '100%',
  objectFit: 'cover',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      objectFit: 'contain',
    },
  },
})

const hasBorderBottom = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderBottom: themeVars.borders.default,
    },
  },
})
const hasBorderBottomMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderBottom: themeVars.borders.default,
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

const hasBorderRight = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderRight: themeVars.borders.default,
    },
  },
})
const hasBorderRightMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderRight: themeVars.borders.default,
      '::before': {
        content: '',
        height: '100%',
        width: '1px',
        backgroundColor: 'black',
        position: 'absolute',
        left: '100%',
        zIndex: 1,
      },
    },
  },
})

export const styles = {
  blankContainer,
  hasBorderBottom,
  hasBorderBottomMobile,
  hasBorderRight,
  hasBorderRightMobile,
  imageContainer,
  image,
}
