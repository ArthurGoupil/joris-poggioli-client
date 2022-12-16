import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../styles/theme.css'

const footer = style({
  fontSize: '8vw',
  lineHeight: '10vw',
  letterSpacing: '2vw',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 700,
  backgroundColor: themeVars.colors.lightBackground,
  paddingTop: '2vw',
  height: themeVars.sizes.footerHeight,

  '@media': {
    [`${mediaQueries.mobile}`]: {
      paddingTop: themeVars.spacing.l,
      paddingBottom: themeVars.spacing.l,
    },
  },
})

const footerLink = style({
  color: themeVars.colors.fontPrimary,
})

const logo = style({ width: '90vw', height: 'auto' })

export const styles = { footer, footerLink, logo }
