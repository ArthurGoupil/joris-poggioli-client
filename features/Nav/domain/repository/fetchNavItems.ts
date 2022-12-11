import axios from 'axios'
import {
  ApiArchitectureProjectItem,
  ApiDesignTypeItem,
  BaseNavItemsProps,
} from '../entities/nav'

export const fetchNavItems = async (): Promise<BaseNavItemsProps[]> => {
  try {
    const designTypesPromise = axios.get<ApiDesignTypeItem[]>(
      'https://jorispoggioli.com/admin/wp-json/wp/v2/design-types?_fields=id,acf,title'
    )
    const architectureProjectsPromise = axios.get<ApiArchitectureProjectItem[]>(
      'https://jorispoggioli.com/admin/wp-json/wp/v2/architecture?_fields=id,acf.name'
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
          .sort(
            (a, b) =>
              Number(a.acf.position_in_menu) - Number(b.acf.position_in_menu)
          )
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
    console.log('Navitem', error)

    return []
  }
}
