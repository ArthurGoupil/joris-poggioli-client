import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiAboutInformationTextAcf = {
  text_content: string
}

export type ApiAboutInformationText = {
  id: number
  acf: ApiAboutInformationTextAcf
}

type ApiAboutInformationImageAcf = {
  image: ApiImage
}

export type ApiAboutInformationImage = {
  id: number
  acf: ApiAboutInformationImageAcf
}

export type AboutInformation = {
  id: number
  textContent: string
  image: Image
}

export const decodeAboutInformation = (
  apiAboutInformationText: ApiAboutInformationText,
  apiAboutInformationImage: ApiAboutInformationImage
): AboutInformation => ({
  id: apiAboutInformationText.id,
  textContent: apiAboutInformationText.acf.text_content,
  image: decodeApiImage(apiAboutInformationImage.acf.image, true),
})
