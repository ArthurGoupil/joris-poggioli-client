import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import {
  BaseNavItemsProps,
  NavItemStatus,
} from '../../../features/Nav/domain/entities/nav'
import { Grid } from '../Grid/Grid'
import { styles } from './header.css'
import {
  NavItem,
  NavItemProps,
} from '../../../features/Nav/presentation/NavItem/NavItem'
import Logo from '../../../public/logo.svg'
import Image from 'next/image'

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
      <Link href="/" className={styles.logoContainer}>
        <Image src={Logo} alt="Logo Joris Poggioli" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <ul ref={navListRef} className={styles.navList}>
          <Grid
            gridAutoRows={{ mobile: 'auto', desktop: 'auto' }}
            gridTemplateColumns={{ mobile: '1fr', desktop: 'repeat(3, 1fr)' }}
            gridItems={[
              {
                gridColumn: { mobile: '1', desktop: '1' },
                key: 'design',
                component: (
                  <NavItem
                    {...navItems[0]}
                    shouldShowSubItems={openMenu === navItems[0].name}
                    showSubItems={(): void => {
                      setOpenMenu(navItems[0].name)
                    }}
                    hideSubItems={(): void => {
                      setOpenMenu(undefined)
                    }}
                    checkSubItemIsSelected={(slug): boolean =>
                      router.query.type === slug
                    }
                    status={getNavItemStatus(navItems[0].name)}
                    hasDoubleBorderTopInMobile={openMenu === navItems[0].name}
                    hasBorderRight={{ mobile: false, desktop: true }}
                  />
                ),
              },
              {
                gridColumn: { mobile: '1', desktop: '2 / 3' },
                key: 'architecture',
                component: (
                  <NavItem
                    {...navItems[1]}
                    shouldShowSubItems={openMenu === navItems[1].name}
                    showSubItems={(): void => {
                      setOpenMenu(navItems[1].name)
                    }}
                    hideSubItems={(): void => {
                      setOpenMenu(undefined)
                    }}
                    checkSubItemIsSelected={(slug): boolean =>
                      router.query.project === slug
                    }
                    status={getNavItemStatus(navItems[1].name)}
                    hasDoubleBorderTopInMobile={
                      openMenu === navItems[1].name ||
                      openMenu === navItems[0].name
                    }
                    hasBorderRight={{ mobile: false, desktop: true }}
                  />
                ),
              },
              {
                gridColumn: { mobile: '1', desktop: '3 / 4' },
                key: 'about',
                component: (
                  <NavItem
                    {...navItems[2]}
                    shouldShowSubItems={openMenu === navItems[2].name}
                    showSubItems={(): void => {
                      setOpenMenu(navItems[2].name)
                    }}
                    hideSubItems={(): void => {
                      setOpenMenu(undefined)
                    }}
                    checkSubItemIsSelected={(slug): boolean =>
                      router.pathname.includes(slug)
                    }
                    status={getNavItemStatus(navItems[2].name)}
                    hasDoubleBorderTopInMobile={
                      openMenu === navItems[2].name ||
                      openMenu === navItems[1].name
                    }
                    hasDoubleBorderBottomInMobile={
                      openMenu === navItems[2].name
                    }
                    hasBorderBottom={{ mobile: true, desktop: false }}
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
