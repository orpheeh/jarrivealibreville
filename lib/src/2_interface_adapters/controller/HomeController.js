module.exports = {

    async index(ctx, _next) {
        let user = null;
        if(ctx.state.user){
            user = JSON.stringify(ctx.state.user);
        }
        console.log(user);
        await ctx.render('landing_page/index', { title: "J'arrive à Libreville", user });
    },

    async mon_compte(ctx, _next) {
        if (ctx.state.user) {
            const user = JSON.stringify(ctx.state.user);
            await ctx.render('profil/index', { title: "J'arrive à Libreville", user });
        } else {
            await ctx.redirect("/");
        }
    },

    async achat_and_import(ctx, _next) {

    },

    async import(ctx, _next) {

    },

    async inscription(ctx, _next) {
        await ctx.render('inscription/index', { title: "Inscription | J'arrive à Libreville" });
    },

    async deconnexion(ctx, _next){
        ctx.cookies.set('token', null);
        await ctx.redirect("/");
    },

    async display_profil(ctx, _next) {
        console.log("redirect please !");
        ctx.redirect("/mon_compte");
    },

}