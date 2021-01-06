// Initializes the `boards` service on path `/boards`
const { Steps } = require('./steps.class');
const createModel = require('../../models/steps.model');
const hooks = require('./steps.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/steps', new Steps(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('steps');

  service.hooks(hooks);
};
