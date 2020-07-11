const bodyParser = require('koa-body');
const villes = require('./villes');
const users = require('./users');
const commandes = require('./commandes');
const uploads = require('./uploads');
const cotation = require('./cotation');

module.exports = (app) => {
    app.use(bodyParser({
        formidable: { uploadDir: "./uploads", keepExtensions: true },
        multipart: true,
        json: true,
    
    }));
    app.use(users.routes(), users.allowedMethods())
    app.use(villes.routes(), villes.allowedMethods())
    app.use(commandes.routes(), commandes.allowedMethods())
    app.use(uploads.routes(), uploads.allowedMethods());
    app.use(cotation.routes(), cotation.allowedMethods());
};