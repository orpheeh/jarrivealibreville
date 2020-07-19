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
        const saved = await UserModel.findOne({ _id: id});
        if(!saved){
            return null;
        }
        let u = {
            nom: user.nom ? user.nom : saved.nom,
            prenom: user.prenom ? user.prenom : saved.prenom,
            email: user.email ? user.email : saved.email,
            telephone: user.telephone ? user.telephone : saved.telephone,
            adresse: user.adresse ? user.adresse : saved.adresse,
            pays: user.pays ? user.pays : saved.pays,
            password: user.password ? user.password : saved.password
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