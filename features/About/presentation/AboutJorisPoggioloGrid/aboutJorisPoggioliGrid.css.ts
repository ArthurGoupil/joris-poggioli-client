import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../../styles/theme.css'

const textContainer = style({
  padding: '2vw',
  minHeight: `calc(100vh - ${themeVars.sizes.headerLogoHeight} - ${themeVars.sizes.navItemHeight})`,
  textAlign: 'justify',
  borderRight: themeVars.borders.default,
})

const imageContainer = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  borderRight: themeVars.borders.default,
})

const image = style({
  width: '100%',
  height: 'auto',
  maxHeight: '100%',
  objectFit: 'cover',
})

export const styles = { textContainer, imageContainer, image }
