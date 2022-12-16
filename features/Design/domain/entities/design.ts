import { slugify } from '../../../../components/layout/shared/logic/slugify'
import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type Dimensions = {
  width?: string
  height?: string
  diameter?: string
}

type ApiImageProductLine = {
  images_type: 'landscape' | 'portrait' | 'none'
  landscape_image: ApiImage
  portrait_images: {
    first_column_type: 'image' | 'blank'
    first_column_image: ApiImage | false
    second_column_type: 'image' | 'blank'
    second_column_image: ApiImage | false
  }
}

type ApiDesignType = {
  ID: number
  post_title: string
}

type ApiDesignItemAcf = {
  name: string
  design_item_type: [ApiDesignType]
  year?: string
  design_by?: string
  made_in?: string
  numbered_and_signed_pieces: boolean
  material?: string
  dimensions?: Dimensions
  technical_sheet?: string | false
  image_grid: ApiImage
  image_product_line_1: ApiImageProductLine
  image_product_line_2?: ApiImageProductLine
  image_product_line_3?: ApiImageProductLine
  image_product_line_4?: ApiImageProductLine
  image_product_line_5?: ApiImageProductLine
  image_product_line_6?: ApiImageProductLine
  free_text?: string
  home_display?: boolean
}

export type ApiDesignItem = {
  id: string
  acf: ApiDesignItemAcf
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
}

type ImagesProductPage = (LandscapeLine | PortraitLine)[]

export type DesignItem = {
  id: string
  name: string
  slug: string
  designType: string
  designTypeSlug: string
  year: string | null
  designBy: string | null
  madeIn: string | null
  hasNumberedSignedPieces: boolean
  material: string | null
  dimensions: Dimensions | null
  technicalSheet: string | null
  imageGrid: Image
  imagesProductPage: ImagesProductPage
  freeText: string | null
  displayOnHome: boolean
}

const decodeImageProductLine = async (
  line: ApiImageProductLine
): Promise<ImagesProductPage[number] | undefined> => {
  if (line.images_type === 'landscape') {
    return {
      imageType: 'landscape',
      landscapeImage: await decodeApiImage(line.landscape_image),
    }
  } else if (line.images_type === 'portrait') {
    return {
      imageType: line.images_type,
      firstColumn:
        line.portrait_images.first_column_type === 'blank'
          ? { type: 'blank' }
          : {
              type: 'image',
              image: await decodeApiImage(
                line.portrait_images.first_column_image as ApiImage
              ),
            },
      secondColumn:
        line.portrait_images.second_column_type === 'blank'
          ? { type: 'blank' }
          : {
              type: 'image',
              image: await decodeApiImage(
                line.portrait_images.second_column_image as ApiImage
              ),
            },
    }
  }
}

export const decodeDesignItems = async (
  apiDesignItems: ApiDesignItem[]
): Promise<DesignItem[]> => {
  const designItems: DesignItem[] = []

  for (const apiItem of apiDesignItems) {
    const imagesProductPage: ImagesProductPage = []

    for (let i = 1; i <= 6; i++) {
      const acfIndex = `image_product_line_${i}` as keyof ApiDesignItemAcf
      if (apiItem.acf[acfIndex]) {
        const imageProductLine = await decodeImageProductLine(
          apiItem.acf[acfIndex] as ApiImageProductLine
        )
        if (imageProductLine) {
          imagesProductPage.push(imageProductLine)
        }
      }
    }

    designItems.push({
      id: apiItem.id,
      name: apiItem.acf.name,
      slug: slugify(apiItem.acf.name),
      designType: apiItem.acf.design_item_type[0].post_title,
      designTypeSlug: slugify(apiItem.acf.design_item_type[0].post_title),
      year: apiItem.acf.year ?? null,
      designBy: apiItem.acf.design_by ?? null,
      madeIn: apiItem.acf.made_in ?? null,
      hasNumberedSignedPieces: apiItem.acf.numbered_and_signed_pieces,
      material: apiItem.acf.material ?? null,
      dimensions: apiItem.acf.dimensions ?? null,
      technicalSheet: apiItem.acf.technical_sheet || null,
      imageGrid: await decodeApiImage(apiItem.acf.image_grid),
      imagesProductPage,
      freeText: apiItem.acf.free_text ?? null,
      displayOnHome: apiItem.acf.home_display ?? false,
    })
  }

  return designItems
}
