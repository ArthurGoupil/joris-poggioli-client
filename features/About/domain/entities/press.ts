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
  link: string
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
  pdf: string | null
  link: string | null
}

export const decodeAboutPress = (
  apiAboutPress: ApiAboutPress[]
): AboutPress[] => {
  const aboutPress = []

  for (const item of apiAboutPress) {
    aboutPress.push({
      id: item.id,
      name: item.acf.name,
      year: item.acf.year,
      cover: decodeApiImage(item.acf.cover),
      pdf: item.acf.pdf || null,
      link: item.acf.link || null,
    })
  }

  return aboutPress
}
