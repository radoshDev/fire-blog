import { sanitizeUrl } from '@braintree/sanitize-url'

export const getSanitizedHtml = (html: string): string => {
  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(html, 'text/html')

  /* Sanitize Links */
  const linksElements = htmlDoc.getElementsByTagName('a')
  for (const linkEl of linksElements) {
    linkEl.href = sanitizeUrl(linkEl.href)
  }
  /* Sanitize Script */
  const scriptElements = htmlDoc.getElementsByTagName('script')
  for (const scriptEl of scriptElements) {
    scriptEl.remove()
  }

  return htmlDoc.documentElement.innerHTML
}
