import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { fetchDesignItems } from '../features/Design/domain/repository/fetchDesignItems'
import { getCustomGetStaticProps } from '../dev-tools/static-props/getCustomGetStaticProps'
import React from 'react'
import { DesignProductsListGrid } from '../features/Design/presentation/DesignProductsListGrid/DesignProductsListGrid'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  designItems,
}): JSX.Element => (
  <div>
    <Head>
      <title>JORIS POGGIOLI - Design</title>
      <meta name="description" content="Joris Poggioli - Design items" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <DesignProductsListGrid designItems={designItems} />
  </div>
)

export const getStaticProps = getCustomGetStaticProps(async () => {
  const designItems = await fetchDesignItems()

  return {
    designItems: designItems
      .filter((item) => item.displayOnHome)
      .sort((a, b) => {
        if (a.homePosition && b.homePosition) {
          return a.homePosition - b.homePosition
        }
        return 1
      })
      .flatMap((i) => [i, i, i, i]),
  }
})

export default Home
