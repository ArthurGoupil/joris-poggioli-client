import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../styles/theme.css'

const headerContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: themeVars.colors.lightBackground,
  zIndex: 1,
})

const logo = style({
  width: '100%',
  height: themeVars.sizes.headerLogoHeight,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 700,
  fontSize: themeVars.font.xl.size,
  letterSpacing: '6.4px',
  color: themeVars.colors.fontPrimary,
  textDecoration: 'none',
})

const navList = style({
  width: '100%',
  display: 'flex',
  listStyleType: 'none',
})

export const styles = { headerContainer, logo, navList }
