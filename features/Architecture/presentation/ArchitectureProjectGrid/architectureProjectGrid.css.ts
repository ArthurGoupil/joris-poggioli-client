import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'

const comingSoon = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 700,
  fontSize: themeVars.font.xl.size,
  lineHeight: themeVars.font.xl.lineHeight,
  letterSpacing: '5px',
})

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
  display: 'flex',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      position: 'static',
    },
  },
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

const hideBorderRight = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderRight: 'none',
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

const text = style({
  padding: '2vw',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      padding: themeVars.spacing.xl,
    },
  },
})

const back = style({
  textDecoration: 'underline',
  marginTop: '1vw',
  display: 'flex',
})

export const styles = {
  comingSoon,
  blankContainer,
  imageContainer,
  image,
  hideBorderBottom,
  hideBorderBottomMobile,
  hideBorderRight,
  hideBorderRightMobile,
  text,
  back,
}
