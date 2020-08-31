const Router = require('koa-router');
const router = Router();

const adminController = require('../../../../../2_interface_adapters/controller/AdminController');

router.get('/admin/commandes', adminController.verifyAdminToken, adminController.commandes);

router.get('/admin', async (ctx, _next) => await ctx.redirect("/admin/commandes"))

router.get('/admin/cotation', adminController.verifyAdminToken, adminController.cotation);

router.post('/admin', adminController.verifyRootToken, adminController.createAdmin);

router.post('/admin/auth', adminController.authAdmin, adminController.commandes);

router.post('/admin/auth/root', adminController.getCreateAdminToken);

module.exports = router;