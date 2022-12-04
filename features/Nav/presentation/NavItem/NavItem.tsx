import { styles } from './navItem.css'
import cc from 'classcat'
import React from 'react'
import Link from 'next/link'
import { slugify } from '../../../../components/layout/shared/logic/slugify'
import { NavItemProps } from '../../domain/entities/nav'

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
