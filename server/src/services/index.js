const users = require('./users/users.service.js')
const chapters = require('./chapters/chapters.service.js');
const steps = require('./steps/steps.service.js');
const messages = require('./messages/messages.service.js')
const groups = require('./Groups/groups.service.js')
const skills = require('./skills/skills.service.js')
const tags = require('./tags/tags.service.js')
const channels = require('./channels/channels.service.js')
const category = require('./categories/category.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(chapters)
    app.configure(users)
    app.configure(steps)
    app.configure(messages)
    app.configure(groups)
    app.configure(tags)
    app.configure(skills)
    app.configure(channels)
    app.configure(category)
}
