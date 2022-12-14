import { NavItemProps } from '../../presentation/NavItem/NavItem'

export type ApiArchitectureProjectItem = {
  id: number
  acf: { name: string }
}

export type ApiDesignTypeItem = {
  id: number
  title: { rendered: string }
  acf: { show_in_menu: boolean; position_in_menu: string }
}

export type NavItemStatus = 'default' | 'active' | 'inactive'

export type BaseNavItemsProps = Pick<NavItemProps, 'name' | 'subItems'>
