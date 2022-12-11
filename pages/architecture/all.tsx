import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { fetchArchitectureProjects } from '../../features/Architecture/domain/repository/fetchArchitectureProjects'
import { ArchitectureProjectsListGrid } from '../../features/Architecture/presentation/ArchitectureProjectsListGrid/ArchitectureProjectsListGrid'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'

const ArchitectureProjectsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ architectureProjects }): JSX.Element => (
  <div>
    <Head>
      <title>JORIS POGGIOLI - Architecture</title>
      <meta
        name="description"
        content="Joris Poggioli - Architecture projects"
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
    {architectureProjects && architectureProjects.length > 0 && (
      <ArchitectureProjectsListGrid
        architectureProjects={architectureProjects}
      />
    )}
  </div>
)

export const getStaticProps = getCustomGetStaticProps(async () => {
  const architectureProjects = await fetchArchitectureProjects()

  return { architectureProjects }
})

export default ArchitectureProjectsPage
