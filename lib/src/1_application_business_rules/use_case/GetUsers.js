const User = require('../../0_enterprise_business_rules/entities/User');

/**
 * 
 * @param {User} user 
 * @param {*} param1 
 */
module.exports = async (userRepository) => {
    return userRepository.find();
}