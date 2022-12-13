type ApiAboutTextAcf = {
  text_content: string
}

export type ApiAboutText = {
  id: number
  acf: ApiAboutTextAcf
}

export type AboutPrivacyCookiePolicy = {
  editorResponsiblePublicationText: string
  publicationDirectorText: string
  developmentText: string
  hostingText: string
  intellectualPropertyText: string
  dataProtectionText: string
  accessRightsText: string
  linksText: string
  contactsText: string
  confidentialityPoliticText: string
}

const aboutPrivacyCookiePolicyMapping: Record<
  number,
  keyof AboutPrivacyCookiePolicy
> = {
  262: 'editorResponsiblePublicationText',
  263: 'publicationDirectorText',
  264: 'developmentText',
  265: 'hostingText',
  266: 'intellectualPropertyText',
  267: 'dataProtectionText',
  268: 'accessRightsText',
  269: 'linksText',
  270: 'contactsText',
  271: 'confidentialityPoliticText',
}

export const decodeAboutPrivacyCookiePolicy = (
  apiAboutPrivacyCookiePolicy: ApiAboutText[]
): AboutPrivacyCookiePolicy => {
  const aboutPrivacyCookiePolicyTexts: AboutPrivacyCookiePolicy = {
    editorResponsiblePublicationText: '',
    publicationDirectorText: '',
    developmentText: '',
    hostingText: '',
    intellectualPropertyText: '',
    dataProtectionText: '',
    accessRightsText: '',
    linksText: '',
    contactsText: '',
    confidentialityPoliticText: '',
  }

  apiAboutPrivacyCookiePolicy.forEach((text) => {
    const aboutPrivacyCookiePolicyName =
      aboutPrivacyCookiePolicyMapping[text.id]

    if (aboutPrivacyCookiePolicyName) {
      aboutPrivacyCookiePolicyTexts[aboutPrivacyCookiePolicyName] =
        text.acf.text_content
    }
  })

  return aboutPrivacyCookiePolicyTexts
}
