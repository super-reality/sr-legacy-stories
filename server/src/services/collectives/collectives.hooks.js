const { authenticate } = require('@feathersjs/authentication').hooks;
const createCollectives = require("../../hooks/collectives")
module.exports = {
  before: {
    all: [ 
      authenticate('jwt'),
    ],
    find: [],
    get: [],
    create: [createCollectives()],
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
