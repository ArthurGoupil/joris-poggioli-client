import { createVar, style } from '@vanilla-extract/css'

export const imageOpacityVar = createVar()
export const placeholderOpacityVar = createVar()

const image = style({
  opacity: imageOpacityVar,
  transition: 'opacity 300ms',
})

const placeholderContainer = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
})

const placeholder = style({
  opacity: placeholderOpacityVar,
  transition: 'opacity 300ms',
  filter: 'blur(5px)',
  height: '100%',
})

export const styles = {
  image,
  placeholderContainer,
  placeholder,
}
