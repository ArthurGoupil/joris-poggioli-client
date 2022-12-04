import axios, { AxiosError } from 'axios'
import {
  ApiArchitectureProject,
  ArchitectureProject,
  decodeArchitectureProjects,
} from '../entities/architecture'

type FetchArchitectureProjects = {
  architectureProjects: ArchitectureProject[]
  error?: AxiosError
}

export const fetchArchitectureProjects =
  async (): Promise<FetchArchitectureProjects> => {
    try {
      const response = await axios.get<ApiArchitectureProject[]>(
        'https://jorispoggioli.com/admin/wp-json/wp/v2/architecture?_fields=id,acf'
      )

      return {
        architectureProjects: decodeArchitectureProjects(response.data),
      }
    } catch (error) {
      return {
        architectureProjects: [],
        error: error as AxiosError,
      }
    }
  }
