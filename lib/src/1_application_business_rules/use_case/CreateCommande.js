/**
 * @param {String} user 
 * @param {String} type 
 * @param {String} numero
 * @param {*} param1 
 */
module.exports = async (user, type, cotation, numero, { commandeRepository }) => {
    return commandeRepository.create({user,  type, cotation, numero });
}