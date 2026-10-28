import { AddButton, BulletList, RemoveButton, Text, getIn, useResume } from './Editable.jsx'
import photo from '../assets/photo.jpg'
import { linkedinUrl } from '../lib/format.js'

const NEW_PROJECT = {
  name: 'Project — Short description',
  period: 'Mon YYYY – Mon YYYY',
  technologies: 'React JS',
  bullets: ['What you built and the impact it had.'],
}

function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function LabelList({ path }) {
  const { data } = useResume()
  return (
    <>
      <ul className="dots">
        {getIn(data, path).map((_, i) => (
          <li key={i}>
            <b><Text path={[...path, i, 'label']} />:</b> <Text path={[...path, i, 'value']} />
            <RemoveButton path={path} index={i} />
          </li>
        ))}
      </ul>
      <AddButton path={path} item={{ label: 'Label', value: 'Value' }} />
    </>
  )
}

function Project({ index }) {
  const base = ['projects', index]
  return (
    <article className="project">
      <div className="row">
        <Text path={[...base, 'name']} as="h3" />
        <Text path={[...base, 'period']} className="when" />
        <RemoveButton path={['projects']} index={index} label="Remove project" />
      </div>
      <p className="tech">
        <b>Technologies:</b> <Text path={[...base, 'technologies']} as="i" />
      </p>
      <BulletList path={[...base, 'bullets']} className="dots" />
    </article>
  )
}

export default function Resume() {
  const { data } = useResume()

  return (
    <main className="page">
      <header className="head">
        <div className="head-text">
          <Text path={['name']} as="h1" />
          <Text path={['title']} as="p" className="subtitle" />
          <p className="contact">
            <Text path={['location']} />
            <span className="sep">|</span>
            <Text path={['phone']} />
            <span className="sep">|</span>
            <a href={`mailto:${data.email}`}><Text path={['email']} /></a>
          </p>
          <p className="contact">
            <a className="linkedin" href={linkedinUrl(data.linkedin)} target="_blank" rel="noopener noreferrer"><Text path={['linkedin']} /></a>
          </p>
        </div>
        <img className="photo" src={photo} alt={`Photo of ${data.name}`} width="480" height="648" />
      </header>

      <Section title="Professional Summary">
        <BulletList path={['summary']} className="dots" />
      </Section>

      <Section title="Core Skills">
        <LabelList path={['skills']} />
      </Section>

      <Section title="Certifications & Highlights">
        <BulletList path={['highlights']} className="dots" />
      </Section>

      <Section title="Professional Experience">
        <div className="jobs">
          {data.employment.map((_, i) => (
            <div className="row" key={i}>
              <h3><Text path={['employment', i, 'company']} /> — <Text path={['employment', i, 'role']} /></h3>
              <Text path={['employment', i, 'period']} className="when" />
              <RemoveButton path={['employment']} index={i} label="Remove job" />
            </div>
          ))}
        </div>
        <AddButton path={['employment']} item={{ company: 'Company, City', role: 'Job title', period: 'Mon YYYY – Present' }}>
          + Add job
        </AddButton>
      </Section>

      <Section title="Key Projects">
        {data.projects.map((_, i) => <Project key={i} index={i} />)}
        <AddButton path={['projects']} item={NEW_PROJECT}>+ Add project</AddButton>
      </Section>

      <Section title="Additional Information">
        <LabelList path={['additional']} />
      </Section>
    </main>
  )
}
