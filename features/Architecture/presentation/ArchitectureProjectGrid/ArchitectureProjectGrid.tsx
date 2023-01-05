import cc from 'classcat'
import { Grid, GridProps } from '../../../../components/layout/Grid/Grid'
import { styles } from './architectureProjectGrid.css'
import {
  ArchitectureProject,
  ArchitectureProjectAll,
  PortraitColumn,
} from '../../domain/entities/architecture'
import parse from 'html-react-parser'
import { themeVars } from '../../../../styles/theme.css'
import Link from 'next/link'
import { Responsive } from '../../../shared/domain/entities/responsive'
import { ImageWithPlaceholder } from '../../../../components/data-display/ImageWithPlaceholder'

type GridItemFromPortraitColumnProps = {
  portraitColumn: PortraitColumn
  lineNumber: number
  columnNumber: number
  gridColumn: Responsive<string>
  hideBorderBottom: Responsive<boolean>
  hideBorderRight: Responsive<boolean>
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
      isHidden: { mobile: true, desktop: false },
      component: (
        <div
          className={cc([
            styles.blankContainer,
            {
              [styles.hideBorderBottom]: hideBorderBottom.desktop,
              [styles.hideBorderBottomMobile]: hideBorderBottom.mobile,
              [styles.hideBorderRight]: hideBorderRight.desktop,
              [styles.hideBorderRightMobile]: hideBorderRight.mobile,
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
              [styles.hideBorderBottom]: hideBorderBottom.desktop,
              [styles.hideBorderBottomMobile]: hideBorderBottom.mobile,
              [styles.hideBorderRight]: hideBorderRight.desktop,
              [styles.hideBorderRightMobile]: hideBorderRight.mobile,
            },
          ])}
        >
          <ImageWithPlaceholder
            src={portraitColumn.image.url}
            alt={portraitColumn.image.alt ?? portraitColumn.image.title}
            className={styles.image}
            width={portraitColumn.image.width}
            height={portraitColumn.image.height}
            quality={100}
            placeholderUrl={portraitColumn.image.base64Thumbnail}
            priority={lineNumber === 1}
          />
        </div>
      ),
    }
  }
}

type GetGridItemsFromImageLineProps = {
  line: ArchitectureProject['imagesProjectPage'][number]
  lineNumber: number
  isLastLine: boolean
}

const getGridItemsFromImageLine = ({
  line,
  lineNumber,
  isLastLine,
}: GetGridItemsFromImageLineProps): GridProps['gridItems'] => {
  if (line.imageType === 'landscape') {
    console.log(line)

    return [
      {
        key: line.landscapeImage.title,
        component: (
          <div
            className={cc([
              styles.imageContainer,
              styles.hideBorderRight,
              styles.hideBorderRightMobile,
              { [styles.hideBorderBottom]: isLastLine },
              { [styles.hideBorderBottomMobile]: isLastLine },
            ])}
          >
            <ImageWithPlaceholder
              src={line.landscapeImage.url}
              alt={line.landscapeImage.alt ?? line.landscapeImage.title}
              className={styles.image}
              width={line.landscapeImage.width}
              height={line.landscapeImage.height}
              quality={100}
              placeholderUrl={line.landscapeImage.base64Thumbnail}
              priority={lineNumber === 1}
            />
          </div>
        ),
        gridColumn: { mobile: '1', desktop: '1 / 4' },
      },
    ]
  } else {
    return [
      gridItemFromPortraitColumn({
        portraitColumn: line.firstColumn,
        lineNumber,
        columnNumber: 1,
        gridColumn: { mobile: '1', desktop: '1' },
        hideBorderBottom: {
          mobile:
            isLastLine &&
            line.secondColumn.type === 'blank' &&
            line.thirdColumn.type === 'blank',
          desktop: isLastLine,
        },
        hideBorderRight: {
          mobile: true,
          desktop:
            line.firstColumn.type === 'blank' &&
            line.secondColumn.type === 'blank',
        },
      }),
      gridItemFromPortraitColumn({
        portraitColumn: line.secondColumn,
        lineNumber,
        columnNumber: 2,
        gridColumn: { mobile: '1', desktop: '2' },
        hideBorderBottom: {
          mobile: isLastLine && line.thirdColumn.type === 'blank',
          desktop: isLastLine,
        },
        hideBorderRight: {
          mobile: true,
          desktop:
            line.secondColumn.type === 'blank' &&
            line.thirdColumn.type === 'blank',
        },
      }),
      gridItemFromPortraitColumn({
        portraitColumn: line.thirdColumn,
        lineNumber,
        columnNumber: 3,
        gridColumn: { mobile: '1', desktop: '3' },
        hideBorderBottom: { mobile: true, desktop: isLastLine },
        hideBorderRight: { mobile: true, desktop: true },
      }),
    ]
  }
}

const getGridItemsFromImageLines = (
  architectureProject: ArchitectureProject
): GridProps['gridItems'] => {
  const gridItems: GridProps['gridItems'] = []

  architectureProject.imagesProjectPage.forEach((imageLine, index) => {
    const isLastLine =
      index === architectureProject.imagesProjectPage.length - 1

    gridItems.push(
      ...getGridItemsFromImageLine({
        line: imageLine,
        lineNumber: index + 1,
        isLastLine,
      })
    )
  })

  return gridItems
}

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
        gridItems={getGridItemsFromImageLines(architectureProject)}
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
