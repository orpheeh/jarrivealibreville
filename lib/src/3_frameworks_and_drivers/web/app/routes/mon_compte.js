const Router = require('koa-router');

const homeController = require('../../../../2_interface_adapters/controller/HomeController');
const authController =require('../../../../2_interface_adapters/controller/AuthController');

const router = Router();

router.get('/mon_compte', authController.verifyAccessToken, homeController.mon_compte);

module.exports = router;