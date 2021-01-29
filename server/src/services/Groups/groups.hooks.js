const { authenticate } = require('@feathersjs/authentication').hooks;
const createGroups = require("../../hooks/groups")
module.exports = {
  before: {
    all: [ 
      authenticate('jwt'),
    ],
    find: [],
    get: [],
    create: [createGroups()],
    update: [],
    patch: [],
    remove: [
    ]
  },

  after: {
    all: [],
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
};
