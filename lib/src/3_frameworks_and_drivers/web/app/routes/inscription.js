const Router = require('koa-router');

const homeController = require('../../../../2_interface_adapters/controller/HomeController');
const authController = require('../../../../2_interface_adapters/controller/AuthController');
const userControler = require('../../../../2_interface_adapters/controller/UserController');


const router = Router();

router.get('/inscription', homeController.inscription);

router.post('/inscription',
    userControler.createUser,
    authController.generateAccessToken,
    homeController.mon_compte);

module.exports = router;