module.exports = {

    async index(ctx, _next) {
        let user = null;
        if(ctx.state.user){
            user = JSON.stringify(ctx.state.user);
        }
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

    async connexion(ctx, _next){
        console.log("Connexion please");
        await ctx.render("connexion/index", { title: "Connexion | J'arrive à Libreville"});
    },

    async deconnexion(ctx, _next){
        ctx.cookies.set('token', null);
        await ctx.redirect("/");
    },

    async forgot_password(ctx, _next){
        await ctx.render("connexion/forgot_password", { title: "Mot de passe oublié | J'arrive à Libreville"});
    },

    async change_password(ctx, _next){
      await ctx.render('profil/change_password', { title: "Changer le mot de passe | J'arrive à Libreville"});
    },

    async display_profil(ctx, _next) {
        console.log("redirect please !");
        ctx.redirect("/mon_compte");
    },

}