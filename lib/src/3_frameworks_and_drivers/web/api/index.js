const villes = require('./villes');

module.exports = (app) => {
    app.use(villes.routes(), villes.allowedMethods())
};