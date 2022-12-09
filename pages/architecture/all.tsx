import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import React from 'react'
import { fetchArchitectureProjects } from '../../features/Architecture/domain/repository/fetchArchitectureProjects'
import { ArchitectureProjectsListGrid } from '../../features/Architecture/presentation/ArchitectureProjectsListGrid/ArchitectureProjectsListGrid'
import { customPrefetch } from '../../dev-tools/react-query/customPrefetch'

const ArchitectureProjectsPage: NextPage = (): JSX.Element => {
  const { data } = useQuery('architecture-projects', fetchArchitectureProjects)

  const architectureProjects = data?.architectureProjects

  return (
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
}

export const getStaticProps: GetStaticProps = async () => {
  return customPrefetch([
    { key: 'architecture-projects', fetch: fetchArchitectureProjects },
  ])
}

export default ArchitectureProjectsPage
