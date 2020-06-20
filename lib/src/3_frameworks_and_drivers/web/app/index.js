const views = require('koa-views');
const Koa = require('koa');
const router = require('./routes');


/**
 * @param {Koa} app
 */
module.exports = (app) => {

    app.use(require('koa-static')(__dirname + '/public'));
    app.use(views(__dirname + '/views', { extension: 'pug'}))
    app.use(router.routes(), router.allowedMethods())
}