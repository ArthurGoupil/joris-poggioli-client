import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from './theme.css'

globalStyle('*', {
  boxSizing: 'border-box',
})

globalStyle('html, body', {
  padding: 0,
  margin: 0,
})

globalStyle('html, body', {
  overflow: 'hidden',
})

globalStyle('body', {
  color: themeVars.colors.fontPrimary,
  backgroundColor: themeVars.colors.lightBackground,
  overflowY: 'hidden',
})

globalStyle('button', {
  margin: 0,
})

globalStyle('body, button, pre', {
  fontFamily: themeVars.fontFamily,
  fontSize: themeVars.font.base.size,
  lineHeight: themeVars.font.base.lineHeight,
})

globalStyle('body ::-webkit-scrollbar', {
  visibility: 'hidden',
})

globalStyle('main', {
  minHeight: `calc(100% - ${themeVars.sizes.footerHeight.desktop})`,
  display: 'flex',
  flexDirection: 'column',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      minHeight: `calc(100% - ${themeVars.sizes.footerHeight.mobile})`,
    },
  },
})

globalStyle('h2', {
  fontWeight: 700,
  fontSize: '3vw',
  lineHeight: '3.5vw',
  marginBottom: '2vw',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      fontSize: themeVars.font.l.size,
      lineHeight: themeVars.font.l.lineHeight,
      marginBottom: themeVars.spacing.l,
    },
  },
})

globalStyle('a', {
  color: themeVars.colors.fontPrimary,
  textDecoration: 'none',
})

export const scrollbarContainer = style({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
})

export const mainContainer = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
})

export const scrollbarView = style({
  flex: 1,
})

globalStyle('.simplebar-offset', {
  display: 'flex',
})
globalStyle('.simplebar-content-wrapper', {
  flex: 1,
})
globalStyle('.simplebar-content', {
  height: '100%',
})
globalStyle('.simplebar-track.simplebar-vertical', {
  width: '20px',
})
globalStyle('.simplebar-track.simplebar-vertical', {
  '@media': {
    [`${mediaQueries.mobile}`]: {
      display: 'none',
    },
  },
})
globalStyle('.simplebar-scrollbar::before', {
  width: '15px',
  background: 'black',
  borderRadius: 0,
})
globalStyle('.simplebar-scrollbar.simplebar-visible:before', {
  opacity: 1,
})
globalStyle('.simplebar-track.simplebar-vertical .simplebar-scrollbar:before', {
  top: 0,
  bottom: 0,
})

export const notFoundContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  flexGrow: 1,
})

export const notFound = style({
  fontSize: themeVars.font.xl.size,
  lineHeight: themeVars.font.xl.lineHeight,
  fontWeight: 700,
  textAlign: 'center',
})

export const mobileHeightVar = createVar()

export const imageHomeContainer = style({
  width: '100%',
  position: 'relative',

  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderBottom: themeVars.borders.default,
      height: `calc(100vh - ${themeVars.sizes.headerLogoHeight.desktop} - ${themeVars.sizes.navItemHeight.desktop})`,
    },
    [`${mediaQueries.mobile}`]: {
      height: `calc(${mobileHeightVar} - ${themeVars.sizes.headerLogoHeight.mobile} - ${themeVars.sizes.navItemHeight.mobile})`,
      '::after': {
        content: '',
        height: '1px',
        width: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1,
      },
    },
  },
})

export const imageHomeDesktop = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      display: 'none',
    },
  },
})

export const imageHomeMobile = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',

  '@media': {
    [`${mediaQueries.desktop}`]: {
      display: 'none',
    },
  },
})
