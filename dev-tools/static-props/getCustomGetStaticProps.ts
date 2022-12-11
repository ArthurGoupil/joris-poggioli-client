import { GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { BaseNavItemsProps } from '../../features/Nav/domain/entities/nav'
import { fetchNavItems } from '../../features/Nav/domain/repository/fetchNavItems'

export const getCustomGetStaticProps =
  <T>(
    callback: (
      context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
    ) => Promise<T>
  ): GetStaticProps<T & { navItems: BaseNavItemsProps[] }> =>
  async (context) => {
    const navItems = await fetchNavItems()
    const otherProps = await callback(context)

    return { props: { navItems, ...otherProps } }
  }

export const getBaseGetStaticProps =
  (): GetStaticProps<{
    navItems: BaseNavItemsProps[]
  }> =>
  async () => {
    const navItems = await fetchNavItems()

    return { props: { navItems } }
  }
