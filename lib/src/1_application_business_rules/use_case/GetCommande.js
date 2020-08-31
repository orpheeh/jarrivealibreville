
/**
 * @param {String} user 
 * @param {*} param1 
 */
module.exports = async (id, { commandeRepository }) => {
    return await commandeRepository.findById(id);
}