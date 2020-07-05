const AdminUserRepository = require('../../1_application_business_rules/repository/AdminUserRepository');
const AdminModel = require('../../3_frameworks_and_drivers/database/mongoDB/models/AdminUser');

module.exports = class extends AdminUserRepository {

    async create(userData) {
        try {
            const user = new AdminModel(userData);
            const newUser = await user.save();
            return newUser;
        } catch(err){
            console.log(err);
            return null;
        }
    }

    async findByUsername(username){
        try {
            const admin = await AdminModel.findOne({ username });
            return admin;
        } catch(err){
            console.log(err);
            return null;
        }
    }
}