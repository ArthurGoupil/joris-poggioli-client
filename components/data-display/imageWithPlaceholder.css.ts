import { createVar, style } from '@vanilla-extract/css'

export const opacityVar = createVar()

const image = style({
  opacity: opacityVar,
  transition: 'opacity 300ms',
})

const placeholder = style({
  filter: 'blur(5px)',
})

export const styles = {
  image,
  placeholder,
}
