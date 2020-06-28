/**
 * @param {String} user 
 * @param {String} type 
 * @param {String} numero
 * @param {*} param1 
 */
module.exports = async (user, type, numero, { commandeRepository }) => {
    return commandeRepository.create({user,  type, numero });
}