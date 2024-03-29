export const savePageStyles = (): void => {
  const head = document.head

  // Get all the styles of the page
  const allStyleElems: NodeListOf<HTMLLinkElement> = head.querySelectorAll(
    'link[rel="stylesheet"]'
  )
  // Get all the inline styles of the page, labelled by "data-n-href" ( defined by nextjs )
  const allInlineStylesElems = head.querySelectorAll('style[data-n-href]')

  // Create doubling links to css sheets that wont be removed unless we say so
  if (allStyleElems) {
    for (let i = 0; i < allStyleElems.length; i++) {
      if (allStyleElems[i].href) {
        const styles = document.createElement('link')
        styles.setAttribute('data-pt-fix', 'true')
        styles.setAttribute('rel', 'stylesheet')
        styles.setAttribute('href', allStyleElems[i].href)

        head.appendChild(styles)
      }
    }
  }

  // Now do the same with the inline styles
  const inlineStyles = document.createElement('style')
  inlineStyles.setAttribute('data-pt-fix', 'true')
  if (allInlineStylesElems) {
    for (let i = 0; i < allInlineStylesElems.length; i++) {
      inlineStyles.innerHTML += allInlineStylesElems[i].innerHTML
    }

    head.appendChild(inlineStyles)
  }
}
