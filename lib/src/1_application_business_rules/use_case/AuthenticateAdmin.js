const AdminUserRepository = require('../repository/AdminUserRepository');
const AdminUser = require('../../0_enterprise_business_rules/entities/AdminUser');
const Encrypt = require('../security/Encrypt');

/**
 * 
 * @param {String} username
 * @param {String} password 
 * @param {AdminUserRepository} adminUserRepository
 * @param {Encrypt} crypto 
 */
module.exports = async (username, password, adminUserRepository, crypto) => {
    const admin = await adminUserRepository.findByUsername(username);
    if(admin){
        const success = crypto.compare(password, admin.password);
        if(success){
            return admin;
        } else {
            return null;
        }
    } else {
        return undefined;
    }
}