const CommandeRepository = require('../../1_application_business_rules/repository/CommandeRepository');

const CommandeModel = require('../../3_frameworks_and_drivers/database/mongoDB/models/Commande');

module.exports = class extends CommandeRepository {

    async create(commande) {
        const n = new CommandeModel(commande);
        const res = await n.save();
        return res;
    }

    async findAll() {
        return await CommandeModel.find({});
    }

    async update(id, commande) {
        commande._id = id;
        const update = await CommandeModel.findOneAndUpdate({ _id: id }, commande, { new: true, rawResult: true });
        console.log(update);
        console.log(id)
        console.log(commande);
        return update;
    }
}