const { authenticate } = require('@feathersjs/authentication').hooks
const { setNow } = require('feathers-hooks-common')

const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), setNow('created_at', 'updated_at')],
    update: [
      hashPassword('password'),
      authenticate('jwt'),
      setNow('updatedAt')
    ],
    patch: [
      hashPassword('password'),
      authenticate('jwt'),
      setNow('updated_at')
    ],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
