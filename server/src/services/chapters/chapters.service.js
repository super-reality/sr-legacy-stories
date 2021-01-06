// Initializes the `boards` service on path `/boards`
const { Chapters } = require('./chapters.class');
const createModel = require('../../models/chapters.model');
const hooks = require('./chapters.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };


  // Initialize our service with any options it requires
  app.use('/chapters', new Chapters(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chapters');

  service.hooks(hooks);
};
