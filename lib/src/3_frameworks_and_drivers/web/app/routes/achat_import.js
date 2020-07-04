const Router = require('koa-router');

const homeController = require('../../../../2_interface_adapters/controller/HomeController');
const authController = require('../../../../2_interface_adapters/controller/AuthController');

const router = Router();

router.get('/achat_import/:index/:id', authController.verifyAccessToken, homeController.achat_and_import);

module.exports = router;