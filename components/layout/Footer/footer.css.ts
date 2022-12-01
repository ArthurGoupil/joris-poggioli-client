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
})

const footerLink = style({
  textDecoration: 'none',
  color: themeVars.colors.fontPrimary,
})

export const styles = { footer, footerLink }
