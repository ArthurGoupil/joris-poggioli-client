import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { fetchDesignItems } from '../features/Design/domain/repository/fetchDesignItems'
import { getCustomGetStaticProps } from '../dev-tools/static-props/getCustomGetStaticProps'
import React from 'react'
import { DesignProductsListGrid } from '../features/Design/presentation/DesignProductsListGrid/DesignProductsListGrid'
import { fetchHomeImage } from '../features/Design/domain/repository/fetchHomeImage'
import Image from 'next/image'
import {
  imageHomeContainer,
  imageHomeDesktop,
  imageHomeMobile,
  mobileHeightVar,
} from '../styles/globals.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  designItems,
  homeImage,
}): JSX.Element => {
  const [clientHeight, setClientHeight] = React.useState<string>()

  React.useEffect(() => {
    if (window.innerHeight) {
      setClientHeight(`${window.innerHeight}px`)
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
          <Image
            className={imageHomeDesktop}
            src={homeImage.desktopImage.url}
            alt={homeImage.desktopImage.alt ?? homeImage.desktopImage.title}
            width={homeImage.desktopImage.width}
            height={homeImage.desktopImage.height}
          />
          <Image
            className={imageHomeMobile}
            src={homeImage.mobileImage.url}
            alt={homeImage.mobileImage.alt ?? homeImage.mobileImage.title}
            width={homeImage.mobileImage.width}
            height={homeImage.mobileImage.height}
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
