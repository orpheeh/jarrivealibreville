const Router = require('koa-router');
const router = Router();

const adminController = require('../../../../../2_interface_adapters/controller/AdminController');

router.get('/admin', adminController.index);

module.exports = router;