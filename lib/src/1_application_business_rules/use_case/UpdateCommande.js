
const Commande = require('../../0_enterprise_business_rules/entities/Commandes');


/**
 * @param {String} id
 * @param {Commande} user 
 * @param {*} param1 
 */
module.exports = async (id, commande, { commandeRepository }) => {
    return commandeRepository.update(id, commande);
}