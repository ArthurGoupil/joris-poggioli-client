export type ApiImage = {
  url: string
  title: string
  width: number
  height: number
  sizes: { thumbnail: string }
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

export const decodeApiImage = (apiImage: ApiImage): Image => ({
  url: apiImage.url,
  alt: apiImage.alt || null,
  title: apiImage.title,
  base64Thumbnail: apiImage.sizes.thumbnail,
  width: apiImage.width,
  height: apiImage.height,
})
