import axios from 'axios'
import {
  ApiArchitectureProjectItem,
  ApiDesignTypeItem,
  BaseNavItemsProps,
} from '../entities/nav'

export const fetchNavItems = async (): Promise<BaseNavItemsProps[]> => {
  try {
    const designTypesPromise = axios.get<ApiDesignTypeItem[]>(
      `${process.env.WP_URL}/design-types?_fields=id,acf,title`
    )
    const architectureProjectsPromise = axios.get<ApiArchitectureProjectItem[]>(
      `${process.env.WP_URL}/architecture?_fields=id,acf.name,acf.position`
    )

    const results = await Promise.all([
      designTypesPromise,
      architectureProjectsPromise,
    ])

    return [
      {
        name: 'design',
        subItems: results[0].data
          .filter((type) => type.acf.show_in_menu)
          .map((project) => project.title.rendered.toUpperCase()),
      },
      {
        name: 'architecture',
        subItems: [
          'ALL',
          ...results[1].data.map((project) => project.acf.name.toUpperCase()),
        ],
      },
      {
        name: 'about',
        subItems: [
          'joris poggioli',
          'contact',
          'press',
          'privacy & cookie policy',
        ],
      },
    ]
  } catch (error) {
    console.error('Navitem', error)
    return []
  }
}
