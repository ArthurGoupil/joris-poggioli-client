import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchAboutPress } from '../../features/About/domain/repository/fetchAboutPress'
import { AboutPressGrid } from '../../features/About/presentation/AboutPressGrid/AboutPressGrid'

const AboutPressPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ pressItems }): JSX.Element => (
  <>
    <Head>
      <title>JORIS POGGIOLI - Press</title>
      <meta
        name="description"
        content="Discover the work of Joris Poggioli, architect and designer, member of AD100."
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <AboutPressGrid pressItems={pressItems} />
  </>
)

export const getStaticProps = getCustomGetStaticProps(async () => {
  const pressItems = await fetchAboutPress()

  return { pressItems }
})

export default AboutPressPage
