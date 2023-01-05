import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiAboutInformationsTextAcf = {
  text_content: string
}

export type ApiAboutInformationsText = {
  id: number
  acf: ApiAboutInformationsTextAcf
}

type ApiAboutInformationsImageAcf = {
  image: ApiImage
}

export type ApiAboutInformationsImage = {
  id: number
  acf: ApiAboutInformationsImageAcf
}

export type AboutInformations = {
  id: number
  textContent: string
  image: Image
}

export const decodeAboutInformations = (
  apiAboutInformationsText: ApiAboutInformationsText,
  apiAboutInformationsImage: ApiAboutInformationsImage
): AboutInformations => ({
  id: apiAboutInformationsText.id,
  textContent: apiAboutInformationsText.acf.text_content,
  image: decodeApiImage(apiAboutInformationsImage.acf.image, true),
})
