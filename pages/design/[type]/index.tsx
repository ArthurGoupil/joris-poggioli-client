import { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { fetchDesignItems } from '../../../features/Design/domain/repository/fetchDesignItems'
import { useRouter } from 'next/router'
import React from 'react'
import { fetchNavItems } from '../../../features/Nav/domain/repository/fetchNavItems'
import { slugify } from '../../../components/layout/shared/logic/slugify'
import { getCustomGetStaticProps } from '../../../dev-tools/static-props/getCustomGetStaticProps'
import { DesignProductsListGrid } from '../../../features/Design/presentation/DesignProductsListGrid/DesignProductsListGrid'

const DesignCategoryPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ designItems, navItems }): JSX.Element | null => {
  const router = useRouter()

  const previousCategoryParamRef = React.useRef<string>()
  const categoryParam =
    router.query.type?.toString() ?? previousCategoryParamRef.current

  React.useEffect(() => {
    if (router.query.type) {
      previousCategoryParamRef.current = router.query.type.toString()
    }
  }, [router.query.type])

  if (!categoryParam) {
    return null
  }

  return (
    <div>
      <Head>
        <title>JORIS POGGIOLI - Design</title>
        <meta
          name="description"
          content="Discover the work of Joris Poggioli, architect and designer, member of AD100."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <DesignProductsListGrid
        gridKey={categoryParam}
        designItems={designItems}
        disablePadding={
          !navItems[0].subItems.find(
            (subItem) => slugify(subItem.name) === slugify(categoryParam)
          )?.hasPaddingInGrid
        }
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<{
  type: string
}> = async () => {
  const navItems = await fetchNavItems()

  const paths = navItems[0].subItems.map((item) => ({
    params: { type: slugify(item.name) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = getCustomGetStaticProps(async ({ params }) => {
  const designItems = await fetchDesignItems()

  return {
    designItems: designItems.filter(
      (item) => item.designTypeSlug === params?.type
    ),
  }
})

export default DesignCategoryPage
