// Initializes the `boards` service on path `/boards`
const {  Collectives } = require('./collectives.class');
const createModel = require('../../models/collectives.model');
const hooks = require('./collectives.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };


  // Initialize our service with any options it requires
  app.use('/collectives', new Collectives(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('collectives');

  service.hooks(hooks);
};
