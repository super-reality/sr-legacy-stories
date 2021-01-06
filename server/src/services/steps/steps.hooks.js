const { authenticate } = require('@feathersjs/authentication').hooks;
const createSteps = require("../../hooks/steps")
module.exports = {
  before: {
    all: [ 
      authenticate('jwt'),
    ],
    find: [],
    get: [],
    create: [createSteps()],
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
