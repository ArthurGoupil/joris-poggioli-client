import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../../styles/theme.css'

const name = style({
  height: '100%',
  padding: '2vw',
  fontSize: '5vw',
  lineHeight: '5vw',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
})

const imageContainer = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  cursor: 'pointer',
  borderRight: themeVars.borders.default,
  borderBottom: themeVars.borders.default,
})

const image = style({
  width: '100%',
  height: 'auto',
  maxHeight: '100%',
  objectFit: 'cover',
  transition: 'filter 0.3s',

  ':hover': {
    filter: 'brightness(0.9)',
  },
})

const hideBorderBottom = style({
  borderBottom: 'none',
})

export const styles = { imageContainer, image, hideBorderBottom, name }
