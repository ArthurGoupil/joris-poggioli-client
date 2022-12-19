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
        `${process.env.WP_URL}/about-texts?per_page=100&_fields=id,acf`
      )

      return decodeAboutPrivacyCookiePolicy(response.data)
    } catch (error) {
      console.error('About Privacy cookie policy', error)
      return {
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
    }
  }
