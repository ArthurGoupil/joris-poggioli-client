import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../styles/theme.css'

const loaderContainer = style({
  width: '100vw',
  height: '100vh',
  backgroundColor: themeVars.colors.background,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: themeVars.font.xxl.size,
  fontWeight: 700,
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
})

export const styles = {
  loaderContainer,
}
