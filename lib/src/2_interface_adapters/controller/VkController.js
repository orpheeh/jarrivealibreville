const CreateVk = require('../../1_application_business_rules/use_case/CreateVk.js');
const GetAllVk = require('../../1_application_business_rules/use_case/GetVk.js');

const VkRepository = require('../../2_interface_adapters/storages/MongoDBVkRepository');

const vkRepo = new VkRepository();

module.exports = {

    async create(ctx, _next) {
        const request = ctx.request;
        const data = request.body;
        console.log(data);
        const vk = await CreateVk(data, vkRepo);
        console.log(vk);
        if(vk) {
            await ctx.redirect("/");
        } else {
            await ctx.redirect("/");
        }
    },
}