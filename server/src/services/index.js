const users = require('./users/users.service.js')
const chapters = require('./chapters/chapters.service.js');
const steps = require('./steps/steps.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(chapters)
    app.configure(users)
    app.configure(steps)
}
