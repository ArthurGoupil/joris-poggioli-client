import {
  ApiImage,
  decodeApiImage,
  Image,
} from '../../../shared/domain/entities/image'

type ApiAboutJorisPoggioliTextAcf = {
  text_content: string
}

export type ApiAboutJorisPoggioliText = {
  id: number
  acf: ApiAboutJorisPoggioliTextAcf
}

type ApiAboutJorisPoggioliImageAcf = {
  image: ApiImage
}

export type ApiAboutJorisPoggioliImage = {
  id: number
  acf: ApiAboutJorisPoggioliImageAcf
}

export type AboutJorisPoggioli = {
  id: number
  textContent: string
  image: Image
}

export const decodeAboutJorisPoggioli = (
  apiAboutJorisPoggioliText: ApiAboutJorisPoggioliText,
  apiAboutJorisPoggioliImage: ApiAboutJorisPoggioliImage
): AboutJorisPoggioli => ({
  id: apiAboutJorisPoggioliText.id,
  textContent: apiAboutJorisPoggioliText.acf.text_content,
  image: decodeApiImage(apiAboutJorisPoggioliImage.acf.image),
})
