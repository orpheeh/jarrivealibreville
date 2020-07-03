const Router = require('koa-router');

const commandeController = require('../../../2_interface_adapters/controller/CommandeController');
const authController = require('../../../2_interface_adapters/controller/AuthController');

const router = Router();

router.get('/api/commandes', authController.verifyAccessToken, commandeController.getAllCommande);

router.post('/api/commandes', authController.verifyAccessToken, commandeController.createCommande);

router.put('/api/commandes/:id', authController.verifyAccessToken, commandeController.updateCommande);

router.get('/api/commandes/open', commandeController.getCommandes)

module.exports = router;