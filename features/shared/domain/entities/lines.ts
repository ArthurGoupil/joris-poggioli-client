import { ApiImage, decodeApiImage, Image } from './image'

type LandscapeLine = {
  imageType: 'landscape'
  landscapeImage: Image
}

type ImageColumn = { type: 'image'; image: Image }
type BlankColumn = {
  type: 'blank'
}

export type PortraitColumn = ImageColumn | BlankColumn

type PortraitLine = {
  imageType: 'portrait'
  firstColumn: PortraitColumn
  secondColumn: PortraitColumn
  thirdColumn: PortraitColumn | null
}

export type PortraitLandscapeLine = {
  imageType: 'portrait-landscape'
  portraitColumn: PortraitColumn
  landscapeImage: Image
}

export type LandscapePortraitLine = {
  imageType: 'landscape-portrait'
  landscapeImage: Image
  portraitColumn: PortraitColumn
}

export type Lines = (
  | LandscapeLine
  | PortraitLine
  | PortraitLandscapeLine
  | LandscapePortraitLine
)[]

type PortraitType = 'image' | 'blank'

export type ApiLine = {
  images_type:
    | 'landscape'
    | 'portrait'
    | 'portrait-landscape'
    | 'landscape-portrait'
    | 'none'
  landscape_image: ApiImage
  portrait_images: {
    first_column_type: PortraitType
    first_column_image: ApiImage | false
    second_column_type: PortraitType
    second_column_image: ApiImage | false
    third_column_type: PortraitType
    third_column_image: ApiImage | false
  }
  portrait_landscape_images: {
    portrait_image_type: PortraitType
    portrait_image: ApiImage | false
    landscape_image: ApiImage
  }
  landscape_portrait_images: {
    landscape_image: ApiImage
    portrait_image_type: PortraitType
    portrait_image: ApiImage | false
  }
}

export const decodeLine = (line: ApiLine): Lines[number] | undefined => {
  switch (line.images_type) {
    case 'landscape':
      return {
        imageType: 'landscape',
        landscapeImage: decodeApiImage(line.landscape_image, true),
      }
    case 'portrait':
      return {
        imageType: 'portrait',
        firstColumn:
          line.portrait_images.first_column_type === 'image' &&
          line.portrait_images.first_column_image
            ? {
                type: 'image',
                image: decodeApiImage(
                  line.portrait_images.first_column_image,
                  true
                ),
              }
            : { type: 'blank' },
        secondColumn:
          line.portrait_images.second_column_type === 'image' &&
          line.portrait_images.second_column_image
            ? {
                type: 'image',
                image: decodeApiImage(
                  line.portrait_images.second_column_image,
                  true
                ),
              }
            : { type: 'blank' },
        thirdColumn: line.portrait_images.third_column_type
          ? line.portrait_images.third_column_type === 'image' &&
            line.portrait_images.third_column_image
            ? {
                type: 'image',
                image: decodeApiImage(
                  line.portrait_images.third_column_image,
                  true
                ),
              }
            : { type: 'blank' }
          : null,
      }
    case 'portrait-landscape':
      return {
        imageType: 'portrait-landscape',
        portraitColumn:
          line.portrait_landscape_images.portrait_image_type === 'image' &&
          line.portrait_landscape_images.portrait_image
            ? {
                type: 'image',
                image: decodeApiImage(
                  line.portrait_landscape_images.portrait_image,
                  true
                ),
              }
            : { type: 'blank' },
        landscapeImage: decodeApiImage(
          line.portrait_landscape_images.landscape_image,
          true
        ),
      }
    case 'landscape-portrait':
      return {
        imageType: 'landscape-portrait',
        portraitColumn:
          line.landscape_portrait_images.portrait_image_type === 'image' &&
          line.landscape_portrait_images.portrait_image
            ? {
                type: 'image',
                image: decodeApiImage(
                  line.landscape_portrait_images.portrait_image,
                  true
                ),
              }
            : { type: 'blank' },
        landscapeImage: decodeApiImage(
          line.landscape_portrait_images.landscape_image,
          true
        ),
      }
  }
}
