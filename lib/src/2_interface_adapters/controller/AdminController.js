module.exports = {

    async index(ctx, _next){
        console.log("admin");
        await ctx.render('admin/index', { title: "Administration de la plateforme" });
    }
}