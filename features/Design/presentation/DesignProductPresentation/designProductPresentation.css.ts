import { globalStyle, style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'

const presentationContainer = style({
  width: '100%',
  minHeight: '100%',
  borderBottom: themeVars.borders.default,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const textContainer = style({
  padding: '2vw 2vw 0 2vw',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      padding: themeVars.spacing.xl,
    },
  },
})

const titleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
})

const paragraph = style({
  marginBottom: themeVars.spacing.xl,
})

const technicalSheet = style({
  width: '100%',
  border: 'none',
  backgroundColor: themeVars.colors.background,
  minHeight: '35px',
  cursor: 'pointer',
  borderBottom: themeVars.borders.default,
  borderTop: themeVars.borders.default,
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
  position: 'relative',

  selectors: {
    '&:hover': {
      backgroundColor: '#212121',
    },
  },

  '@media': {
    [`${mediaQueries.mobile}`]: {
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

globalStyle(`${priceInformation} a`, {
  color: 'white',
})

const link = style({
  textDecoration: 'none',
})

const images = style({
  margin: '0 2vw',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      margin: `0 ${themeVars.spacing.xl} ${themeVars.spacing.xl}`,
    },
  },
})

const back = style({
  textDecoration: 'underline',
  margin: '1vw 0 2vw 2vw',
  display: 'flex',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      margin: themeVars.spacing.xl,
      marginTop: 0,
    },
  },
})

export const styles = {
  presentationContainer,
  textContainer,
  titleContainer,
  back,
  paragraph,
  technicalSheet,
  priceInformation,
  images,
  link,
}
