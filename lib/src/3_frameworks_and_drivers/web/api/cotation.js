const Router = require('koa-router');

const cotationController = require('../../../2_interface_adapters/controller/CotationController');
const authController = require('../../../2_interface_adapters/controller/AuthController');

const router = Router();

router.get('/api/cotation', cotationController.getAllCotation);

router.put('/api/cotation/:id', cotationController.updateCotation);

module.exports = router;