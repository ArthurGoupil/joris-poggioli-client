import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'

const blankContainer = style({
  borderRight: themeVars.borders.default,
  height: '100%',
})

const titleContainer = style({
  paddingRight: '4vw',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      marginLeft: 0,
      width: '100%',
      paddingRight: 0,
    },
  },
})

const middleContainer = style({
  padding: '2vw',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      padding: themeVars.spacing.xl,
    },
  },
})

const textContainer = style({
  position: 'relative',
  marginBottom: themeVars.spacing.xl,
})

const sectionTitle = style({
  fontWeight: 700,
  position: 'absolute',
  left: '-33.33vw',
  width: '33.33vw',
  paddingRight: '4vw',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      position: 'static',
      width: '100%',
      paddingRight: 0,
      marginBottom: themeVars.spacing.m,
    },
  },
})

const text = style({
  textAlign: 'justify',
})

const cgv = style({
  fontWeight: 700,
  marginLeft: '-33.33vw',

  ':hover': {
    textDecoration: 'underline',
  },
})

export const styles = {
  blankContainer,
  titleContainer,
  middleContainer,
  textContainer,
  sectionTitle,
  text,
  cgv,
}
