import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../styles/theme.css'

const footer = style({
  fontSize: '8vw',
  lineHeight: '10vw',
  letterSpacing: '2vw',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 700,
  backgroundColor: themeVars.colors.lightBackground,
  paddingTop: '2vw',
})

const footerLink = style({
  textDecoration: 'none',
  color: themeVars.colors.fontPrimary,
})

export const styles = { footer, footerLink }
