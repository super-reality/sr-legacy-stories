// Initializes the `boards` service on path `/boards`
const { Skills } = require('./skills.class');
const createModel = require('../../models/skills.model');
const hooks = require('./skills.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/skills', new Skills(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('skills');

  service.hooks(hooks);
};
