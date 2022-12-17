import { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { fetchArchitectureProjects } from '../../features/Architecture/domain/repository/fetchArchitectureProjects'
import { ArchitectureProjectGrid } from '../../features/Architecture/presentation/ArchitectureProjectGrid/ArchitectureProjectGrid'

const ArchitectureProjectPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ architectureProject }): JSX.Element | null => {
  if (architectureProject) {
    return (
      <>
        <Head>
          <title>JORIS POGGIOLI - Architecture</title>
          <meta
            name="description"
            content="Joris Poggioli - Architecture project"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <ArchitectureProjectGrid architectureProject={architectureProject} />
      </>
    )
  }

  return null
}

export const getStaticPaths: GetStaticPaths<{
  project: string
}> = async () => {
  const architectureProjects = await fetchArchitectureProjects()

  return {
    paths: architectureProjects.map((project) => ({
      params: { project: project.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps = getCustomGetStaticProps(async ({ params }) => {
  const architectureProjects = await fetchArchitectureProjects()

  return {
    architectureProject: architectureProjects.find(
      (item) => item.slug === params?.project
    ),
  }
})

export default ArchitectureProjectPage
