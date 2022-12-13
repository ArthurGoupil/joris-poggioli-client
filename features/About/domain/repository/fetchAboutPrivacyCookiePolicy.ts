import axios from 'axios'
import {
  AboutPrivacyCookiePolicy,
  ApiAboutText,
  decodeAboutPrivacyCookiePolicy,
} from '../entities/privacy-cookie-policy'

export const fetchAboutPrivacyCookiePolicy =
  async (): Promise<AboutPrivacyCookiePolicy> => {
    try {
      const response = await axios.get<ApiAboutText[]>(
        `${process.env.WP_URL}/about-texts?_fields=id,acf`
      )

      return decodeAboutPrivacyCookiePolicy(response.data)
    } catch (error) {
      console.error('About Privacy cookie policy', error)
      return {
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
    }
  }
