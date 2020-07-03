const views = require('koa-views');
const Koa = require('koa');
const static = require('koa-static');

const router = require('./routes');

/**
 * @param {Koa} app
 */
module.exports = (app) => {

    app.use(static(__dirname + '/public'));
    app.use(views(__dirname + '/views', { extension: 'pug'}))
    app.use(router.routes(), router.allowedMethods())
}