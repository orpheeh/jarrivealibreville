const Koa = require('koa');

const webapp = require('./app');

module.exports = () => {
    const app = new Koa();
    const PORT = process.env.PORT || 3000;

    webapp(app);

    app.listen(PORT);
}