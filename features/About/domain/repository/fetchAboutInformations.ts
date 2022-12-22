import axios from 'axios'
import {
  AboutInformations,
  ApiAboutInformationsImage,
  ApiAboutInformationsText,
  decodeAboutInformations,
} from '../entities/informations'

export const fetchAboutInformations = async (): Promise<AboutInformations> => {
  try {
    const textPromise = axios.get<ApiAboutInformationsText>(
      `${process.env.WP_URL}/about-texts/246?_fields=id,acf`
    )
    const imagePromise = axios.get<ApiAboutInformationsImage>(
      `${process.env.WP_URL}/about-images/249?_fields=id,acf`
    )

    const responses = await Promise.all([textPromise, imagePromise])

    return decodeAboutInformations(responses[0].data, responses[1].data)
  } catch (error) {
    console.error('About Joris Poggioli', error)
    return {
      id: 0,
      textContent: 'Erreur lors du chargement des données.',
      image: {
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
