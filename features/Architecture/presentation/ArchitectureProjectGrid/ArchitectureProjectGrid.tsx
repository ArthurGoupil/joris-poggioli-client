import { Grid } from '../../../../components/layout/Grid/Grid'
import { styles } from './architectureProjectGrid.css'
import { ArchitectureProjectAll } from '../../domain/entities/architecture'
import parse from 'html-react-parser'
import { themeVars } from '../../../../styles/theme.css'
import Link from 'next/link'
import { getGridItemsFromImageLines } from '../../../shared/presentation/GridItems/GridItems'

type ArchitectureProjectGridProps = {
  architectureProject: ArchitectureProjectAll
}

export const ArchitectureProjectGrid = ({
  architectureProject,
}: ArchitectureProjectGridProps): JSX.Element => {
  if (architectureProject.isComingSoon) {
    return <div className={styles.comingSoon}>COMING SOON</div>
  }

  return (
    <>
      <Grid
        gridAutoRows={{
          mobile: 'auto',
          desktop: `calc(100vh - ${themeVars.sizes.headerLogoHeight.desktop} - ${themeVars.sizes.navItemHeight.desktop})`,
        }}
        gridTemplateColumns={{ mobile: '1fr', desktop: 'repeat(3, 1fr)' }}
        hasBorderBottom={{ mobile: true, desktop: true }}
        gridItems={getGridItemsFromImageLines({
          lines: architectureProject.imagesProjectPage,
          type: 'architecture',
        })}
      />
      <Grid
        gridAutoRows={{ mobile: 'auto', desktop: 'auto' }}
        gridTemplateColumns={{ mobile: '1', desktop: 'repeat(3, 1fr)' }}
        hasBorderBottom={{ mobile: false, desktop: false }}
        gridItems={[
          {
            key: 'description',
            gridColumn: { mobile: '1', desktop: '3' },
            component: (
              <div className={styles.text}>
                <h2>{architectureProject.name.toUpperCase()}</h2>
                {parse(architectureProject.description)}
                <Link href="/architecture/all" className={styles.back}>
                  BACK
                </Link>
              </div>
            ),
          },
        ]}
      />
    </>
  )
}
