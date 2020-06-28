const villes = require('./villes');
const users = require('./users');
const commandes = require('./commandes');

module.exports = (app) => {
    app.use(users.routes(), users.allowedMethods())
    app.use(villes.routes(), villes.allowedMethods())
    app.use(commandes.routes(), commandes.allowedMethods())
};