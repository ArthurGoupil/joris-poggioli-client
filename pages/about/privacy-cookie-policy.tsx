import { InferGetStaticPropsType, NextPage } from 'next'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchAboutPrivacyCookiePolicy } from '../../features/About/domain/repository/fetchAboutPrivacyCookiePolicy'
import { AboutPrivacyCookiePolicy } from '../../features/About/presentation/AboutPrivacyCookiePolicy/AboutPrivacyCookiePolicy'

const AboutPrivacyCookiePolicyPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props): JSX.Element => <AboutPrivacyCookiePolicy {...props} />

export const getStaticProps = getCustomGetStaticProps(async () => {
  const aboutPrivacyCookiePolicy = await fetchAboutPrivacyCookiePolicy()

  return { ...aboutPrivacyCookiePolicy }
})

export default AboutPrivacyCookiePolicyPage
