const UserRepository = require('../../1_application_business_rules/repository/UserRepository')

const UserModel = require('../../3_frameworks_and_drivers/database/mongoDB/models/Users');

module.exports = class extends UserRepository {

    async create(userEntity){
        const user = new UserModel(userEntity);
        const newUser = await user.save();
        return newUser;
    }

    async update(id, user){
        console.log(id);
        user._id = undefined;
        console.log(user);
        let u = {
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone,
            adresse: user.adresse,
            pays: user.pays,
            password: user.password
        }
        if(user.password){
            u = {
                password: user.password
            };
        }
        const update = await UserModel.findOneAndUpdate({ _id: id }, u, { new: true });
        return update;
    }

    async find(){
        return await UserModel.find({});
    }

    async findById(id){
        return await UserModel.findOne({ _id: id});
    }

    async findByEmail(email){
        return await UserModel.findOne({ email });
    }

}