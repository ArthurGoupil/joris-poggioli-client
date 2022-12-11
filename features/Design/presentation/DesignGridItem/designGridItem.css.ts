import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../../styles/theme.css'

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
  borderRight: themeVars.borders.default,
})

const containerBorderBottom = style({
  borderBottom: themeVars.borders.default,
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
})

const imageTitle = style({
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
  imageTitle,
  containerBorderRight,
  containerBorderBottom,
}
