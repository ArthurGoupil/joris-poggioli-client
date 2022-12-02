import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { dehydrate, useQuery } from 'react-query'
import { fetchDesignItems } from '../../../features/Design/domain/repository/fetchDesignItems'
import { DesignProductGrid } from '../../../features/DesignProduct/presentation/DesignProductGrid/DesignProductGrid'
import { queryClient } from '../../_app'

const DesignCategoryArticlePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (): JSX.Element => {
  const router = useRouter()
  const slug = router.query.slug as string

  const { data } = useQuery('design-items', fetchDesignItems, {
    select: (data) => ({
      designItem: data.designItems.find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase()
      ),
    }),
  })

  if (data?.designItem) {
    return <DesignProductGrid designItem={data.designItem} />
  }

  return <div>loading</div>
}

export const getServerSideProps: GetServerSideProps = async () => {
  if (queryClient.getQueryCache().find('design-items') === undefined) {
    await queryClient.prefetchQuery('design-items', fetchDesignItems)
  }

  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default DesignCategoryArticlePage
