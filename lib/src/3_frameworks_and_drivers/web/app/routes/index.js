const Router = require('koa-router');
const homeController = require('../../../../2_interface_adapters/controller/HomeController');
const router = Router();

const mon_compte = require('./mon_compte');
const inscription = require('./inscription');

router.use(mon_compte.routes(), mon_compte.allowedMethods())
router.use(inscription.routes(), inscription.allowedMethods())

router.get('/', homeController.index);

module.exports = router;