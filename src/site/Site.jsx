import { useEffect, useMemo, useRef, useState } from 'react'
import photo from '../assets/photo.jpg'
import { downloadPdf, linkedinUrl, splitPeriod, splitTitle, yearsSince } from '../lib/format.js'

const NAV = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['certifications', 'Certifications'],
  ['contact', 'Contact'],
]

const toDate = (monthYear) => new Date(`1 ${monthYear}`)

// Put each project under the job it started during, so data only needs dates.
function groupByEmployer(employment, projects) {
  const jobs = employment.map((job) => ({ ...job, projects: [] }))
  const byStart = [...jobs].sort((a, b) => toDate(splitPeriod(b.period).start) - toDate(splitPeriod(a.period).start))
  const other = { company: 'Other projects', role: '', period: '', projects: [] }
  projects.forEach((p) => {
    const start = toDate(splitPeriod(p.period).start)
    const job = byStart.find((j) => toDate(splitPeriod(j.period).start) <= start)
    ;(job ?? other).projects.push(p)
  })
  return other.projects.length ? [...jobs, other] : jobs
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme')
    } catch {
      return null
    }
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme) root.dataset.theme = theme
    else delete root.dataset.theme
    try {
      if (theme) localStorage.setItem('theme', theme)
    } catch {
      // ignore
    }
  }, [theme])
  const isDark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  return [isDark, () => setTheme(isDark ? 'light' : 'dark')]
}

function CopyButton({ text, label }) {
  const [state, setState] = useState('Copy')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('Copied')
    } catch {
      setState('Copy failed')
    }
    setTimeout(() => setState('Copy'), 1600)
  }
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`Copy ${label}`}>
      {state}
    </button>
  )
}

function Nav({ data }) {
  const [isDark, toggleTheme] = useTheme()
  const initials = data.name.split(' ').filter((w) => w.length > 1).map((w) => w[0]).join('')
  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        <a href="#top" className="logo" aria-label="Back to top">{initials}</a>
        <div className="nav-links">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </div>
        <div className="nav-actions">
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>
            {isDark ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
            )}
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => downloadPdf(data.name)}>Download PDF</button>
        </div>
      </div>
    </nav>
  )
}

function Hero({ data }) {
  const current = data.employment.find((j) => splitPeriod(j.period).current) ?? data.employment[0]
  const now = splitTitle(data.projects[0]?.name)
  const [role, focus] = data.title.split(/\s*\|\s*/)
  return (
    <header className="hero" id="top">
      <div className="hero-text">
        <p className="eyebrow">
          <span className="live-dot" aria-hidden="true" />
          {current.role} at {current.company.split(',')[0]}
        </p>
        <h1>{data.name}</h1>
        <p className="hero-role">
          {role}
          {focus && <span className="hero-focus">{focus}</span>}
        </p>
        <p className="lede">{data.summary[0]}</p>
        <div className="cta">
          <a className="btn btn-primary" href={`mailto:${data.email}`}>Email me</a>
          <a className="btn btn-ghost" href={linkedinUrl(data.linkedin)} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <button type="button" className="btn btn-ghost" onClick={() => downloadPdf(data.name)}>Download PDF</button>
        </div>
        <p className="hero-meta">
          <span>{data.location}</span>
          <span>{data.phone}</span>
        </p>
      </div>
      <figure className="portrait">
        <img src={photo} alt={`Portrait of ${data.name}`} width="480" height="648" />
        {now.title && (
          <figcaption className="now-card">
            <span className="now-label">Now building</span>
            <strong>{now.title}</strong>
            <span>{now.subtitle}</span>
          </figcaption>
        )}
      </figure>
    </header>
  )
}

function Stats({ data }) {
  const firstStart = data.employment.map((j) => splitPeriod(j.period).start).sort((a, b) => toDate(a) - toDate(b))[0]
  const years = yearsSince(firstStart)
  const certs = new Set(data.highlights.join(' ').match(/\b[A-Z]{2}-\d{3}\b/g) ?? []).size
  const stats = [
    years && { value: `${years}+`, label: 'years building React apps' },
    { value: data.projects.length, label: 'key projects shipped' },
    { value: data.employment.length, label: 'companies' },
    certs > 0 && { value: certs, label: 'Microsoft certifications' },
  ].filter(Boolean)
  return (
    <section className="stats" aria-label="At a glance">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </section>
  )
}

function SectionHead({ id, eyebrow, title }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`}>{title}</h2>
    </div>
  )
}

function buildAnswers(data) {
  const all = data.projects.flatMap((p) => p.bullets)
  const find = (list, word) => list.find((s) => s.toLowerCase().includes(word))
  const skill = (word) => data.skills.find((s) => s.label.toLowerCase().includes(word))?.value
  const latest = data.projects[0]
  return [
    latest && {
      q: 'What are you building right now?',
      a: `${latest.name} (${latest.period}). ${latest.bullets[0]} Stack: ${latest.technologies}.`,
    },
    {
      q: "What's your core stack?",
      a: [
        skill('frontend') && `Frontend: ${skill('frontend')}.`,
        skill('backend') && `Backend: ${skill('backend')}.`,
        skill('database') && `Databases: ${skill('database')}.`,
      ].filter(Boolean).join(' '),
    },
    {
      q: 'Have you led a team?',
      a: [find(data.summary, 'lead'), find(all, 'two-member')].filter(Boolean).join(' '),
    },
    {
      q: 'Where have you worked?',
      a: data.employment.map((j) => `${j.role} at ${j.company}, ${j.period}.`).join(' '),
    },
  ].filter((x) => x && x.a)
}

// A scripted chat that streams answers word by word, the way the ESP assistant renders SSE chunks.
function AskResume({ data }) {
  const answers = useMemo(() => buildAnswers(data), [data])
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(answers[0]?.a ?? '')
  const [streaming, setStreaming] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearInterval(timer.current), [])

  const ask = (i) => {
    clearInterval(timer.current)
    setActive(i)
    const full = answers[i].a
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(full)
      return
    }
    const chunks = full.split(/(\s+)/)
    let n = 0
    setShown('')
    setStreaming(true)
    timer.current = setInterval(() => {
      n += 2
      setShown(chunks.slice(0, n).join(''))
      if (n >= chunks.length) {
        clearInterval(timer.current)
        setStreaming(false)
      }
    }, 40)
  }

  if (!answers.length) return null
  return (
    <div className="chat" role="region" aria-labelledby="ask-title">
      <div className="chat-bar">
        <span className="chat-dot" aria-hidden="true" />
        <span id="ask-title">Ask my resume</span>
        <span className="chat-note">scripted demo · streamed like SSE</span>
      </div>
      <div className="chat-body" aria-live="polite">
        <p className="bubble bubble-q">{answers[active].q}</p>
        <p className="bubble bubble-a">
          {shown}
          {streaming && <span className="caret" aria-hidden="true" />}
        </p>
      </div>
      <div className="chat-options">
        {answers.map((item, i) => (
          <button key={item.q} type="button" className={`chip-btn${i === active ? ' is-active' : ''}`} onClick={() => ask(i)} aria-pressed={i === active}>
            {item.q}
          </button>
        ))}
      </div>
    </div>
  )
}

function About({ data }) {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <SectionHead id="about" eyebrow="About" title="Front-end engineer who ships and leads" />
      <div className="about-grid">
        <ul className="about-list">
          {data.summary.slice(1).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <AskResume data={data} />
      </div>
    </section>
  )
}

function Skills({ data }) {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <SectionHead id="skills" eyebrow="Skills" title="Tools I work with every day" />
      <div className="skill-grid">
        {data.skills.map((group) => (
          <div className="skill-group" key={group.label}>
            <h3>{group.label}</h3>
            <ul className="tags">
              {group.value.split(/,\s*/).filter(Boolean).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const { title, subtitle } = splitTitle(project.name)
  const { current } = splitPeriod(project.period)
  return (
    <article className="project-card">
      <div className="project-top">
        <div>
          <h4>{title}</h4>
          {subtitle && <p className="project-sub">{subtitle}</p>}
        </div>
        <span className={`period${current ? ' is-current' : ''}`}>{project.period}</span>
      </div>
      <ul className="project-points">
        {project.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <ul className="tags tags-sm" aria-label="Technologies">
        {project.technologies.split(/,\s*/).filter(Boolean).map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </article>
  )
}

function Experience({ data }) {
  const groups = groupByEmployer(data.employment, data.projects)
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <SectionHead id="experience" eyebrow="Experience" title="Where I've worked and what I built" />
      <ol className="timeline">
        {groups.map((job) => {
          const { current } = splitPeriod(job.period)
          return (
            <li className={`job${current ? ' is-current' : ''}`} key={job.company}>
              <div className="job-head">
                <div>
                  <h3>{job.company}</h3>
                  {job.role && <p className="job-role">{job.role}</p>}
                </div>
                {job.period && <span className={`period${current ? ' is-current' : ''}`}>{job.period}</span>}
              </div>
              <div className="projects">
                {job.projects.map((p) => (
                  <ProjectCard key={p.name} project={p} />
                ))}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Certifications({ data }) {
  return (
    <section className="section" id="certifications" aria-labelledby="certifications-title">
      <SectionHead id="certifications" eyebrow="Certifications" title="Certifications & highlights" />
      <ul className="cert-grid">
        {data.highlights.map((h) => (
          <li className="cert" key={h}>{h}</li>
        ))}
      </ul>
      {data.additional?.length > 0 && (
        <p className="additional">
          {data.additional.map((a) => (
            <span key={a.label}><b>{a.label}:</b> {a.value}</span>
          ))}
        </p>
      )}
    </section>
  )
}

function Contact({ data }) {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-card">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let’s talk about your team</h2>
          <p className="contact-lede">I'm open to Senior React / front-end roles. The quickest way to reach me is email or LinkedIn.</p>
        </div>
        <dl className="contact-list">
          <div>
            <dt>Email</dt>
            <dd><a href={`mailto:${data.email}`}>{data.email}</a><CopyButton text={data.email} label="email" /></dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd><a href={`tel:${data.phone.replace(/\s+/g, '')}`}>{data.phone}</a><CopyButton text={data.phone} label="phone number" /></dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd><a href={linkedinUrl(data.linkedin)} target="_blank" rel="noopener noreferrer">{data.linkedin} ↗</a></dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{data.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default function Site({ data }) {
  return (
    <div className="site">
      <a className="skip-link" href="#about">Skip to content</a>
      <Nav data={data} />
      <main className="container">
        <Hero data={data} />
        <Stats data={data} />
        <About data={data} />
        <Skills data={data} />
        <Experience data={data} />
        <Certifications data={data} />
        <Contact data={data} />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {data.name}</span>
        <span>Built with React &amp; Vite</span>
      </footer>
    </div>
  )
}
