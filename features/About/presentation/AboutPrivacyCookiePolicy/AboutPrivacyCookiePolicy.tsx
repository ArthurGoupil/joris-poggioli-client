import { Grid } from '../../../../components/layout/Grid/Grid'
import { AboutPrivacyCookiePolicy as AboutPrivacyCookiePolicyType } from '../../domain/entities/privacy-cookie-policy'
import { styles } from './aboutPrivacyCookiePolicy.css'
import parse from 'html-react-parser'
import Link from 'next/link'

export const AboutPrivacyCookiePolicy = ({
  editorResponsiblePublication,
  publicationDirector,
  development,
  graphicDesign,
  hosting,
  intellectualProperty,
  dataProtection,
  accessRights,
  links,
  contacts,
  confidentialityPolitic,
  CGV,
}: AboutPrivacyCookiePolicyType): JSX.Element => {
  const CGVHref = CGV.text.includes('<p>')
    ? CGV.text.slice(CGV.text.indexOf('http'), CGV.text.indexOf('</p>'))
    : CGV.text

  return (
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
                    {editorResponsiblePublication.title}
                  </div>
                  <div className={styles.text}>
                    {parse(editorResponsiblePublication.text)}
                  </div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>
                    {publicationDirector.title}
                  </div>
                  <div className={styles.text}>
                    {parse(publicationDirector.text)}
                  </div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>{development.title}</div>
                  <div className={styles.text}>{parse(development.text)}</div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>
                    {graphicDesign.title}
                  </div>
                  <div className={styles.text}>{parse(graphicDesign.text)}</div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>{hosting.title}</div>
                  <div className={styles.text}>{parse(hosting.text)}</div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>
                    {intellectualProperty.title}
                  </div>
                  <div className={styles.text}>
                    {parse(intellectualProperty.text)}
                  </div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>
                    {dataProtection.title}
                  </div>
                  <div className={styles.text}>
                    {parse(dataProtection.text)}
                  </div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>
                    {accessRights.title}
                  </div>
                  <div className={styles.text}>{parse(accessRights.text)}</div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>{links.title}</div>
                  <div className={styles.text}>{parse(links.text)}</div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>{contacts.title}</div>
                  <div className={styles.text}>{parse(contacts.text)}</div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.sectionTitle}>
                    {confidentialityPolitic.title}
                  </div>
                  <div className={styles.text}>
                    {parse(confidentialityPolitic.text)}
                  </div>
                </div>
                <Link href={CGVHref} target="_blank" className={styles.cgv}>
                  {CGV.title}
                </Link>
              </div>
            ),
          },
        ]}
      />
    </>
  )
}
