const CotationRepository = require('../../1_application_business_rules/repository/CotationRepository');

const CotationModel = require('../../3_frameworks_and_drivers/database/mongoDB/models/Cotation');

module.exports = class extends CotationRepository {

    async createCotation(cotation) {
        const c = new CotationModel(cotation);
        const res = await c.save();
        return res;
    }

    async updateCotation(id, data) {
        const c = await CotationModel.findOneAndUpdate({ _id: id }, data);
        return c;
    }

    async findAllCotation() {
        return await CotationModel.find({});
    }
}