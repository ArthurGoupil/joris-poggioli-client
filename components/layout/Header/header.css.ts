import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../styles/theme.css'

const headerContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: themeVars.colors.lightBackground,
  zIndex: 1,
})

const logoContainer = style({
  width: '100%',
  height: themeVars.sizes.headerLogoHeight.desktop,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      height: themeVars.sizes.headerLogoHeight.mobile,
    },
  },
})

const logo = style({
  width: '450px',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      width: '70vw',
    },
  },
})

const nav = style({
  width: '100%',
})

const navList = style({
  width: '100%',
  display: 'flex',
  listStyleType: 'none',
})

export const styles = { headerContainer, logoContainer, logo, nav, navList }
