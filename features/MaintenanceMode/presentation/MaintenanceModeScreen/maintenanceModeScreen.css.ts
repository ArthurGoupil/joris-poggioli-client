import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'

const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  width: '100%',
  height: '100%',
})

const background = style({
  objectFit: 'cover',
  position: 'absolute',
})

const hideMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      display: 'none',
    },
  },
})
const hideDesktop = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      display: 'none',
    },
  },
})

const logo = style({
  width: '400px',
  height: 'auto',
  maxWidth: '80vw',
  zIndex: 1,
})

const text = style({
  position: 'absolute',
  bottom: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: themeVars.spacing.xl,
  fontSize: themeVars.font.l.size,
  lineHeight: themeVars.font.l.lineHeight,
})

const link = style({
  ':hover': {
    textDecoration: 'underline',
  },
})

export const styles = {
  container,
  background,
  hideMobile,
  hideDesktop,
  logo,
  text,
  link,
}
