import { slugify } from '../../../../components/layout/shared/logic/slugify'
import {
  ApiLine,
  decodeLine,
  Lines,
} from '../../../shared/domain/entities/lines'
import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiArchitectureProjectAcf = {
  name: string
  coming_soon: boolean
  image_list: ApiImage
  description: string
  image_project_line_1: ApiLine
  image_project_line_2: ApiLine
  image_project_line_3: ApiLine
  image_project_line_4: ApiLine
  image_project_line_5: ApiLine
  image_project_line_6: ApiLine
  image_project_line_7: ApiLine
  image_project_line_8: ApiLine
  image_project_line_9: ApiLine
  image_project_line_10: ApiLine
}

export type ApiArchitectureProject = {
  id: number
  acf: ApiArchitectureProjectAcf
}

export type ArchitectureProject = {
  id: number
  name: string
  isComingSoon: false
  slug: string
  imageList: Image
  description: string
  imagesProjectPage: Lines
}

type ComingSoonArchitectureProject = {
  id: number
  name: string
  slug: string
  isComingSoon: true
}

export type ArchitectureProjectAll =
  | ArchitectureProject
  | ComingSoonArchitectureProject

export const decodeArchitectureProjects = (
  apiArchitectureProjects: ApiArchitectureProject[]
): ArchitectureProjectAll[] => {
  const architectureProjects: ArchitectureProjectAll[] = []

  for (const apiProject of apiArchitectureProjects) {
    if (apiProject.acf.coming_soon) {
      architectureProjects.push({
        id: apiProject.id,
        name: apiProject.acf.name,
        slug: slugify(apiProject.acf.name),
        isComingSoon: true,
      })
    } else {
      const imagesProjectPage: Lines = []

      for (let i = 1; i <= 10; i++) {
        const acfIndex =
          `image_project_line_${i}` as keyof ApiArchitectureProjectAcf
        if (apiProject.acf[acfIndex]) {
          const imageProductLine = decodeLine(
            apiProject.acf[acfIndex] as ApiLine
          )
          if (imageProductLine) {
            imagesProjectPage.push(imageProductLine)
          }
        }
      }

      architectureProjects.push({
        id: apiProject.id,
        name: apiProject.acf.name,
        isComingSoon: apiProject.acf.coming_soon ?? false,
        slug: slugify(apiProject.acf.name),
        description: apiProject.acf.description,
        imageList: decodeApiImage(apiProject.acf.image_list),
        imagesProjectPage,
      })
    }
  }

  return architectureProjects
}
