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

const navItem = style({
  width: '100%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: themeVars.sizes.navItemHeight.small,
  borderTop: themeVars.borders.default,
  cursor: 'pointer',
  backgroundColor: themeVars.colors.lightBackground,
  backgroundClip: 'padding-box',
  transition: 'color 300ms',

  '@media': {
    [`${mediaQueries.mobile}`]: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
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

const navItemContainerDoubleBorderTopMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderTop: themeVars.borders.double,
    },
  },
})
const navItemContainerDoubleBorderBottomMobile = style({
  '@media': {
    [`${mediaQueries.mobile}`]: {
      borderBottom: themeVars.borders.double,
    },
  },
})

const navItemName = style({
  minHeight: themeVars.sizes.navItemHeight.small,
  display: 'flex',
  alignItems: 'center',
  color: themeVars.colors.fontPrimary,
})

const navItemNameInactive = style({
  color: themeVars.colors.fontSecondary,
})

const navItemNameActive = style({
  textDecoration: 'underline',
  color: themeVars.colors.fontPrimary,
})

const subMenuList = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  zIndex: 1,
  backgroundColor: themeVars.colors.lightBackground,
  borderTop: themeVars.borders.default,
  overflow: 'hidden',

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

  '@media': {
    [`${mediaQueries.mobile}`]: {
      position: 'static',
    },
  },
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

  ':hover': {
    color: themeVars.colors.fontPrimary,
    textDecoration: 'underline',
  },

  '@media': {
    [`${mediaQueries.mobile}`]: {
      selectors: {
        [`${subMenuList} :last-child &`]: {
          borderBottom: 'none',
        },
      },
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
  navItemContainerDoubleBorderTopMobile,
  navItemContainerDoubleBorderBottomMobile,
  navItem,
  navItemName,
  navItemNameActive,
  navItemNameInactive,
  subMenuList,
  subMenuItem,
  subMenuItemSelected,
}
