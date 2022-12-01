import { createTheme } from '@vanilla-extract/css'

export const [themeClass, themeVars] = createTheme({
  colors: {
    lightBackground: '#fafafa',
    background: '#edecec',
    greyAccent: '#c6c6c6',
    fontPrimary: '#000000',
    fontSecondary: '#9f9f9f',
  },
  spacing: {
    none: '0',
    xs: '2px',
    s: '4px',
    m: '8px',
    ml: '12px',
    l: '16px',
    xl: '24px',
    xxl: '48px',
  },
  fontFamily:
    'Helvetica Neue, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, sans-serif;',
  font: {
    s: {
      size: '13px',
      lineHeight: '16px',
    },
    base: {
      size: '16px',
      lineHeight: '20px',
    },
    m: {
      size: '18px',
      lineHeight: '20px',
    },
    l: {
      size: '22px',
      lineHeight: '24px',
    },
    xl: {
      size: '32px',
      lineHeight: String(Math.floor((32 / 30) * 100) / 100),
    },
    brand: {
      size: '56px',
      lineHeight: '60px',
    },
    xxl: {
      size: '64px',
      lineHeight: '68px',
    },
  },
  borders: {
    default: '1px solid black',
  },
  sizes: {
    headerLogoHeight: '120px',
    navItemHeight: '40px',
  },
})
