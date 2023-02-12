import axios from 'axios'
import {
  ApiHomeImage,
  decodeHomeImage,
  HomeImage,
} from '../entities/home-image'

export const fetchHomeImage = async (): Promise<HomeImage> => {
  try {
    const response = await axios.get<ApiHomeImage>(
      `${process.env.WP_URL}/image-home/1634?_fields=id,acf`
    )

    return decodeHomeImage(response.data)
  } catch (error) {
    console.error('Home image', error)
    return {
      id: 0,
      desktopImage: {
        alt: '',
        base64Thumbnail: '',
        height: 0,
        width: 0,
        title: '',
        url: '',
      },
      mobileImage: {
        alt: '',
        base64Thumbnail: '',
        height: 0,
        width: 0,
        title: '',
        url: '',
      },
    }
  }
}
