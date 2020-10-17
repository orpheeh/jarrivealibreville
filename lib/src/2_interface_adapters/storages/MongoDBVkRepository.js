const VkModel = require('../../3_frameworks_and_drivers/database/mongoDB/models/VenteKilo')

const VkRepository = require('../../1_application_business_rules/repository/VkRepository');
const { vk } = require('../controller/AdminController');

module.exports = class extends VkRepository {

    async create(data){
        const vk  = new VkModel(data);
        return await vk.save();
    }

    async getAll(){
        return await VkModel.find({});
    }
}