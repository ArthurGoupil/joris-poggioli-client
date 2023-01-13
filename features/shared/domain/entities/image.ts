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
    '1536x1536': string
    '1536x1536-width': number
    '1536x1536-height': number
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

export const decodeApiImage = (
  apiImage: ApiImage,
  withLargeSize = true
): Image => {
  return {
    url: withLargeSize ? apiImage.sizes['1536x1536'] : apiImage.url,
    alt: apiImage.alt || null,
    title: apiImage.title,
    base64Thumbnail: apiImage.sizes.thumbnail,
    width: withLargeSize ? apiImage.sizes['1536x1536-width'] : apiImage.width,
    height: withLargeSize
      ? apiImage.sizes['1536x1536-height']
      : apiImage.height,
  }
}
