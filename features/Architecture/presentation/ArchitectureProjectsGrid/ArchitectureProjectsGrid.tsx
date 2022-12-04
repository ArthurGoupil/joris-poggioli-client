import Image from 'next/image'
import { Grid, GridProps } from '../../../../components/layout/Grid/Grid'
import { ArchitectureProject } from '../../domain/entities/architecture'
import { styles } from './architectureProjectsGrid.css'
import cc from 'classcat'
import Link from 'next/link'
import { slugify } from '../../../../components/layout/shared/logic/slugify'

type ArchitectureProjectsGridProps = {
  architectureProjects: ArchitectureProject[]
}

export const ArchitectureProjectsGrid = ({
  architectureProjects,
}: ArchitectureProjectsGridProps): JSX.Element => {
  const gridItems: GridProps['gridItems'] = []

  architectureProjects?.forEach((project, index) => {
    gridItems.push(
      {
        key: `image_${project.id}`,
        gridColumn: '1',
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
            />
          </Link>
        ),
      },
      {
        key: `name_${project.id}`,
        gridColumn: '2',
        component: (
          <Link
            href={`/architecture/${slugify(project.name)}`}
            className={styles.name}
          >
            {project.name.toUpperCase()}
          </Link>
        ),
      }
    )
  })

  return (
    <Grid
      gridTemplateColumns="1fr 2fr"
      gridAutoRows="38vw"
      gridItems={gridItems}
    />
  )
}
