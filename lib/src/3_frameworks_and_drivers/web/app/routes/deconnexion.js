const Router = require('koa-router');

const homeController = require('../../../../2_interface_adapters/controller/HomeController');


const router = Router();

router.get('/deconnexion', homeController.deconnexion);

module.exports = router;