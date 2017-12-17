import { Subject } from 'rxjs'

const subject = new Subject()
const state = subject.scan(([val], records) => {
  const changes = []
  for (const [id, record] of records) {
    if (!val.has(id)) {
      changes.push({new_val: record, old_val: null})
      val.set(id, record)
    } else if (record === null) {
      changes.push({new_val: null, old_val: val.get(id)})
      val.delete(id)
    } else {
      changes.push({new_val: record, old_val: val.get(id)})
      val.set(id, record)
    }
  }
  return [val, changes]
}, [new Map(), []])
export const employees = {
  changes: state.map(([val, changes]) => changes).asObservable(),
  async fetch (url) {
    const records = await (await fetch(url)).json()
    this.push(records.map(record => [record.id, record]))
  },
  val: state.map(([val]) => val).asObservable(),
  push (records) {
    subject.next(records)
  }
}
