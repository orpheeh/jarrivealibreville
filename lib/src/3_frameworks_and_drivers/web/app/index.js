const views = require('koa-views');
const Koa = require('koa');
const bodyParser = require('koa-body');
const static = require('koa-static');

const router = require('./routes');

/**
 * @param {Koa} app
 */
module.exports = (app) => {
    app.use(bodyParser({
        formidable:{uploadDir: './uploads'},    //This is where the files would come
        multipart: true,
        urlencoded: true
     }));
    app.use(static(__dirname + '/public'));

    app.use(views(__dirname + '/views', { extension: 'pug'}))
    app.use(router.routes(), router.allowedMethods())
}