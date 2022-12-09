import { dehydrate, DehydratedState } from 'react-query'
import { fetchNavItems } from '../../features/Nav/domain/repository/fetchNavItems'
import { queryClient } from '../../pages/_app'

export const customPrefetch = async (
  queries: { key: string; fetch: () => Promise<unknown> }[]
): Promise<{ props: { dehydratedState: DehydratedState } }> => {
  if (queryClient.getQueryCache().find('nav-items') === undefined) {
    await queryClient.prefetchQuery('nav-items', fetchNavItems)
  }

  for (const query of queries) {
    if (queryClient.getQueryCache().find(query.key) === undefined) {
      await queryClient.prefetchQuery(query.key, query.fetch)
    }
  }

  return { props: { dehydratedState: dehydrate(queryClient) } }
}
