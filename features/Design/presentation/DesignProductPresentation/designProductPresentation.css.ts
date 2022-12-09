import { globalStyle, style } from '@vanilla-extract/css'
import { themeVars } from '../../../../styles/theme.css'

const presentationContainer = style({
  width: '100%',
  minHeight: '100%',
  padding: '2vw',
  borderBottom: themeVars.borders.default,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const titleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
})

const paragraph = style({
  marginBottom: '1.5vw',
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

const back = style({
  textDecoration: 'underline',
  marginTop: '1vw',
  display: 'flex',
})

export const styles = {
  presentationContainer,
  titleContainer,
  back,
  paragraph,
  buttonContainer,
  technicalSheet,
  priceInformation,
  link,
}
