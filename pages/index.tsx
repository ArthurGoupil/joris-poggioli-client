import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { fetchDesignItems } from '../features/Design/domain/repository/fetchDesignItems'
import { getCustomGetStaticProps } from '../dev-tools/static-props/getCustomGetStaticProps'
import React from 'react'
import { DesignProductsListGrid } from '../features/Design/presentation/DesignProductsListGrid/DesignProductsListGrid'
import { fetchHomeImage } from '../features/Design/domain/repository/fetchHomeImage'
import {
  imageHomeContainer,
  imageHomeDesktop,
  imageHomeMobile,
  mobileHeightVar,
} from '../styles/globals.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { ImageWithPlaceholder } from '../components/data-display/ImageWithPlaceholder'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  designItems,
  homeImage,
}): JSX.Element => {
  const [clientHeight, setClientHeight] = React.useState<string>()

  React.useEffect(() => {
    const updateHeight = (): void => setClientHeight(`${window.innerHeight}px`)

    if (window.innerHeight) {
      updateHeight()
    }

    window.addEventListener('resize', updateHeight)
    window.addEventListener('orientationchange', updateHeight)

    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('orientationchange', updateHeight)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>JORIS POGGIOLI</title>
        <meta name="description" content="Design & Architecture" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <>
        <div
          className={imageHomeContainer}
          style={assignInlineVars({
            [mobileHeightVar]: clientHeight ?? '100vh',
          })}
        >
          <ImageWithPlaceholder
            className={imageHomeDesktop}
            src={homeImage.desktopImage.url}
            alt={homeImage.desktopImage.alt ?? homeImage.desktopImage.title}
            fill
            placeholderUrl={homeImage.desktopImage.base64Thumbnail}
          />
          <ImageWithPlaceholder
            className={imageHomeMobile}
            src={homeImage.mobileImage.url}
            alt={homeImage.mobileImage.alt ?? homeImage.mobileImage.title}
            fill
            placeholderUrl={homeImage.mobileImage.base64Thumbnail}
          />
        </div>
        <DesignProductsListGrid designItems={designItems} />
      </>
    </div>
  )
}

export const getStaticProps = getCustomGetStaticProps(async () => {
  const designItems = await fetchDesignItems()
  const homeImage = await fetchHomeImage()

  return {
    designItems: designItems.filter((item) => item.displayOnHome),
    homeImage,
  }
})

export default Home
