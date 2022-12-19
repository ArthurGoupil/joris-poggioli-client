type ApiAboutTextAcf = {
  title: string
  text_content: string
}

export type ApiAboutText = {
  id: number
  acf: ApiAboutTextAcf
}

type AboutPrivacyCookiePolicyLabels =
  | 'editorResponsiblePublication'
  | 'publicationDirector'
  | 'development'
  | 'hosting'
  | 'intellectualProperty'
  | 'dataProtection'
  | 'accessRights'
  | 'links'
  | 'contacts'
  | 'confidentialityPolitic'
  | 'CGV'

type AboutPrivacyCookiePolicyItem = { title: string; text: string }

export type AboutPrivacyCookiePolicy = Record<
  AboutPrivacyCookiePolicyLabels,
  AboutPrivacyCookiePolicyItem
>

const aboutPrivacyCookiePolicyMapping: Record<
  number,
  AboutPrivacyCookiePolicyLabels
> = {
  262: 'editorResponsiblePublication',
  263: 'publicationDirector',
  264: 'development',
  265: 'hosting',
  266: 'intellectualProperty',
  267: 'dataProtection',
  268: 'accessRights',
  269: 'links',
  270: 'contacts',
  271: 'confidentialityPolitic',
  296: 'CGV',
}

export const decodeAboutPrivacyCookiePolicy = (
  apiAboutPrivacyCookiePolicy: ApiAboutText[]
): AboutPrivacyCookiePolicy => {
  const aboutPrivacyCookiePolicyItems: AboutPrivacyCookiePolicy = {
    editorResponsiblePublication: { title: '', text: '' },
    publicationDirector: { title: '', text: '' },
    development: { title: '', text: '' },
    hosting: { title: '', text: '' },
    intellectualProperty: { title: '', text: '' },
    dataProtection: { title: '', text: '' },
    accessRights: { title: '', text: '' },
    links: { title: '', text: '' },
    contacts: { title: '', text: '' },
    confidentialityPolitic: { title: '', text: '' },
    CGV: { title: '', text: '' },
  }

  apiAboutPrivacyCookiePolicy.forEach((item) => {
    const aboutPrivacyCookiePolicyName =
      aboutPrivacyCookiePolicyMapping[item.id]

    if (aboutPrivacyCookiePolicyName) {
      aboutPrivacyCookiePolicyItems[aboutPrivacyCookiePolicyName] = {
        title: item.acf.title,
        text: item.acf.text_content,
      }
    }
  })

  return aboutPrivacyCookiePolicyItems
}
