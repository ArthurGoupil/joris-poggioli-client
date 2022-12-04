import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiImageProjectLine = {
  images_type: 'landscape' | 'portrait' | 'none'
  landscape_image: ApiImage
  portrait_images: {
    first_column_type: 'image' | 'blank'
    first_column_image: ApiImage | false
    second_column_type: 'image' | 'blank'
    second_column_image: ApiImage | false
    third_column_type: 'image' | 'blank'
    third_column_image: ApiImage | false
  }
}

type ApiArchitectureProjectAcf = {
  name: string
  image_list: ApiImage
  description: string
  image_project_line_1: ApiImageProjectLine
  image_project_line_2: ApiImageProjectLine
  image_project_line_3: ApiImageProjectLine
  image_project_line_4: ApiImageProjectLine
  image_project_line_5: ApiImageProjectLine
  image_project_line_6: ApiImageProjectLine
}

export type ApiArchitectureProject = {
  id: number
  acf: ApiArchitectureProjectAcf
}

type LandscapeLine = {
  imageType: 'landscape'
  landscapeImage: Image
}

type ImageColumn = { type: 'image'; image: Image }
type BlankColumn = {
  type: 'blank'
}

export type PortraitColumn = ImageColumn | BlankColumn

export type PortraitLine = {
  imageType: 'portrait'
  firstColumn: PortraitColumn
  secondColumn: PortraitColumn
  thirdColumn: PortraitColumn
}

type ImagesProjectPage = (LandscapeLine | PortraitLine)[]

export type ArchitectureProject = {
  id: number
  name: string
  imageList: Image
  description: string
  imagesProjectPage: ImagesProjectPage
}

const decodeImageProductLine = (
  line: ApiImageProjectLine
): ImagesProjectPage[number] | undefined => {
  if (line.images_type === 'landscape') {
    return {
      imageType: 'landscape',
      landscapeImage: decodeApiImage(line.landscape_image),
    }
  } else if (line.images_type === 'portrait') {
    return {
      imageType: line.images_type,
      firstColumn:
        line.portrait_images.first_column_type === 'blank'
          ? { type: 'blank' }
          : {
              type: 'image',
              image: decodeApiImage(
                line.portrait_images.first_column_image as ApiImage
              ),
            },
      secondColumn:
        line.portrait_images.second_column_type === 'blank'
          ? { type: 'blank' }
          : {
              type: 'image',
              image: decodeApiImage(
                line.portrait_images.second_column_image as ApiImage
              ),
            },
      thirdColumn:
        line.portrait_images.second_column_type === 'blank'
          ? { type: 'blank' }
          : {
              type: 'image',
              image: decodeApiImage(
                line.portrait_images.third_column_image as ApiImage
              ),
            },
    }
  }
}

export const decodeArchitectureProjects = (
  apiArchitectureProjects: ApiArchitectureProject[]
): ArchitectureProject[] => {
  const architectureProjects: ArchitectureProject[] = []

  for (const apiProject of apiArchitectureProjects) {
    const imagesProjectPage: ImagesProjectPage = []

    for (let i = 1; i <= 6; i++) {
      const acfIndex =
        `image_project_line_${i}` as keyof ApiArchitectureProjectAcf
      if (apiProject.acf[acfIndex]) {
        const imageProductLine = decodeImageProductLine(
          apiProject.acf[acfIndex] as ApiImageProjectLine
        )
        if (imageProductLine) {
          imagesProjectPage.push(imageProductLine)
        }
      }
    }

    architectureProjects.push({
      id: apiProject.id,
      name: apiProject.acf.name,
      description: apiProject.acf.description,
      imageList: decodeApiImage(apiProject.acf.image_list),
      imagesProjectPage,
    })
  }

  return architectureProjects
}
