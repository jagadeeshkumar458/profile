import { createContext, useContext } from 'react'

export const ResumeContext = createContext(null)
export const useResume = () => useContext(ResumeContext)

export function getIn(obj, path) {
  return path.reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

export function setIn(obj, path, value) {
  if (path.length === 0) return value
  const [key, ...rest] = path
  const copy = Array.isArray(obj) ? [...obj] : { ...obj }
  copy[key] = setIn(obj[key], rest, value)
  return copy
}

// A piece of resume text. Plain text for visitors; click-to-edit in ?edit mode.
export function Text({ path, as: Tag = 'span', className, placeholder = 'Type here' }) {
  const { data, editing, update } = useResume()
  const value = getIn(data, path) ?? ''

  if (!editing) return value ? <Tag className={className}>{value}</Tag> : null

  return (
    <Tag
      // Remount when the value changes from outside (e.g. Reset) so the DOM never goes stale
      key={value}
      className={[className, 'editable'].filter(Boolean).join(' ')}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      data-placeholder={placeholder}
      onBlur={(e) => {
        const next = e.currentTarget.innerText.replace(/\s+/g, ' ').trim()
        if (next !== value) update(path, next)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          e.currentTarget.blur()
        }
      }}
      onPaste={(e) => {
        e.preventDefault()
        document.execCommand('insertText', false, e.clipboardData.getData('text/plain'))
      }}
    >
      {value}
    </Tag>
  )
}

export function RemoveButton({ path, index, label = 'Remove' }) {
  const { editing, removeItem } = useResume()
  if (!editing) return null
  return (
    <button type="button" className="edit-control remove" title={label} aria-label={label} onClick={() => removeItem(path, index)}>
      ×
    </button>
  )
}

export function AddButton({ path, item, children = '+ Add line' }) {
  const { editing, addItem } = useResume()
  if (!editing) return null
  return (
    <button type="button" className="edit-control add" onClick={() => addItem(path, item)}>
      {children}
    </button>
  )
}

// A bullet list of strings with add/remove controls in edit mode.
export function BulletList({ path, className }) {
  const { data } = useResume()
  const items = getIn(data, path) ?? []
  return (
    <>
      <ul className={className}>
        {items.map((_, i) => (
          <li key={i}>
            <Text path={[...path, i]} />
            <RemoveButton path={path} index={i} label="Remove line" />
          </li>
        ))}
      </ul>
      <AddButton path={path} item="New line" />
    </>
  )
}
