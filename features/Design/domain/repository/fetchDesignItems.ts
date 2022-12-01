import axios, { AxiosError } from 'axios'
import {
  ApiDesignItem,
  decodeDesignItems,
  DesignItem,
} from '../entities/design'

type FetchItems = {
  designItems: DesignItem[]
  error?: AxiosError
}

export const fetchDesignItems = async (): Promise<FetchItems> => {
  try {
    const response = await axios.get<ApiDesignItem[]>(
      'https://jorispoggioli.com/admin/wp-json/wp/v2/design?_fields=id,acf'
    )

    return {
      designItems: await decodeDesignItems(response.data),
    }
  } catch (error) {
    return {
      designItems: [],
      error: error as AxiosError,
    }
  }
}
