
/**
 * @param {String} user 
 * @param {*} param1 
 */
module.exports = async (user, { commandeRepository }) => {
    return await commandeRepository.findAll(id);
}