import { getPlaiceholder } from 'plaiceholder'

export type ApiImage = {
  url: string
  title: string
  width: number
  height: number
  sizes: {
    thumbnail: string
    large: string
    'large-width': number
    'large-height': number
  }
  alt?: string
}

export type Image = {
  url: string
  base64Thumbnail: string
  title: string
  width: number
  height: number
  alt: string | null
}

export const decodeApiImage = async (
  apiImage: ApiImage,
  withLargeSize = false
): Promise<Image> => {
  const { base64 } = await getPlaiceholder(apiImage.sizes.thumbnail, {
    size: 64,
    removeAlpha: false,
  })

  return {
    url: withLargeSize ? apiImage.sizes.large : apiImage.url,
    alt: apiImage.alt || null,
    title: apiImage.title,
    base64Thumbnail: base64,
    width: withLargeSize ? apiImage.sizes['large-width'] : apiImage.width,
    height: withLargeSize ? apiImage.sizes['large-height'] : apiImage.height,
  }
}
