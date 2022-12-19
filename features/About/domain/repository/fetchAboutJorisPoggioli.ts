import axios from 'axios'
import {
  AboutJorisPoggioli,
  ApiAboutJorisPoggioliImage,
  ApiAboutJorisPoggioliText,
  decodeAboutJorisPoggioli,
} from '../entities/joris-poggioli'

export const fetchAboutJorisPoggioli =
  async (): Promise<AboutJorisPoggioli> => {
    try {
      const textPromise = axios.get<ApiAboutJorisPoggioliText>(
        `${process.env.WP_URL}/about-texts/246?per_page=100&_fields=id,acf`
      )
      const imagePromise = axios.get<ApiAboutJorisPoggioliImage>(
        `${process.env.WP_URL}/about-images/249?per_page=100&_fields=id,acf`
      )

      const responses = await Promise.all([textPromise, imagePromise])

      return decodeAboutJorisPoggioli(responses[0].data, responses[1].data)
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
