module.exports = {

    async index(ctx, _next) {
        await ctx.render('landing_page/index', { title: "J'arrive à Libreville" });
    }
}