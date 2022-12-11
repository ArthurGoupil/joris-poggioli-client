import axios from 'axios'
import {
  AboutContact,
  ApiAboutContact,
  decodeAboutContact,
} from '../entities/contact'

export const fetchAboutContact = async (): Promise<AboutContact> => {
  try {
    const response = await axios.get<ApiAboutContact>(
      `${process.env.WP_URL}/about-texts/251?_fields=id,acf`
    )

    return decodeAboutContact(response.data)
  } catch (error) {
    console.error('About Contact', error)
    return {
      id: 0,
      textContent: 'Erreur lors du chargement des données.',
    }
  }
}
