import { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { DesignGridItem } from '../../../features/Design/presentation/DesignGridItem/DesignGridItem'
import { Grid } from '../../../components/layout/Grid/Grid'
import { fetchDesignItems } from '../../../features/Design/domain/repository/fetchDesignItems'
import { useRouter } from 'next/router'
import React from 'react'
import { fetchNavItems } from '../../../features/Nav/domain/repository/fetchNavItems'
import { slugify } from '../../../components/layout/shared/logic/slugify'
import { getCustomGetStaticProps } from '../../../dev-tools/static-props/getCustomGetStaticProps'
import { themeVars } from '../../../styles/theme.css'

const DesignCategoryPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ designItems }): JSX.Element => {
  const router = useRouter()
  const categoryParam = router.query.type as string

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
          gridBackgroundColor={themeVars.colors.background}
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
                  imageIndex={index}
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
  const navItems = await fetchNavItems()

  const paths = navItems[0].subItems.map((item) => ({
    params: { type: slugify(item) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = getCustomGetStaticProps(async ({ params }) => {
  const designItems = await fetchDesignItems()

  return {
    designItems: designItems
      .flatMap((i) => [i, i, i, i, i, i, i, i])
      .filter((item) => item.designTypeSlug === params?.type),
  }
})

export default DesignCategoryPage
