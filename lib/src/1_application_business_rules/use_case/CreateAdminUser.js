const AdminUserRepository = require('../repository/AdminUserRepository');
const AdminUser = require('../../0_enterprise_business_rules/entities/AdminUser');
const Encrypt = require('../security/Encrypt');

/**
 * 
 * @param {AdminUser} userData 
 * @param {AdminUserRepository} adminUserRepository
 * @param {Encrypt} crypto 
 */
module.exports = async  (userData, adminUserRepository, crypto) => {
     if(userData.password){
            userData.password = await crypto.hash(userData.password);
     }
     const newAdmin = adminUserRepository.create(userData);
     return newAdmin;
}