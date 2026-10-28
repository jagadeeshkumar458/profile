export function linkedinUrl(value) {
  return value.startsWith('http') ? value : `https://www.${value.replace(/^www\./, '')}`
}

// "Feb 2019 – Jan 2025" -> { start: 'Feb 2019', end: 'Jan 2025', current: false }
export function splitPeriod(period = '') {
  const [start = '', end = ''] = period.split(/\s*[–-]\s*/)
  return { start, end, current: /present/i.test(end) }
}

// "ESP — Conversational AI Assistant" -> { title: 'ESP', subtitle: 'Conversational AI Assistant' }
export function splitTitle(name = '') {
  const [title, ...rest] = name.split(/\s+—\s+/)
  return { title, subtitle: rest.join(' — ') }
}

export function yearsSince(monthYear) {
  const start = new Date(`1 ${monthYear}`)
  if (Number.isNaN(start.getTime())) return null
  return Math.floor((Date.now() - start.getTime()) / (365.25 * 24 * 3600 * 1000))
}

export function downloadPdf(name) {
  // The browser uses the page title as the PDF file name
  const title = document.title
  document.title = `${name.replace(/\s+/g, '_')}_Resume`
  window.addEventListener('afterprint', () => (document.title = title), { once: true })
  window.print()
}
