import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../../styles/theme.css'

const blankContainer = style({
  borderRight: themeVars.borders.default,
  height: '100%',
})

const titleContainer = style({
  marginLeft: '-33.33vw',
  width: '33.33vw',
  paddingRight: '4vw',
})

const middleContainer = style({
  padding: '2vw',
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
