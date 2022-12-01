import { styles } from './navItem.css'
import cc from 'classcat'
import React from 'react'
import Link from 'next/link'
import { slugify } from '../../shared/slugify'

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

export const NavItem = ({
  name,
  subItems,
  showSubItems,
  status,
  onMouseEnter,
  onMouseLeave,
  checkSubItemIsSelected,
  hasBorderRight,
}: NavItemProps): JSX.Element => (
  <li
    className={cc([
      styles.navItemContainer,
      styles.navItem,
      {
        [styles.navItemContainerBorderRight]: hasBorderRight,
        [styles.navItemActive]: status === 'active' || showSubItems,
        [styles.navItemInactive]: status === 'inactive',
      },
    ])}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {name.toUpperCase()}
    <ul
      className={cc([
        styles.subMenuList,
        {
          [styles.subMenuListVisible]: showSubItems,
        },
      ])}
    >
      {subItems.map((subItem) => {
        const subItemSlug = slugify(subItem)
        const href = `/${name.replace(' ', '-').toLowerCase()}/${subItemSlug}`

        return (
          <li key={subItem}>
            <Link
              href={href}
              className={cc([
                styles.subMenuItem,
                {
                  [styles.subMenuItemSelected]:
                    checkSubItemIsSelected(subItemSlug),
                },
              ])}
            >
              {subItem.toUpperCase()}
            </Link>
          </li>
        )
      })}
    </ul>
  </li>
)
