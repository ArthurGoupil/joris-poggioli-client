import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchAboutJorisPoggioli } from '../../features/About/domain/repository/fetchAboutJorisPoggioli'
import { AboutJorisPoggioliGrid } from '../../features/About/presentation/AboutJorisPoggioloGrid/AboutJorisPoggioliGrid'

const JorisPoggioliPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ textContent, image }): JSX.Element => (
  <div>
    <Head>
      <title>JORIS POGGIOLI - About</title>
      <meta name="description" content="Joris Poggioli - About" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <AboutJorisPoggioliGrid textContent={textContent} image={image} />
  </div>
)

export const getStaticProps = getCustomGetStaticProps(async () => {
  const jorisPoggioliAbout = await fetchAboutJorisPoggioli()
  return {
    textContent: jorisPoggioliAbout.textContent,
    image: jorisPoggioliAbout.image,
  }
})

export default JorisPoggioliPage
