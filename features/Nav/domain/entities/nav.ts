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

export type NavItemProps = {
  name: 'design' | 'architecture' | 'about'
  subItems: string[]
  showSubItems: boolean
  status: NavItemStatus
  onMouseEnter: () => void
  onMouseLeave: () => void
  checkSubItemIsSelected: (name: string) => boolean
  hasBorderRight?: boolean
}

export type BaseNavItemsProps = Pick<NavItemProps, 'name' | 'subItems'>
