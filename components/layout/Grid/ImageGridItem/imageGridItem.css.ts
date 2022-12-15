import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'

const itemContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  transition: 'background-color 0.5s',
  cursor: 'pointer',
  height: '100%',
  backgroundColor: themeVars.colors.background,

  selectors: {
    '&:hover': {
      backgroundColor: themeVars.colors.lightBackground,
    },
  },
})

const containerBorderRight = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderRight: themeVars.borders.default,
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

const containerBorderRightMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderRight: themeVars.borders.default,
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

const image = style({
  width: '100%',
  height: 'auto',
  maxHeight: '100%',
  objectFit: 'contain',
  transition: 'opacity 0.3s',
  padding: '3vw',

  selectors: {
    [`${itemContainer}:hover &`]: {
      opacity: 0.4,
    },
  },

  '@media': {
    [`${mediaQueries.mobile}`]: {
      padding: themeVars.spacing.xl,
    },
  },
})

const imageTitleContainer = style({
  position: 'absolute',
  fontSize: '4vw',
  lineHeight: '4vw',
  fontWeight: 700,
  textAlign: 'center',
  opacity: 0,
  transition: 'opacity 0.3s',
  color: themeVars.colors.fontPrimary,

  selectors: {
    [`${itemContainer}:hover &`]: {
      opacity: 1,
    },
  },
})

export const styles = {
  itemContainer,
  image,
  imageTitleContainer,
  containerBorderRight,
  containerBorderBottom,
  containerBorderRightMobile,
  containerBorderBottomMobile,
}
