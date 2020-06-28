const Router = require('koa-router');

const userController = require('../../../2_interface_adapters/controller/UserController');

const router = Router();

router.get('/api/users/forgot-password/:email', 
userController.sendEmailChangePasswordAPI);

module.exports = router;