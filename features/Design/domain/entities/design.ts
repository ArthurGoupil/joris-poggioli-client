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
  depth?: string
}

type ApiImageProductLine = {
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
  limited_edition_of?: string
  material?: string
  dimensions?: Dimensions
  lead_time?: string
  images_by?: string
  technical_sheet?: string | false
  image_grid: ApiImage
  image_product_line_1: ApiImageProductLine
  image_product_line_2?: ApiImageProductLine
  image_product_line_3?: ApiImageProductLine
  image_product_line_4?: ApiImageProductLine
  image_product_line_5?: ApiImageProductLine
  image_product_line_6?: ApiImageProductLine
  image_product_line_7?: ApiImageProductLine
  image_product_line_8?: ApiImageProductLine
  image_product_line_9?: ApiImageProductLine
  image_product_line_10?: ApiImageProductLine
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
  thirdColumn: PortraitColumn | null
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
  limitedEdtionOf: string | null
  material: string | null
  dimensions: Dimensions | null
  leadTime: string | null
  imagesBy: string | null
  technicalSheet: string | null
  imageGrid: Image
  imagesProductPage: ImagesProductPage
  freeText: string | null
  displayOnHome: boolean
}

const decodeImageProductLine = (
  line: ApiImageProductLine
): ImagesProductPage[number] | undefined => {
  if (line.images_type === 'landscape') {
    return {
      imageType: 'landscape',
      landscapeImage: decodeApiImage(line.landscape_image, true),
    }
  } else if (line.images_type === 'portrait') {
    return {
      imageType: line.images_type,
      firstColumn:
        line.portrait_images.first_column_type === 'image' &&
        line.portrait_images.first_column_image
          ? {
              type: 'image',
              image: decodeApiImage(
                line.portrait_images.first_column_image as ApiImage,
                true
              ),
            }
          : { type: 'blank' },
      secondColumn:
        line.portrait_images.second_column_type === 'image' &&
        line.portrait_images.second_column_image
          ? {
              type: 'image',
              image: decodeApiImage(
                line.portrait_images.second_column_image as ApiImage,
                true
              ),
            }
          : { type: 'blank' },
      thirdColumn: line.portrait_images.third_column_type
        ? line.portrait_images.third_column_type === 'image' &&
          line.portrait_images.third_column_image
          ? {
              type: 'image',
              image: decodeApiImage(
                line.portrait_images.third_column_image as ApiImage,
                true
              ),
            }
          : { type: 'blank' }
        : null,
    }
  }
}

export const decodeDesignItems = async (
  apiDesignItems: ApiDesignItem[]
): Promise<DesignItem[]> => {
  const designItems: DesignItem[] = []

  for (const apiItem of apiDesignItems) {
    const imagesProductPage: ImagesProductPage = []

    for (let i = 1; i <= 10; i++) {
      const acfIndex = `image_product_line_${i}` as keyof ApiDesignItemAcf
      if (apiItem.acf[acfIndex]) {
        const imageProductLine = decodeImageProductLine(
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
      limitedEdtionOf: apiItem.acf.limited_edition_of ?? null,
      material: apiItem.acf.material ?? null,
      dimensions:
        apiItem.acf.dimensions &&
        (apiItem.acf.dimensions.depth ||
          apiItem.acf.dimensions.diameter ||
          apiItem.acf.dimensions.height ||
          apiItem.acf.dimensions.width)
          ? apiItem.acf.dimensions
          : null,
      leadTime: apiItem.acf.lead_time ?? null,
      imagesBy: apiItem.acf.images_by ?? null,
      technicalSheet: apiItem.acf.technical_sheet || null,
      imageGrid: decodeApiImage(apiItem.acf.image_grid),
      imagesProductPage,
      freeText: apiItem.acf.free_text ?? null,
      displayOnHome: apiItem.acf.home_display ?? false,
    })
  }

  return designItems
}
