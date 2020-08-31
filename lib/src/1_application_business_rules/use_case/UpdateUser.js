
const User = require('../../0_enterprise_business_rules/entities/User');


/**
 * @param {String} id
 * @param {User} user 
 * @param {*} param1 
 */
module.exports = async (id, user, { userRepository, encrypt }) => {
    try {
        if(user.password){
            user.password = await encrypt.hash(user.password);
        }
    } catch(err){
        console.log(err);
        return null;
    }
    return userRepository.update(id, user);
}