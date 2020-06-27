
const User = require('../../0_enterprise_business_rules/entities/User');


/**
 * 
 * @param {User} user 
 * @param {*} param1 
 */
module.exports = async (user, { userRepository, encrypt }) => {
    try {
        user.password = await encrypt.hash(user.password);
    } catch(err){
        console.log(err);
        return null;
    }
    return userRepository.create(user);
}