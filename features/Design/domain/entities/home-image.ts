import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiHomeImageAcf = {
  desktop_image: ApiImage
  mobile_image: ApiImage
}

export type ApiHomeImage = {
  id: number
  acf: ApiHomeImageAcf
}

export type HomeImage = {
  id: number
  desktopImage: Image
  mobileImage: Image
}

export const decodeHomeImage = (apiHomeImage: ApiHomeImage): HomeImage => ({
  id: apiHomeImage.id,
  desktopImage: decodeApiImage(apiHomeImage.acf.desktop_image, true),
  mobileImage: decodeApiImage(apiHomeImage.acf.mobile_image, true),
})
