import axios from 'axios'
import {
  ApiDesignItem,
  decodeDesignItems,
  DesignItem,
} from '../entities/design'

export const fetchDesignItems = async (): Promise<DesignItem[]> => {
  try {
    const response = await axios.get<ApiDesignItem[]>(
      'https://jorispoggioli.com/admin/wp-json/wp/v2/design?_fields=id,acf'
    )

    return decodeDesignItems(response.data)
  } catch (error) {
    console.log('Design', error)

    return []
  }
}
