const Router = require('koa-router');

const homeController = require('../../../../2_interface_adapters/controller/HomeController');
const userControler = require('../../../../2_interface_adapters/controller/UserController');
const authController = require('../../../../2_interface_adapters/controller/AuthController');


const router = Router();

router.get('/inscription', homeController.inscription);

router.post('/inscription',
    userControler.createUser,
    authController.generateAccessToken,
    homeController.display_profil);

module.exports = router;