import axios from 'axios'
import {
  AboutInformation,
  ApiAboutInformationImage,
  ApiAboutInformationText,
  decodeAboutInformation,
} from '../entities/information'

export const fetchAboutInformation = async (): Promise<AboutInformation> => {
  try {
    const textPromise = axios.get<ApiAboutInformationText>(
      `${process.env.WP_URL}/about-texts/246?_fields=id,acf`
    )
    const imagePromise = axios.get<ApiAboutInformationImage>(
      `${process.env.WP_URL}/about-images/249?_fields=id,acf`
    )

    const responses = await Promise.all([textPromise, imagePromise])

    return decodeAboutInformation(responses[0].data, responses[1].data)
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
