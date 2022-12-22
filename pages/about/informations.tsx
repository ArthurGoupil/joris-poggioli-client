import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchAboutInformations } from '../../features/About/domain/repository/fetchAboutInformations'
import { AboutInformationsGrid } from '../../features/About/presentation/AboutInformationsGrid/AboutInformationsGrid'

const JorisPoggioliPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ textContent, image }): JSX.Element => (
  <div>
    <Head>
      <title>JORIS POGGIOLI - Informations</title>
      <meta name="description" content="Joris Poggioli - Informations" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <AboutInformationsGrid textContent={textContent} image={image} />
  </div>
)

export const getStaticProps = getCustomGetStaticProps(async () =>
  fetchAboutInformations()
)

export default JorisPoggioliPage
