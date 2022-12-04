import { globalStyle, style } from '@vanilla-extract/css'
import { themeVars } from '../../styles/theme.css'

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
  fontSize: '4vw',
  lineHeight: '5vw',
})

globalStyle('a', {
  color: themeVars.colors.fontPrimary,
  textDecoration: 'none',
})

export const scrollbarContainer = style({
  height: `calc(100vh - ${themeVars.sizes.headerLogoHeight} - ${themeVars.sizes.navItemHeight})`,
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
  fontSize: themeVars.font.xxl.size,
  lineHeight: themeVars.font.xxl.lineHeight,
  fontWeight: 700,
})
