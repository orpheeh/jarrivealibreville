const Koa = require('koa');

module.exports = () => {
    const app = new Koa();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT);
}