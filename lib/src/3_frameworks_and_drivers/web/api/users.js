const Router = require('koa-router');

const userController = require('../../../2_interface_adapters/controller/UserController');
const authController = require('../../../2_interface_adapters/controller/AuthController');

const router = Router();

router.get('/api/users/forgot-password/:email', 
userController.changePassworVerifyEmailAPI,
authController.generateAccessToken,
userController.changePassworSendEmailAPI);

module.exports = router;