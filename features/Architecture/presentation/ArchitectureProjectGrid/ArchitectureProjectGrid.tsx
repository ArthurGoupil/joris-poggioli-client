import Image from 'next/image'
import cc from 'classcat'
import { Grid, GridProps } from '../../../../components/layout/Grid/Grid'
import { styles } from './architectureProjectGrid.css'
import {
  ArchitectureProject,
  PortraitColumn,
} from '../../domain/entities/architecture'
import parse from 'html-react-parser'
import { themeVars } from '../../../../styles/theme.css'
import Link from 'next/link'

type GridItemFromPortraitColumnProps = {
  portraitColumn: PortraitColumn
  lineNumber: number
  columnNumber: number
  gridColumn: string
  hideBorderBottom: boolean
  hideBorderRight: boolean
}

const gridItemFromPortraitColumn = ({
  portraitColumn,
  lineNumber,
  columnNumber,
  gridColumn,
  hideBorderBottom,
  hideBorderRight,
}: GridItemFromPortraitColumnProps): GridProps['gridItems'][number] => {
  if (portraitColumn.type === 'blank') {
    return {
      key: `blank-${lineNumber}-${columnNumber}`,
      gridColumn,
      component: (
        <div
          className={cc([
            styles.blankContainer,
            {
              [styles.hideBorderBottom]: hideBorderBottom,
              [styles.hideBorderRight]: hideBorderRight,
            },
          ])}
        />
      ),
    }
  } else {
    return {
      key: portraitColumn.image.title,
      gridColumn,
      component: (
        <div
          className={cc([
            styles.imageContainer,
            {
              [styles.hideBorderBottom]: hideBorderBottom,
              [styles.hideBorderRight]: columnNumber === 3,
            },
          ])}
        >
          <Image
            src={portraitColumn.image.url}
            alt={portraitColumn.image.alt ?? portraitColumn.image.title}
            className={styles.image}
            priority
            fill
            sizes="33vw"
            quality={40}
          />
        </div>
      ),
    }
  }
}

type GetGridItemsFromImageLineProps = {
  line: ArchitectureProject['imagesProjectPage'][number]
  lineNumber: number
  hideBorderBottom: boolean
}

const getGridItemsFromImageLine = ({
  line,
  lineNumber,
  hideBorderBottom,
}: GetGridItemsFromImageLineProps): GridProps['gridItems'] => {
  if (line.imageType === 'landscape') {
    return [
      {
        key: line.landscapeImage.title,
        component: (
          <div
            className={cc([
              styles.imageContainer,
              styles.hideBorderRight,
              { [styles.hideBorderBottom]: hideBorderBottom },
            ])}
          >
            <Image
              src={line.landscapeImage.url}
              alt={line.landscapeImage.alt ?? line.landscapeImage.title}
              className={styles.image}
              priority
              fill
              sizes="66vw"
              quality={40}
            />
          </div>
        ),
        gridColumn: '1 / 4',
      },
    ]
  } else {
    return [
      gridItemFromPortraitColumn({
        portraitColumn: line.firstColumn,
        lineNumber,
        columnNumber: 1,
        gridColumn: '1',
        hideBorderBottom,
        hideBorderRight:
          line.firstColumn.type === 'blank' &&
          line.secondColumn.type === 'blank',
      }),
      gridItemFromPortraitColumn({
        portraitColumn: line.secondColumn,
        lineNumber,
        columnNumber: 2,
        gridColumn: '2 / 3',
        hideBorderBottom,
        hideBorderRight:
          line.secondColumn.type === 'blank' &&
          line.thirdColumn.type === 'blank',
      }),
      gridItemFromPortraitColumn({
        portraitColumn: line.thirdColumn,
        lineNumber,
        columnNumber: 3,
        gridColumn: '3 / 4',
        hideBorderBottom,
        hideBorderRight: true,
      }),
    ]
  }
}

const getGridItemsFromImageLines = (
  architectureProject: ArchitectureProject
): GridProps['gridItems'] => {
  const gridItems: GridProps['gridItems'] = []

  architectureProject.imagesProjectPage.forEach((imageLine, index) => {
    const hideBorderBottom =
      index === architectureProject.imagesProjectPage.length - 1

    gridItems.push(
      ...getGridItemsFromImageLine({
        line: imageLine,
        lineNumber: index + 1,
        hideBorderBottom,
      })
    )
  })

  return gridItems
}

type ArchitectureProjectGridProps = {
  architectureProject: ArchitectureProject
}

export const ArchitectureProjectGrid = ({
  architectureProject,
}: ArchitectureProjectGridProps): JSX.Element => (
  <>
    <Grid
      gridAutoRows={{
        mobile: null,
        desktop: `calc(100vh - ${themeVars.sizes.headerLogoHeight} - ${themeVars.sizes.navItemHeight})`,
      }}
      gridTemplateColumns={{ mobile: null, desktop: 'repeat(3, 1fr)' }}
      gridItems={getGridItemsFromImageLines(architectureProject)}
    />
    <Grid
      gridAutoRows={{ mobile: null, desktop: 'auto' }}
      gridTemplateColumns={{ mobile: null, desktop: 'repeat(3, 1fr)' }}
      gridItems={[
        {
          key: 'description',
          gridColumn: { mobile: null, desktop: '3 / 4' },
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
