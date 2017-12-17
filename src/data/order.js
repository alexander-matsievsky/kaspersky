import { employees } from './employees'

function ascending (employees, prop) {
  return employees.sort((a, b) => a[prop].localeCompare(b[prop]))
    .reduce((order, employee, i) => {
      order.set(employee.id, i)
      return order
    }, new Map())
}

export const order = employees.val.map(val => {
  const employees = Array.from(val.values())
  return {
    email: ascending(employees, 'email'),
    name: ascending(employees, 'name'),
    occupation: ascending(employees, 'occupation'),
    phone: ascending(employees, 'phone'),
    username: ascending(employees, 'username')
  }
})
