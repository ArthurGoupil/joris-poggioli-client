import axios from 'axios'
import { AboutPress, ApiAboutPress, decodeAboutPress } from '../entities/press'

export const fetchAboutPress = async (): Promise<AboutPress[]> => {
  try {
    const response = await axios.get<ApiAboutPress[]>(
      `${process.env.WP_URL}/press-articles?per_page=100&_fields=id,acf`
    )

    return decodeAboutPress(response.data)
  } catch (error) {
    console.error('About Press', error)
    return []
  }
}
