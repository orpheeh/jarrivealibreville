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

    async findById(id) {
        return await CommandeModel.findOne({ _id: id });
    }

    async update(id, commande) {
        const c = await CommandeModel.findOne({ _id: id });
        if (commande.achat_import) {
            if (!commande.achat_import.panier) {
                commande.achat_import.panier = c.achat_import.panier;
            }
            if (!commande.achat_import.facture) {
                commande.achat_import.facture = c.achat_import.facture;
            }
            if (!commande.achat_import.reference) {
                commande.achat_import.reference = c.achat_import.reference;
            }
            if (!commande.achat_import.montant) {
                commande.achat_import.montant = c.achat_import.montant;
            }
        }
        const update = await CommandeModel.findOneAndUpdate({ _id: id }, commande);
        return update;
    }

    async findByUser(user){
        return await CommandeModel.find({ user });
    }
}