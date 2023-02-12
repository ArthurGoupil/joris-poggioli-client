import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchAboutPrivacyCookiePolicy } from '../../features/About/domain/repository/fetchAboutPrivacyCookiePolicy'
import { AboutPrivacyCookiePolicy } from '../../features/About/presentation/AboutPrivacyCookiePolicy/AboutPrivacyCookiePolicy'

const AboutPrivacyCookiePolicyPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props): JSX.Element => (
  <>
    <Head>
      <title>JORIS POGGIOLI - Privacy & Cookie policy</title>
      <meta name="description" content="Privacy & Cookie policy page" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <AboutPrivacyCookiePolicy {...props} />
  </>
)

export const getStaticProps = getCustomGetStaticProps(async () => {
  const aboutPrivacyCookiePolicy = await fetchAboutPrivacyCookiePolicy()

  return { ...aboutPrivacyCookiePolicy }
})

export default AboutPrivacyCookiePolicyPage
