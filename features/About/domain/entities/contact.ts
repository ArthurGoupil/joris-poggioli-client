type ApiAboutContactAcf = {
  text_content: string
}

export type ApiAboutContact = {
  id: number
  acf: ApiAboutContactAcf
}

export type AboutContact = {
  id: number
  textContent: string
}

export const decodeAboutContact = (
  apiAboutContact: ApiAboutContact
): AboutContact => ({
  id: apiAboutContact.id,
  textContent: apiAboutContact.acf.text_content,
})
