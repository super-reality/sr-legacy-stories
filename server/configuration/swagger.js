const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Super Reality Api', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'Convert your reality to super reality', // short description of the app
  },
  host: '54.183.151.100:3000', // the host or url of the app
  basePath: '/api/v1', // the basepath of your endpoint
};


// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
