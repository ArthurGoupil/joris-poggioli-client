import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiAboutPressAcf = {
  name: string
  year: string
  cover: ApiImage
  pdf: string
}

export type ApiAboutPress = {
  id: number
  acf: ApiAboutPressAcf
}

export type AboutPress = {
  id: number
  name: string
  year: string
  cover: Image
  pdf: string
}

export const decodeAboutPress = (
  apiAboutPress: ApiAboutPress[]
): AboutPress[] =>
  apiAboutPress.map((item) => ({
    id: item.id,
    name: item.acf.name,
    year: item.acf.year,
    cover: decodeApiImage(item.acf.cover),
    pdf: item.acf.pdf,
  }))
