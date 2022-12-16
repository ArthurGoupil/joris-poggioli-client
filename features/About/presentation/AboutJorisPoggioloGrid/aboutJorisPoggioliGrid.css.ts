import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'

const textContainer = style({
  padding: '2vw',
  minHeight: `calc(100vh - ${themeVars.sizes.headerLogoHeight.desktop} - ${themeVars.sizes.navItemHeight.desktop})`,
  textAlign: 'justify',
  borderRight: themeVars.borders.default,

  '@media': {
    [`${mediaQueries.mobile}`]: {
      minHeight: `calc(100vh - ${themeVars.sizes.headerLogoHeight.mobile} - ${themeVars.sizes.navItemHeight.mobile})`,
      borderRight: 'none',
      padding: themeVars.spacing.xl,
    },
  },
})

const imageContainer = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  borderRight: themeVars.borders.default,

  '@media': {
    [`${mediaQueries.mobile}`]: {
      height: '90vh',
      borderTop: themeVars.borders.default,
      borderRight: 'none',
    },
  },
})

const image = style({
  width: '100%',
  height: 'auto',
  maxHeight: '100%',
  objectFit: 'cover',
})

export const styles = { textContainer, imageContainer, image }
