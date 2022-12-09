import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { LogoLoader } from '../../components/feedback/LogoLoader/LogoLoader'
import { customPrefetch } from '../../dev-tools/react-query/customPrefetch'
import { fetchArchitectureProjects } from '../../features/Architecture/domain/repository/fetchArchitectureProjects'
import { ArchitectureProjectGrid } from '../../features/Architecture/presentation/ArchitectureProjectGrid/ArchitectureProjectGrid'
import { themeVars } from '../../styles/theme.css'

const ArchitectureProjectPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const project = router.query.project as string

  const { data } = useQuery('architecture-projects', fetchArchitectureProjects)

  const architectureProject = React.useMemo(
    () =>
      data?.architectureProjects.find(
        (item) => item.slug === project.toLowerCase()
      ),
    // update items not too early so that it doesn't blink on page animation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.architectureProjects]
  )

  if (architectureProject) {
    return <ArchitectureProjectGrid architectureProject={architectureProject} />
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeVars.colors.background,
      }}
    >
      <LogoLoader />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<{
  project: string
}> = async () => {
  const { architectureProjects } = await fetchArchitectureProjects()

  return {
    paths: architectureProjects.map((project) => ({
      params: { project: project.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return customPrefetch([
    { key: 'architecture-projects', fetch: fetchArchitectureProjects },
  ])
}

export default ArchitectureProjectPage
