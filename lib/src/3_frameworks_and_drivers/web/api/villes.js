const Router = require('koa-router');

const villes = require('../../../0_enterprise_business_rules/entities/VilleGabon');

const router = Router();

router.get('/api/villes', (ctx, _next) => {
    ctx.body = villes;
});

module.exports = router;