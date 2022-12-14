import Image from 'next/image'
import { Grid } from '../../../../components/layout/Grid/Grid'
import { ArchitectureProject } from '../../domain/entities/architecture'
import { styles } from './architectureProjectsListGrid.css'
import cc from 'classcat'
import Link from 'next/link'
import { slugify } from '../../../../components/layout/shared/logic/slugify'
import { themeVars } from '../../../../styles/theme.css'

type ArchitectureProjectsGridProps = {
  architectureProjects: ArchitectureProject[]
}

export const ArchitectureProjectsListGrid = ({
  architectureProjects,
}: ArchitectureProjectsGridProps): JSX.Element => (
  <Grid
    gridTemplateColumns={{ mobile: null, desktop: '1fr 2fr' }}
    gridAutoRows={{
      mobile: null,
      desktop: `calc(100vh - ${themeVars.sizes.headerLogoHeight} - ${themeVars.sizes.navItemHeight.small})`,
    }}
    gridItems={architectureProjects
      .filter((project) => !project.isComingSoon)
      .map((project, index) => ({
        key: `image_${project.id}`,
        gridColumn: { mobile: null, desktop: '1' },
        component: (
          <Link
            href={`/architecture/${slugify(project.name)}`}
            className={cc([
              styles.imageContainer,
              {
                [styles.hideBorderBottom]:
                  index === architectureProjects.length - 1,
              },
            ])}
            as={`/architecture/${slugify(project.name)}`}
          >
            <Image
              src={project.imageList.url}
              alt={project.imageList.alt ?? project.imageList.title}
              className={styles.image}
              priority
              fill
              sizes="33vw"
              quality={20}
            />
            <div className={styles.name}>{project.name.toUpperCase()}</div>
          </Link>
        ),
      }))}
  />
)
