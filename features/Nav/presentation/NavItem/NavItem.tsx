import { styles } from './navItem.css'
import cc from 'classcat'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { slugify } from '../../../../components/layout/shared/logic/slugify'
import { NavItemStatus } from '../../domain/entities/nav'
import { AnimatePresence, m } from 'framer-motion'
import { Responsive } from '../../../shared/domain/entities/responsive'
import { breakpoint } from '../../../../styles/theme.css'

const animationVariants = {
  initial: {
    height: 0,
  },
  animate: {
    height: 'auto',
  },
  exit: {
    height: 0,
  },
}

export type NavItemProps = {
  name: 'design' | 'architecture' | 'about'
  subItems: { name: string; hasPaddingInGrid?: boolean }[]
  shouldShowSubItems: boolean
  status: NavItemStatus
  showSubItems: () => void
  hideSubItems: () => void
  checkSubItemIsSelected: (name: string) => boolean
  hasDoubleBorderTopInMobile: boolean
  hasDoubleBorderBottomInMobile?: boolean
  hasBorderRight?: Responsive<boolean>
  hasBorderBottom?: Responsive<boolean>
}

export const NavItem = ({
  name,
  subItems,
  shouldShowSubItems,
  status,
  showSubItems,
  hideSubItems,
  checkSubItemIsSelected,
  hasDoubleBorderTopInMobile,
  hasDoubleBorderBottomInMobile = false,
  hasBorderRight,
  hasBorderBottom,
}: NavItemProps): JSX.Element => {
  const [isMobile, setIsMobile] = React.useState(false)

  useEffect(() => {
    if (window.innerWidth <= breakpoint) {
      setIsMobile(true)
    }
  }, [])

  const toggleShowSubItems = (): void => {
    if (shouldShowSubItems) {
      hideSubItems()
    } else {
      showSubItems()
    }
  }

  return (
    <li
      className={cc([
        styles.navItem,
        styles.navItemContainer,
        {
          [styles.navItemContainerBorderRight]: hasBorderRight?.desktop,
          [styles.navItemContainerBorderRightMobile]: hasBorderRight?.mobile,
          [styles.navItemContainerBorderBottom]: hasBorderBottom?.desktop,
          [styles.navItemContainerBorderBottomMobile]: hasBorderBottom?.mobile,
          [styles.navItemContainerDoubleBorderTopMobile]:
            hasDoubleBorderTopInMobile,
          [styles.navItemContainerDoubleBorderBottomMobile]:
            hasDoubleBorderBottomInMobile,
        },
      ])}
      onMouseEnter={showSubItems}
      onMouseLeave={hideSubItems}
    >
      <div
        className={cc([
          styles.navItemName,
          {
            [styles.navItemNameActive]:
              status === 'active' || shouldShowSubItems,
            [styles.navItemNameInactive]: status === 'inactive',
          },
        ])}
        onClick={isMobile ? toggleShowSubItems : undefined}
        role={status === 'active' ? 'heading' : 'navigation'}
        aria-level={1}
      >
        {name.toUpperCase()}
      </div>
      <AnimatePresence>
        {shouldShowSubItems && (
          <m.ul
            className={styles.subMenuList}
            key={name}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationVariants}
            transition={{
              duration: 0.3,
            }}
          >
            {subItems.map((subItem) => {
              const nameSlug = slugify(name)
              const subItemSlug = slugify(subItem.name)

              const href = `/${nameSlug}/${subItemSlug}`

              return (
                <li key={subItem.name}>
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
                    {subItem.name.toUpperCase()}
                  </Link>
                </li>
              )
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </li>
  )
}
