import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { fetchDesignItems } from '../features/Design/domain/repository/fetchDesignItems'
import { Grid } from '../components/layout/Grid/Grid'
import { DesignGridItem } from '../features/Design/presentation/DesignGridItem/DesignGridItem'
import { getCustomGetStaticProps } from '../dev-tools/static-props/getCustomGetStaticProps'
import { useLoadedImagesCount } from '../context/loaded-images-count.context'
import React from 'react'
import { themeVars } from '../styles/theme.css'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  designItems,
}): JSX.Element => {
  const firstlastRowItemIndex = designItems
    ? designItems.length % 3 === 0
      ? designItems.length - 3
      : designItems.length - (designItems.length % 3)
    : 0

  const { setImagesToLoad } = useLoadedImagesCount()

  React.useEffect(() => {
    setImagesToLoad(designItems?.length ?? 0)
  }, [designItems?.length, setImagesToLoad])

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
