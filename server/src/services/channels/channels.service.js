// Initializes the `boards` service on path `/boards`
const { Channels } = require('./channels.class');
const createModel = require('../../models/channels.model');
const hooks = require('./channels.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };


  // Initialize our service with any options it requires
  app.use('/channels', new Channels(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('channels');

  service.hooks(hooks);
};
