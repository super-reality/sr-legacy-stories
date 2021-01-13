const users = require('./users/users.service.js')
const chapters = require('./chapters/chapters.service.js');
const steps = require('./steps/steps.service.js');
const messages = require('./messages/messages.service.js')
const collectives = require('./collectives/collectives.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(chapters)
    app.configure(users)
    app.configure(steps)
    app.configure(messages)
    app.configure(collectives)
}
