import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { fetchArchitectureProjects } from '../../features/Architecture/domain/repository/fetchArchitectureProjects'
import { ArchitectureProjectsListGrid } from '../../features/Architecture/presentation/ArchitectureProjectsListGrid/ArchitectureProjectsListGrid'
import { getCustomGetStaticProps } from '../../dev-tools/static-props/getCustomGetStaticProps'
import { ArchitectureProject } from '../../features/Architecture/domain/entities/architecture'

const ArchitectureProjectsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ architectureProjects }): JSX.Element => (
  <div>
    <Head>
      <title>JORIS POGGIOLI - Architecture</title>
      <meta name="description" content="All architecture projects" />
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

  return {
    architectureProjects: architectureProjects.filter(
      (project) => !project.isComingSoon
    ) as ArchitectureProject[],
  }
})

export default ArchitectureProjectsPage
