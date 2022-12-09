import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { LogoLoader } from '../../../components/feedback/LogoLoader/LogoLoader'
import { customPrefetch } from '../../../dev-tools/react-query/customPrefetch'
import { fetchDesignItems } from '../../../features/Design/domain/repository/fetchDesignItems'
import { DesignProductGrid } from '../../../features/Design/presentation/DesignProductGrid/DesignProductGrid'

const DesignArticlePage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const slug = router.query.slug as string

  const { data } = useQuery('design-items', fetchDesignItems, {
    select: (data) => ({
      designItem: data.designItems.find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase()
      ),
      error: data.error,
    }),
  })

  if (data?.designItem) {
    return <DesignProductGrid designItem={data.designItem} />
  }

  return <LogoLoader />
}

export const getStaticPaths: GetStaticPaths<{
  type: string
  slug: string
}> = async () => {
  const { designItems } = await fetchDesignItems()

  return {
    paths: designItems.map((item) => ({
      params: { type: item.designTypeSlug, slug: item.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return customPrefetch([{ key: 'design-items', fetch: fetchDesignItems }])
}

export default DesignArticlePage
