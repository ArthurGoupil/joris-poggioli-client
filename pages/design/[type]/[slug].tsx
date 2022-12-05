import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { dehydrate, useQuery } from 'react-query'
import { LogoLoader } from '../../../components/feedback/LogoLoader/LogoLoader'
import { fetchDesignItems } from '../../../features/Design/domain/repository/fetchDesignItems'
import { DesignProductGrid } from '../../../features/Design/presentation/DesignProductGrid/DesignProductGrid'
import { queryClient } from '../../_app'

const DesignCategoryArticlePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ previousPage }): JSX.Element => {
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
    return (
      <DesignProductGrid
        designItem={data.designItem}
        previousPage={previousPage}
      />
    )
  }

  return <LogoLoader />
}

export const getServerSideProps: GetServerSideProps<{
  previousPage: string | null
}> = async (context) => {
  if (queryClient.getQueryCache().find('design-items') === undefined) {
    await queryClient.prefetchQuery('design-items', fetchDesignItems)
  }

  const hasNotPreviousPage =
    `${process.env.FRONT_URL}${context.resolvedUrl}` ===
      context.req.headers.referer ||
    !context.req.headers.referer?.includes(process.env.FRONT_URL ?? '')

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      previousPage: hasNotPreviousPage
        ? null
        : context.req.headers.referer ?? null,
    },
  }
}

export default DesignCategoryArticlePage
