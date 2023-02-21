import { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { getCustomGetStaticProps } from '../../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchDesignItems } from '../../../features/Design/domain/repository/fetchDesignItems'
import { DesignProductGrid } from '../../../features/Design/presentation/DesignProductGrid/DesignProductGrid'

const DesignArticlePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ designItem }): JSX.Element | null => {
  if (designItem) {
    return (
      <>
        <Head>
          <title>JORIS POGGIOLI - Design</title>
          <meta
            name="description"
            content="Discover the work of Joris Poggioli, architect and designer, member of AD100."
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <DesignProductGrid designItem={designItem} />
      </>
    )
  }

  return null
}

export const getStaticPaths: GetStaticPaths<{
  type: string
  slug: string
}> = async () => {
  const designItems = await fetchDesignItems()

  return {
    paths: designItems.map((item) => ({
      params: { type: item.designTypeSlug, slug: item.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps = getCustomGetStaticProps(async ({ params }) => {
  const designItems = await fetchDesignItems()

  return {
    designItem: designItems.find(
      (item) => item.slug.toLowerCase() === params?.slug
    ),
  }
})

export default DesignArticlePage
