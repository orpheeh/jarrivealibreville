const villes = require('./villes');
const users = require('./users');

module.exports = (app) => {
    app.use(users.routes(), users.allowedMethods())
    app.use(villes.routes(), villes.allowedMethods())
};