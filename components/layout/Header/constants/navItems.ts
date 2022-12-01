import { NavItemProps } from '../NavItem/NavItem'

export const navItems: Pick<NavItemProps, 'name' | 'subItems'>[] = [
  {
    name: 'design',
    subItems: [
      'seating',
      'tables',
      'consoles',
      'lighting',
      'mirrors',
      'objects',
      'units',
      'collections',
      'collaborations',
    ],
  },
  {
    name: 'architecture',
    subItems: ['villa totem', 'villa enamorados', 'chalet'],
  },
  {
    name: 'about',
    subItems: ['joris poggioli', 'contact', 'press', 'privacy & cookie policy'],
  },
]
