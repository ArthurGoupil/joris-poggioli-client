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

const disableImagePadding = style({
  padding: 0,
  objectFit: 'cover',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      padding: 0,
      objectFit: 'cover',
    },
  },
})

const imageTitleContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  wordBreak: 'break-word',
  position: 'absolute',
  fontSize: '4vw',
  lineHeight: '4vw',
  fontWeight: 700,
  textAlign: 'center',
  opacity: 0,
  transition: 'opacity 0.3s',
  color: themeVars.colors.fontPrimary,
  padding: '3vw',

  selectors: {
    [`${itemContainer}:hover &`]: {
      opacity: 1,
    },
  },

  '@media': {
    [`${mediaQueries.mobile}`]: {
      display: 'none',
    },
  },
})

const smallTitle = style({
  fontSize: '3.5vw',
  lineHeight: '3.5vw',
})

export const styles = {
  itemContainer,
  image,
  disableImagePadding,
  imageTitleContainer,
  smallTitle,
  containerBorderRight,
  containerBorderBottom,
  containerBorderRightMobile,
  containerBorderBottomMobile,
}
