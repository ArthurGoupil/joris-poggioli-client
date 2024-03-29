import Head from 'next/head'
import Link from 'next/link'
import { getBaseGetStaticProps } from '../dev-tools/static-props/getCustomGetStaticProps'
import { notFound, notFoundContainer } from '../styles/globals.css'

const FourZeroFourPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>JORIS POGGIOLI - not found</title>
        <meta name="description" content="Page not found" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={notFoundContainer}>
        <div className={notFound}>PAGE NOT FOUND</div>
        <Link
          href="/"
          style={{ textDecoration: 'underline', textAlign: 'center' }}
        >
          GO BACK HOME
        </Link>
      </div>
    </>
  )
}

export const getStaticProps = getBaseGetStaticProps()

export default FourZeroFourPage
