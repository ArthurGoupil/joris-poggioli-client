import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../../styles/theme.css'

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
  transition: 'opacity 0.3s',

  ':hover': {
    opacity: 0.6,
  },
})

const name = style({
  width: '66vw',
  height: '100%',
  padding: '2vw',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  left: '100%',
  pointerEvents: 'none',
  opacity: 0,
  transition: 'opacity 300ms',
  fontSize: '4vw',
  lineHeight: '4vw',
  fontWeight: 700,

  ':hover': {
    opacity: 1,
  },

  selectors: {
    [`${imageContainer}:hover &`]: {
      opacity: 1,
    },
  },
})

const hideBorderBottom = style({
  borderBottom: 'none',
})

export const styles = {
  imageContainer,
  image,
  hideBorderBottom,
  name,
}
