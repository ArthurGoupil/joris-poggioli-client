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

export const decodeAboutPress = async (
  apiAboutPress: ApiAboutPress[]
): Promise<AboutPress[]> => {
  const aboutPress = []

  for (const item of apiAboutPress) {
    aboutPress.push({
      id: item.id,
      name: item.acf.name,
      year: item.acf.year,
      cover: await decodeApiImage(item.acf.cover),
      pdf: item.acf.pdf,
    })
  }

  return aboutPress
}
