import axios from 'axios'
import {
  ApiDesignItem,
  decodeDesignItems,
  DesignItem,
} from '../entities/design'

export const fetchDesignItems = async (): Promise<DesignItem[]> => {
  try {
    const response = await axios.get<ApiDesignItem[]>(
      `${process.env.WP_URL}/design?_fields=id,acf`
    )

    return decodeDesignItems(response.data)
  } catch (error) {
    console.error('Design', error)
    return []
  }
}
