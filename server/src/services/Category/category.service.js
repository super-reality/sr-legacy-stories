 // Initializes the `boards` service on path `/boards`
const createModel = require('../../models/category.model');
const hooks = require('./category.hooks');
const { Category } = require('./category.class');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };


  // Initialize our service with any options it requires
  app.use('/category', new Category(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('category');

  service.hooks(hooks);
};
