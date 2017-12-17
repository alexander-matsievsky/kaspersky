const faker = require('faker')
const jsf = require('json-schema-faker')

jsf.extend('faker', () => faker)
console.log(JSON.stringify(jsf({
  items: {
    properties: {
      avatar: {
        faker: 'internet.avatar',
        type: 'string'
      },
      email: {
        faker: 'internet.email',
        type: 'string'
      },
      group: {
        enum: [
          'CEO',
          'Financials',
          'Human resources',
          'Kvants',
          'Managers',
          'Sales',
          'Top Kvants'
        ]
      },
      id: {
        faker: 'random.uuid',
        type: 'string'
      },
      name: {
        faker: 'name.findName',
        type: 'string'
      },
      occupation: {
        faker: 'name.jobTitle',
        type: 'string'
      },
      phone: {
        faker: {
          'phone.phoneNumber': '(###) ###-####'
        },
        type: 'string'
      },
      username: {
        faker: 'internet.userName',
        type: 'string'
      }
    },
    required: [
      'avatar',
      'email',
      'id',
      'name',
      'occupation',
      'phone',
      'username'
    ],
    type: 'object'
  },
  maxItems: 1000,
  minItems: 1000,
  type: 'array'
}), null, 2))
