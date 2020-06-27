module.exports = {

    async index(ctx, _next) {
        await ctx.render('landing_page/index', { title: "J'arrive à Libreville" });
    },

    async mon_compte(ctx, _next) {
        console.log("Mon compte");
        if (ctx.cookies.get("token")) {
            console.log("token ok");
            const user = JSON.stringify(ctx.state.user);
            console.log(user);
            await ctx.render('landing_page/index', { title: "J'arrive à Libreville" });
        } else {
            console.log("no token");
            await ctx.render('landing_page/index', { title: "J'arrive à Libreville" });
        }
    },

    async achat_and_import(ctx, _next) {

    },

    async import(ctx, _next) {

    },

    async inscription(ctx, _next){
        console.log("Blaaaaaaa");
        await ctx.render('inscription/index', { title: "Inscription | J'arrive à Libreville" });
    }
}