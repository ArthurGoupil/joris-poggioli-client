import { createVar, style } from '@vanilla-extract/css'

export const imageOpacityVar = createVar()
export const placeholderOpacityVar = createVar()

const image = style({
  opacity: imageOpacityVar,
  transition: 'opacity 300ms',
})

const placeholder = style({
  opacity: placeholderOpacityVar,
  transition: 'opacity 300ms',
  filter: 'blur(5px)',
})

export const styles = {
  image,
  placeholder,
}
