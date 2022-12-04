import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { dehydrate, useQuery } from 'react-query'
import React from 'react'
import { fetchArchitectureProjects } from '../../features/Architecture/domain/repository/fetchArchitectureProjects'
import { queryClient } from '../_app'
import { ArchitectureProjectsGrid } from '../../features/Architecture/presentation/ArchitectureProjectsGrid/ArchitectureProjectsGrid'

const ArchitectureProjectsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (): JSX.Element => {
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
        <ArchitectureProjectsGrid architectureProjects={architectureProjects} />
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  if (queryClient.getQueryCache().find('architecture-projects') === undefined) {
    await queryClient.prefetchQuery(
      'architecture-projects',
      fetchArchitectureProjects
    )
  }

  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default ArchitectureProjectsPage
