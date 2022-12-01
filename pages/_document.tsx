import { Html, Head, Main, NextScript } from 'next/document'
import { themeClass } from '../styles/theme.css'

const Document = (): JSX.Element => {
  return (
    <Html className={themeClass}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
