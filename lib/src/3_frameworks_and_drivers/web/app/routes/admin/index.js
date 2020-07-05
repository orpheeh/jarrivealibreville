const Router = require('koa-router');
const router = Router();

const adminController = require('../../../../../2_interface_adapters/controller/AdminController');

router.get('/admin', adminController.verifyAdminToken, adminController.index);

router.post('/admin', adminController.verifyRootToken, adminController.createAdmin);

router.post('/admin/auth', adminController.authAdmin, adminController.index);

router.post('/admin/auth/root', adminController.getCreateAdminToken);

module.exports = router;