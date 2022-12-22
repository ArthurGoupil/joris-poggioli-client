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

      '::after': {
        content: '',
        height: '1px',
        width: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        top: '100%',
        zIndex: 1,
      },
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

const hideBorderRightMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderRight: 'none',
    },
  },
})

export const styles = {
  blankContainer,
  hideBorderBottom,
  hideBorderBottomMobile,
  hideBorderRightMobile,
  imageContainer,
  image,
}
