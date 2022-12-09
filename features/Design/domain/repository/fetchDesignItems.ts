import axios from 'axios'
import {
  ApiDesignItem,
  decodeDesignItems,
  DesignItem,
} from '../entities/design'

type FetchDesignItems = {
  designItems: DesignItem[]
  error?: boolean
}

export const fetchDesignItems = async (): Promise<FetchDesignItems> => {
  try {
    const response = await axios.get<ApiDesignItem[]>(
      'https://jorispoggioli.com/admin/wp-json/wp/v2/design?_fields=id,acf'
    )

    return {
      designItems: decodeDesignItems(response.data),
    }
  } catch (error) {
    console.log('Design', error)

    return {
      designItems: [],
      error: true,
    }
  }
}
