import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import {
  BaseNavItemsProps,
  NavItemProps,
  NavItemStatus,
} from '../../../features/Nav/domain/entities/nav'
import { Grid } from '../Grid/Grid'
import { styles } from './header.css'
import { NavItem } from '../../../features/Nav/presentation/NavItem/NavItem'

type HeaderProps = {
  navItems: BaseNavItemsProps[]
}

export const Header = ({ navItems }: HeaderProps): JSX.Element | null => {
  const [openMenu, setOpenMenu] = React.useState<NavItemProps['name']>()
  const router = useRouter()
  const navListRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (router.asPath) {
      setOpenMenu(undefined)
    }
  }, [router.asPath])

  useEffect(() => {
    const handleOnClickOutside = (e: MouseEvent): void => {
      if (
        navListRef.current &&
        !navListRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(undefined)
      }
    }

    window.addEventListener('click', handleOnClickOutside)

    return () => window.removeEventListener('click', handleOnClickOutside)
  }, [])

  if (!navItems) {
    return null
  }

  const getNavItemStatus = (name: string): NavItemStatus => {
    const isAMenuSelected = navItems.some((item) =>
      router.pathname.includes(item.name.toLowerCase())
    )
    const isSelected = router.pathname.includes(name.toLowerCase())

    if (
      (openMenu && openMenu !== name && !isSelected) ||
      (isAMenuSelected && !isSelected)
    ) {
      return 'inactive'
    } else if (isSelected) {
      return 'active'
    }

    return 'default'
  }

  return (
    <header className={styles.headerContainer}>
      <Link href="/" className={styles.logo}>
        JORIS POGGIOLI
      </Link>
      <nav>
        <ul ref={navListRef} className={styles.navList}>
          <Grid
            gridAutoRows="auto"
            gridTemplateColumns="repeat(3, 1fr)"
            gridItems={[
              {
                gridColumn: '1',
                key: 'design',
                component: (
                  <NavItem
                    {...navItems[0]}
                    showSubItems={openMenu === navItems[0].name}
                    onMouseEnter={(): void => {
                      setOpenMenu(navItems[0].name)
                    }}
                    onMouseLeave={(): void => {
                      setOpenMenu(undefined)
                    }}
                    checkSubItemIsSelected={(slug): boolean =>
                      router.query.type === slug
                    }
                    status={getNavItemStatus(navItems[0].name)}
                    hasBorderRight
                  />
                ),
              },
              {
                gridColumn: '2 / 3',
                key: 'architecture',
                component: (
                  <NavItem
                    {...navItems[1]}
                    showSubItems={openMenu === navItems[1].name}
                    onMouseEnter={(): void => {
                      setOpenMenu(navItems[1].name)
                    }}
                    onMouseLeave={(): void => {
                      setOpenMenu(undefined)
                    }}
                    checkSubItemIsSelected={(slug): boolean =>
                      router.query.project === slug
                    }
                    status={getNavItemStatus(navItems[1].name)}
                    hasBorderRight
                  />
                ),
              },
              {
                gridColumn: '3 / 4',
                key: 'about',
                component: (
                  <NavItem
                    {...navItems[2]}
                    showSubItems={openMenu === navItems[2].name}
                    onMouseEnter={(): void => {
                      setOpenMenu(navItems[2].name)
                    }}
                    onMouseLeave={(): void => {
                      setOpenMenu(undefined)
                    }}
                    checkSubItemIsSelected={(slug): boolean =>
                      router.query.category === slug
                    }
                    status={getNavItemStatus(navItems[2].name)}
                  />
                ),
              },
            ]}
          />
        </ul>
      </nav>
    </header>
  )
}
