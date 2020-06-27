const User = require('../../0_enterprise_business_rules/entities/User');

const Bcrypt = require('../security/Bcrypt');
const UserRepository = require('../storages/MongoDBUserRepository');

const CreateUser = require('../../1_application_business_rules/use_case/CreateUser');

const encrypt = new Bcrypt();
const userRepository = new UserRepository();

module.exports = {

    async createUser(ctx, _next) {
        const request = ctx.request;
        const userData = request.body;
        console.log(userData);
        const user = await CreateUser(userData, { userRepository, encrypt });
        if(user){
            const u = new User(user);
            ctx.state.user = u;
            await _next();
        } else {
            ctx.status = 500;
            ctx.body = "Impossible de créer l'utilisateur";
        }
    }
}