import { useEffect, useMemo, useState } from 'react'
import defaultResume from './data/resume.js'
import Resume from './components/Resume.jsx'
import Toolbar from './components/Toolbar.jsx'
import Site from './site/Site.jsx'
import { ResumeContext, getIn, setIn } from './components/Editable.jsx'

// Bump the version whenever the shape of resume.js changes, so stale drafts are ignored
const DRAFT_KEY = 'resume-draft-v2'

// ?edit opens the paper-resume editor. Everyone else sees the website,
// which prints as the paper resume when they click Download PDF.
const editing = new URLSearchParams(window.location.search).has('edit')

function loadDraft() {
  if (!editing) return defaultResume
  try {
    const saved = localStorage.getItem(DRAFT_KEY)
    return saved ? JSON.parse(saved) : defaultResume
  } catch {
    return defaultResume
  }
}

export default function App() {
  const [data, setData] = useState(loadDraft)

  useEffect(() => {
    document.body.classList.toggle('is-site', !editing)
  }, [])

  useEffect(() => {
    if (!editing) return
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
    } catch {
      // Storage unavailable (private window) — edits still work for this session
    }
  }, [data])

  const ctx = useMemo(
    () => ({
      data,
      editing,
      update: (path, value) => setData((d) => setIn(d, path, value)),
      addItem: (path, item) => setData((d) => setIn(d, path, [...getIn(d, path), structuredClone(item)])),
      removeItem: (path, index) => setData((d) => setIn(d, path, getIn(d, path).filter((_, i) => i !== index))),
    }),
    [data],
  )

  const reset = () => {
    if (!window.confirm('Discard your edits and go back to the published resume?')) return
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {
      // ignore
    }
    setData(defaultResume)
  }

  return (
    <ResumeContext.Provider value={ctx}>
      {editing ? (
        <div className="editor">
          <Toolbar onReset={reset} />
          <Resume />
        </div>
      ) : (
        <>
          <Site data={data} />
          <div className="print-only">
            <Resume />
          </div>
        </>
      )}
    </ResumeContext.Provider>
  )
}
