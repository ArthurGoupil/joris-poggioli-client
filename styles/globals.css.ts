import { globalStyle, style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from './theme.css'

globalStyle('*', {
  boxSizing: 'border-box',
})

globalStyle('html, body', {
  padding: 0,
  margin: 0,
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
  flexGrow: 1,
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
  height: '100%',
})

globalStyle('.simplebar-track.simplebar-vertical', {
  width: '20px',
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
