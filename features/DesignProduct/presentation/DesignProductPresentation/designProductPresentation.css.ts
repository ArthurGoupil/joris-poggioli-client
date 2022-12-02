import { globalStyle, style } from '@vanilla-extract/css'
import { themeVars } from '../../../../styles/theme.css'

const presentationContainer = style({
  width: '100%',
  minHeight: '100%',
  padding: '2vw',
  borderBottom: themeVars.borders.default,
  position: 'relative',
})

const titleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
})

const back = style({
  textDecoration: 'none',
  fontSize: '2vw',
  lineHeight: '4vw',
  fontWeight: 500,
  marginRight: themeVars.spacing.l,

  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

const title = style({
  marginBottom: '1vw',
})

const paragraph = style({
  marginBottom: '1.5vw',
})

const freeText = style({
  whiteSpace: 'pre-wrap',
})

const buttonContainer = style({
  width: '100%',
  position: 'absolute',
  top: 'calc(100% + 1px)',
  left: 0,
})

const technicalSheet = style({
  width: '100%',
  border: 'none',
  backgroundColor: themeVars.colors.greyAccent,
  minHeight: '35px',
  cursor: 'pointer',
  borderBottom: themeVars.borders.default,
  transition: 'filter 300ms',

  selectors: {
    '&:hover': {
      filter: 'brightness(0.95)',
    },
  },
})

const priceInformation = style({
  width: '100%',
  border: 'none',
  backgroundColor: 'black',
  minHeight: '35px',
  cursor: 'pointer',
  borderBottom: themeVars.borders.default,
  transition: 'background-color 300ms',

  selectors: {
    '&:hover': {
      backgroundColor: '#212121',
    },
  },
})

globalStyle(`${priceInformation} a`, {
  color: 'white',
})

const link = style({
  textDecoration: 'none',
})

export const styles = {
  presentationContainer,
  titleContainer,
  back,
  title,
  paragraph,
  freeText,
  buttonContainer,
  technicalSheet,
  priceInformation,
  link,
}
