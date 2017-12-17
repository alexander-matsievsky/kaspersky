import { Observable, Subject } from 'rxjs'
import { employees } from './employees'

function tokenize (string) {
  return (string || '').toLowerCase().match(/[^\W_]+/g) || []
}

const forwardIndex = employees.changes.scan((forwardIndex, changes) => {
  for (const {newVal, oldVal} of changes) {
    if (newVal === null) {
      forwardIndex.delete(oldVal.id)
    } else {
      forwardIndex.set(newVal.id, new Set([
        ...tokenize(newVal.email),
        ...tokenize(newVal.group),
        ...tokenize(newVal.name),
        ...tokenize(newVal.occupation),
        ...tokenize(newVal.phone),
        ...tokenize(newVal.username)
      ]))
    }
  }
  return forwardIndex
}, new Map())
const invertedIndex = forwardIndex.map(forwardIndex => {
  const invertedIndex = new Map()
  for (const [id, terms] of forwardIndex.entries()) {
    for (const term of terms) {
      if (!invertedIndex.has(term)) {
        invertedIndex.set(term, new Set([id]))
      } else {
        const ids = invertedIndex.get(term)
        ids.add(id)
        invertedIndex.set(term, ids)
      }
    }
  }
  return invertedIndex
})
const subject = new Subject()

export const search = {
  val: Observable.combineLatest(invertedIndex, subject.debounceTime(250))
    .map(([invertedIndex, subject]) => {
      if (!subject) return null
      const ids = new Set()
      for (const term of tokenize(subject)) {
        for (const id of invertedIndex.get(term) || []) {
          ids.add(id)
        }
      }
      return ids
    })
    .startWith(null),
  push (term) {
    subject.next(term)
  }
}
