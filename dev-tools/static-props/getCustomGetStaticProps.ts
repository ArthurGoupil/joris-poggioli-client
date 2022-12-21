import { GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { MaintenanceMode } from '../../features/MaintenanceMode/domain/entities/maintenanceMode'
import { fetchMaintenanceMode } from '../../features/MaintenanceMode/domain/repository/fetchMaintenanceMode'
import { BaseNavItemsProps } from '../../features/Nav/domain/entities/nav'
import { fetchNavItems } from '../../features/Nav/domain/repository/fetchNavItems'

export const getCustomGetStaticProps =
  <T>(
    callback: (
      context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
    ) => Promise<T>
  ): GetStaticProps<
    T & { navItems: BaseNavItemsProps[]; maintenanceMode: MaintenanceMode }
  > =>
  async (context) => {
    const navItems = await fetchNavItems()
    const maintenanceMode = await fetchMaintenanceMode()

    const otherProps = await callback(context)

    return { props: { navItems, maintenanceMode, ...otherProps } }
  }

export const getBaseGetStaticProps =
  (): GetStaticProps<{
    navItems: BaseNavItemsProps[]
    maintenanceMode: MaintenanceMode
  }> =>
  async () => {
    const navItems = await fetchNavItems()
    const maintenanceMode = await fetchMaintenanceMode()

    return { props: { navItems, maintenanceMode } }
  }
