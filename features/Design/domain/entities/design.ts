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

type Dimensions = {
  width?: string
  height?: string
  diameter?: string
  depth?: string
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
  image_product_line_1: ApiLine
  image_product_line_2?: ApiLine
  image_product_line_3?: ApiLine
  image_product_line_4?: ApiLine
  image_product_line_5?: ApiLine
  image_product_line_6?: ApiLine
  image_product_line_7?: ApiLine
  image_product_line_8?: ApiLine
  image_product_line_9?: ApiLine
  image_product_line_10?: ApiLine
  free_text?: string
  home_display?: boolean
}

export type ApiDesignItem = {
  id: string
  acf: ApiDesignItemAcf
}

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
  imagesProductPage: Lines
  freeText: string | null
  displayOnHome: boolean
}

export const decodeDesignItems = async (
  apiDesignItems: ApiDesignItem[]
): Promise<DesignItem[]> => {
  const designItems: DesignItem[] = []

  for (const apiItem of apiDesignItems) {
    const imagesProductPage: Lines = []

    for (let i = 1; i <= 10; i++) {
      const acfIndex = `image_product_line_${i}` as keyof ApiDesignItemAcf
      if (apiItem.acf[acfIndex]) {
        const imageProductLine = decodeLine(apiItem.acf[acfIndex] as ApiLine)
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
