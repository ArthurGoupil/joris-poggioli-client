import { style } from '@vanilla-extract/css'

const image = style({
  width: '100%',
  height: 'auto',
  maxHeight: '100%',
  objectFit: 'cover',
  backgroundPosition: 'center',
})

export const styles = { image }
