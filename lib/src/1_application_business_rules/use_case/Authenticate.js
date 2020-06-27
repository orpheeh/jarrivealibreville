const User = require('../../0_enterprise_business_rules/entities/User');

/**
 * 
 * @param {User} user 
 * @param {*} param1 
 */
module.exports = async (email, password, { userRepository, encrypt }) => {
    const user = await userRepository.findByEmail(email);
    if(user){
       const success = await encrypt.compare(password, user.password);
       return success ? user : null;
    } 
    return null;
}