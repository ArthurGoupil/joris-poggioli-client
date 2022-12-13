import { InferGetStaticPropsType, NextPage } from 'next'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchAboutPress } from '../../features/About/domain/repository/fetchAboutPress'
import { AboutPressGrid } from '../../features/About/presentation/AboutPressGrid/AboutPressGrid'

const AboutPressPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ pressItems }): JSX.Element => <AboutPressGrid pressItems={pressItems} />

export const getStaticProps = getCustomGetStaticProps(async () => {
  const pressItems = await fetchAboutPress()

  return { pressItems: pressItems.flatMap((i) => [i, i, i, i, i]) }
})

export default AboutPressPage
