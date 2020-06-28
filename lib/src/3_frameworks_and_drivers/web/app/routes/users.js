const Router = require('koa-router');

const userControler = require('../../../../2_interface_adapters/controller/UserController');
const authController = require('../../../../2_interface_adapters/controller/AuthController');
const homeController = require('../../../../2_interface_adapters/controller/HomeController');

const router = Router();

router.post('/users/update',
    authController.verifyAccessToken,
    userControler.updateUser
    );

router.get('/change-password/:token',
   homeController.change_password);

module.exports = router;