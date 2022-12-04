import Head from 'next/head'
import Link from 'next/link'
import { notFound, notFoundContainer } from './styles/globals.css'

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>JORIS POGGIOLI</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={notFoundContainer}>
        <div className={notFound}>PAGE NOT FOUND</div>
        <Link href="/" style={{ textDecoration: 'underline' }}>
          GO BACK HOME
        </Link>
      </div>
    </>
  )
}

export default Home
