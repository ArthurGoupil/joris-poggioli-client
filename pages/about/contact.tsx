import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchAboutContact } from '../../features/About/domain/repository/fetchAboutContact'
import { AboutContactText } from '../../features/About/presentation/AboutContactText/AboutContactText'

const AboutContactPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ contactText }): JSX.Element => (
  <>
    <Head>
      <title>JORIS POGGIOLI - Contact</title>
      <meta name="description" content="Contact page" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <AboutContactText contactText={contactText} />
  </>
)

export const getStaticProps = getCustomGetStaticProps(async () => {
  const aboutContact = await fetchAboutContact()

  return { contactText: aboutContact.textContent }
})

export default AboutContactPage
