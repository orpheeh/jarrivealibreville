const UserRepository = require('../../1_application_business_rules/repository/UserRepository')

const UserModel = require('../../3_frameworks_and_drivers/database/mongoDB/models/Users');

module.exports = class extends UserRepository {

    async create(userEntity){
        const user = new UserModel(userEntity);
        const newUser = await user.save();
        return newUser;
    }

    async find(){
        return await UserModel.find({});
    }

    async findByEmail(email){
        return await UserModel.findOne({ email });
    }

}