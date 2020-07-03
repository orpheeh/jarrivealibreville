const router = require('koa-router')();

const commandeController = require('../../../2_interface_adapters/controller/CommandeController');

router.post("/uploads/commande/facture", commandeController.uploadFacture);

router.get("/uploads/commande/facture/:id", commandeController.renderFacture);


module.exports = router;