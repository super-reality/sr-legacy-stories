// Initializes the `boards` service on path `/boards`
const {  Collectives, Groups } = require('./groups.class');
const createModel = require('../../models/groups.model');
const hooks = require('./groups.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };


  // Initialize our service with any options it requires
  app.use('/groups', new Groups(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('groups');

  service.hooks(hooks);
};
