const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const mongDB = require('../database/mongoDB');

const webapp = require('./app');
const api = require('./api');

module.exports = async () => {
    const app = new Koa();
    const PORT = process.env.PORT || 3000;

    await mongDB();

    app.use(bodyParser());
    
    webapp(app);
    api(app);

    app.listen(PORT);
}