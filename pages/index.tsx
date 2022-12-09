import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { fetchDesignItems } from '../features/Design/domain/repository/fetchDesignItems'
import { Grid } from '../components/layout/Grid/Grid'
import { DesignGridItem } from '../features/Design/presentation/DesignGridItem/DesignGridItem'
import { customPrefetch } from '../dev-tools/react-query/customPrefetch'

const Home: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (): JSX.Element => {
  const { data } = useQuery('design-items', fetchDesignItems, {
    select: (data) => ({
      ...data,
      designItems: data.designItems
        .filter((item) => item.displayOnHome)
        .sort((a, b) => {
          if (a.homePosition && b.homePosition) {
            return a.homePosition - b.homePosition
          }
          return 1
        }),
    }),
  })

  const designItems = data?.designItems

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

export const getStaticProps: GetStaticProps = async () => {
  return customPrefetch([{ key: 'design-items', fetch: fetchDesignItems }])
}

export default Home
