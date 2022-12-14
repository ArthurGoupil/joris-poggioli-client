import { Grid } from '../../../../components/layout/Grid/Grid'
import { AboutPrivacyCookiePolicy as AboutPrivacyCookiePolicyType } from '../../domain/entities/privacy-cookie-policy'
import { styles } from './aboutPrivacyCookiePolicy.css'
import parse from 'html-react-parser'
import Link from 'next/link'

export const AboutPrivacyCookiePolicy = ({
  editorResponsiblePublicationText,
  publicationDirectorText,
  developmentText,
  hostingText,
  intellectualPropertyText,
  dataProtectionText,
  accessRightsText,
  linksText,
  contactsText,
  confidentialityPoliticText,
}: AboutPrivacyCookiePolicyType): JSX.Element => (
  <>
    <Grid
      gridTemplateColumns={{ mobile: '1fr', desktop: 'repeat(3, 1fr)' }}
      gridAutoRows={{ mobile: 'auto', desktop: 'auto' }}
      gridItems={[
        {
          key: 'blank',
          gridColumn: { mobile: 'auto', desktop: '1 / 2' },
          isHidden: { mobile: true, desktop: false },
          component: <div className={styles.blankContainer} />,
        },
        {
          key: 'text',
          gridColumn: { mobile: '1', desktop: '2 / 4' },
          component: (
            <div className={styles.middleContainer}>
              <div className={styles.titleContainer}>
                <h2>PRIVACY & COOKIE POLICY</h2>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>
                  éditeur et responsable de publication
                </div>
                <div className={styles.text}>
                  {parse(editorResponsiblePublicationText)}
                </div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>
                  directeur de publication
                </div>
                <div className={styles.text}>
                  {parse(publicationDirectorText)}
                </div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>développement</div>
                <div className={styles.text}>{parse(developmentText)}</div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>hébergement</div>
                <div className={styles.text}>{parse(hostingText)}</div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>
                  propriété intellectuelle
                </div>
                <div className={styles.text}>
                  {parse(intellectualPropertyText)}
                </div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>
                  protection des données
                </div>
                <div className={styles.text}>{parse(dataProtectionText)}</div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>droit d’accès</div>
                <div className={styles.text}>{parse(accessRightsText)}</div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>liens</div>
                <div className={styles.text}>{parse(linksText)}</div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>contacts</div>
                <div className={styles.text}>{parse(contactsText)}</div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.sectionTitle}>
                  politique de confidentialité du site
                </div>
                <div className={styles.text}>
                  {parse(confidentialityPoliticText)}
                </div>
              </div>
              <Link href="" className={styles.cgv}>
                CGV
              </Link>
            </div>
          ),
        },
      ]}
    />
  </>
)
