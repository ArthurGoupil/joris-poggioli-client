import axios from 'axios'
import {
  ApiArchitectureProject,
  ArchitectureProject,
  decodeArchitectureProjects,
} from '../entities/architecture'

export const fetchArchitectureProjects = async (): Promise<
  ArchitectureProject[]
> => {
  try {
    const response = await axios.get<ApiArchitectureProject[]>(
      'https://jorispoggioli.com/admin/wp-json/wp/v2/architecture?_fields=id,acf'
    )

    return decodeArchitectureProjects(response.data)
  } catch (error) {
    console.log('Archi', error)

    return []
  }
}
