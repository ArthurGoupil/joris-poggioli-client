type ApiDesignTypeAcf = {
  name: string
  position_in_menu: string
  show_in_menu: boolean
}

export type ApiDesignType = {
  id: number
  acf: ApiDesignTypeAcf
}

export type DesignType = {
  id: number
  name: string
  positionInMenu: number
  showInMenu: boolean
}

export const decodeDesignType = (
  apiDesignTypes: ApiDesignType[]
): DesignType[] =>
  apiDesignTypes.map((apiItem) => ({
    id: apiItem.id,
    name: apiItem.acf.name,
    positionInMenu: Number(apiItem.acf.position_in_menu),
    showInMenu: apiItem.acf.show_in_menu,
  }))
