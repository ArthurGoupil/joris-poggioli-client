import axios from 'axios'
import {
  ApiArchitectureProject,
  ArchitectureProjectAll,
  decodeArchitectureProjects,
} from '../entities/architecture'

export const fetchArchitectureProjects = async (): Promise<
  ArchitectureProjectAll[]
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
