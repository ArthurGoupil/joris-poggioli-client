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
      `${process.env.WP_URL}/architecture?_fields=id,acf`
    )

    return decodeArchitectureProjects(response.data)
  } catch (error) {
    console.error('Archi', error)
    return []
  }
}
