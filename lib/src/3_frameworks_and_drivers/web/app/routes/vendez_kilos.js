const Router = require('koa-router');

const vkController = require('../../../../2_interface_adapters/controller/VkController');

const router = Router();

router.post('/vk', vkController.create);

module.exports = router;