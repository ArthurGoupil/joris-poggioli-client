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
})

globalStyle('a', {
  color: themeVars.colors.fontPrimary,
  textDecoration: 'none',
})

export const scrollbarContainer = style({
  height: '100%',
})

export const mainContainer = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
})

export const scrollbarView = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'absolute',
  inset: '0px',
  overflow: 'scroll',
  marginRight: '-16px',
  marginBottom: '-16px',
})

export const scrollbarThumb = style({
  width: '15px',
  backgroundColor: 'black',
  position: 'absolute',
  right: '5px',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      display: 'none',
    },
  },
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
