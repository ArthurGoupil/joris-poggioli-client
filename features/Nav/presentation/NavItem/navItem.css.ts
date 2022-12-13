import { style } from '@vanilla-extract/css'
import { mediaQueries, themeVars } from '../../../../styles/theme.css'
import { styles as gridStyles } from '../../../../components/layout/Grid/grid.css'

const navItemContainer = style({
  position: 'relative',
  flex: 1,

  selectors: {
    '&:not(:last-child)': {
      borderRight: themeVars.borders.default,
    },
  },

  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderRight: 'none',
    },
  },
})

const navItemContainerBorderRight = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderRight: themeVars.borders.default,
    },
  },
})

const navItemContainerBorderRightMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderRight: themeVars.borders.default,
    },
  },
})

const navItemContainerBorderBottom = style({
  '@media': {
    [`${mediaQueries.desktop}`]: {
      borderBottom: themeVars.borders.default,
    },
  },
})

const navItemContainerBorderBottomMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderBottom: themeVars.borders.default,
    },
  },
})

const navItem = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: themeVars.sizes.navItemHeight.small,
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

  '@media': {
    [`${mediaQueries.mobile}`]: {
      color: themeVars.colors.fontPrimary,
    },
  },
})

const subMenuItemSelected = style({
  color: themeVars.colors.fontPrimary,
})

export const styles = {
  navItemContainer,
  navItemContainerBorderRight,
  navItemContainerBorderRightMobile,
  navItemContainerBorderBottom,
  navItemContainerBorderBottomMobile,
  navItem,
  navItemActive,
  navItemInactive,
  subMenuList,
  subMenuItem,
  subMenuListVisible,
  subMenuItemSelected,
}
