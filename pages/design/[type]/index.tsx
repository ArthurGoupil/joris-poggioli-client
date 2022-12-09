import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { DesignGridItem } from '../../../features/Design/presentation/DesignGridItem/DesignGridItem'
import { Grid } from '../../../components/layout/Grid/Grid'
import { fetchDesignItems } from '../../../features/Design/domain/repository/fetchDesignItems'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { fetchNavItems } from '../../../features/Nav/domain/repository/fetchNavItems'
import { slugify } from '../../../components/layout/shared/logic/slugify'
import { customPrefetch } from '../../../dev-tools/react-query/customPrefetch'

const DesignCategoryPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const categoryParam = router.query.type as string

  const { data } = useQuery('design-items', fetchDesignItems)

  const designItems = React.useMemo(
    () =>
      data?.designItems
        .flatMap((i) => [i, i, i, i, i, i, i, i])
        .filter(
          (item) =>
            categoryParam &&
            item.designType.toLowerCase() === categoryParam.toLowerCase()
        ),
    // update items not too early so that it doesn't blink on page animation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.designItems]
  )

  const firstlastRowItemIndex = designItems
    ? designItems.length % 3 === 0
      ? designItems.length - 3
      : designItems.length - (designItems.length % 3)
    : 0

  return (
    <div>
      <Head>
        <title>JORIS POGGIOLI - Design</title>
        <meta name="description" content="Joris Poggioli - Design items" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {designItems && designItems.length > 0 && (
        <Grid
          key={categoryParam}
          gridTemplateColumns="repeat(3, 1fr)"
          gridAutoRows="38vw"
          gridItems={designItems.map((item, index) => {
            const isFirstColumn = index === 0 || index % 3 === 0
            const isSecondColumn = (index - 1) % 3 === 0

            const getGridColumn = (): string => {
              if (isFirstColumn) {
                return '1'
              }
              if (isSecondColumn) {
                return '2 / 3'
              }
              return '3 / 4'
            }

            return {
              key: item.id,
              gridColumn: getGridColumn(),
              component: (
                <DesignGridItem
                  src={item.imageGrid.url}
                  alt={item.imageGrid.alt ?? item.imageGrid.title}
                  name={item.name}
                  slug={item.slug}
                  designType={item.designType}
                  hasBorderRight={isFirstColumn || isSecondColumn}
                  hasBorderBottom={index < firstlastRowItemIndex}
                />
              ),
            }
          })}
        />
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<{
  type: string
}> = async () => {
  const { navItems } = await fetchNavItems()

  const paths = navItems[0].subItems.map((item) => ({
    params: { type: slugify(item) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return customPrefetch([{ key: 'design-items', fetch: fetchDesignItems }])
}

export default DesignCategoryPage
