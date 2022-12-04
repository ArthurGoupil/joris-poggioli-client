import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../styles/theme.css'

const logoContainer = style({
  overflow: 'hidden',
  display: 'flex',
  lineHeight: '100px',
  fontWeight: 700,
  fontSize: themeVars.font.xl.size,
  letterSpacing: '6.4px',
  color: themeVars.colors.fontPrimary,
})

export const styles = { logoContainer }
