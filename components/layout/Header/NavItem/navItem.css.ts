import { style } from '@vanilla-extract/css'
import { themeVars } from '../../../../styles/theme.css'
import { styles as gridStyles } from '../../Grid/grid.css'

const navItemContainer = style({
  position: 'relative',
  flex: 1,

  selectors: {
    '&:not(:last-child)': {
      borderRight: themeVars.borders.default,
    },
  },
})

const navItemContainerBorderRight = style({
  borderRight: themeVars.borders.default,
})

const navItem = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: themeVars.sizes.navItemHeight,
  borderTop: themeVars.borders.default,
  cursor: 'pointer',
  backgroundColor: themeVars.colors.lightBackground,
  backgroundClip: 'padding-box',
  color: themeVars.colors.fontPrimary,
  transition: 'color 300ms',
})

const navItemInactive = style({
  color: themeVars.colors.fontSecondary,
})

const navItemActive = style({
  textDecoration: 'underline',
  color: themeVars.colors.fontPrimary,
})

const subMenuList = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 300ms',
  zIndex: 1,
  backgroundColor: themeVars.colors.lightBackground,
  borderTop: themeVars.borders.default,

  selectors: {
    [`${gridStyles.gridItem}:first-child &`]: {
      borderRight: themeVars.borders.default,
      width: 'calc(100% + 1px)',
    },
    [`${gridStyles.gridItem}:not(:first-child):not(:last-child) &`]: {
      borderLeft: themeVars.borders.default,
      borderRight: themeVars.borders.default,
      width: 'calc(100% + 2px)',
      marginLeft: '-1px',
    },
    [`${gridStyles.gridItem}:last-child &`]: {
      borderLeft: themeVars.borders.default,
      marginLeft: '-1px',
      width: 'calc(100% + 1px)',
    },
  },
})

const subMenuListVisible = style({
  opacity: 1,
  pointerEvents: 'auto',
})

const subMenuItem = style({
  color: themeVars.colors.fontSecondary,
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: themeVars.borders.default,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 300ms',

  selectors: {
    '&:hover': {
      color: themeVars.colors.fontPrimary,
      textDecoration: 'underline',
    },
  },
})

const subMenuItemSelected = style({
  color: themeVars.colors.fontPrimary,
})

export const styles = {
  navItemContainer,
  navItemContainerBorderRight,
  navItem,
  navItemActive,
  navItemInactive,
  subMenuList,
  subMenuItem,
  subMenuListVisible,
  subMenuItemSelected,
}
