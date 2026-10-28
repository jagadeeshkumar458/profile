import { useState } from 'react'
import { useResume } from './Editable.jsx'
import { downloadPdf } from '../lib/format.js'

// Shown only in ?edit mode, above the paper resume.
export default function Toolbar({ onReset }) {
  const { data } = useResume()
  const [copied, setCopied] = useState(false)

  const copyData = async () => {
    const source = `// All resume content lives here. Edit this file (or use the site's ?edit mode\n// and "Copy data") and redeploy — the layout updates automatically.\nconst resume = ${JSON.stringify(data, null, 2)}\n\nexport default resume\n`
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this and paste it into src/data/resume.js:', source)
    }
  }

  return (
    <div className="toolbar">
      <span className="hint">
        <strong>Edit mode.</strong> Click any line to change it. Edits are saved in this browser only. Use Copy data and paste it into{' '}
        <code>src/data/resume.js</code> to publish them.
      </span>
      <button type="button" onClick={onReset}>Reset</button>
      <button type="button" onClick={copyData}>{copied ? 'Copied' : 'Copy data'}</button>
      <a className="button" href={window.location.pathname}>View website</a>
      <button type="button" className="primary" onClick={() => downloadPdf(data.name)}>Download PDF</button>
    </div>
  )
}
