import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchAboutInformation } from '../../features/About/domain/repository/fetchAboutInformations'
import { AboutInformationGrid } from '../../features/About/presentation/AboutInformationGrid/AboutInformationGrid'

const JorisPoggioliPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ textContent, image }): JSX.Element => (
  <div>
    <Head>
      <title>JORIS POGGIOLI - Informations</title>
      <meta name="description" content="Joris Poggioli - Informations" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <AboutInformationGrid textContent={textContent} image={image} />
  </div>
)

export const getStaticProps = getCustomGetStaticProps(async () =>
  fetchAboutInformation()
)

export default JorisPoggioliPage
