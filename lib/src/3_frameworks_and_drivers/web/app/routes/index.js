const Router = require('koa-router');
const authController = require('../../../../2_interface_adapters/controller/AuthController');
const homeController = require('../../../../2_interface_adapters/controller/HomeController');
const router = Router();

const mon_compte = require('./mon_compte');
const inscription = require('./inscription');
const users = require('./users');
const deconnexion = require('./deconnexion');
const connexion = require('./connexion');
const achat_import = require('./achat_import');
const imports = require('./import');
const admin = require('./admin');
const { verifyAccessToken } = require('../../../../2_interface_adapters/controller/AuthController');

router.use(mon_compte.routes(), mon_compte.allowedMethods())
router.use(inscription.routes(), inscription.allowedMethods())
router.use(users.routes(), users.allowedMethods())
router.use(deconnexion.routes(), deconnexion.allowedMethods())
router.use(connexion.routes(), connexion.allowedMethods())
router.use(achat_import.routes(), achat_import.allowedMethods())
router.use(imports.routes(), imports.allowedMethods())
router.use(admin.routes(), admin.allowedMethods())

router.get('/', authController.verifyAccessToken, homeController.index);

module.exports = router;