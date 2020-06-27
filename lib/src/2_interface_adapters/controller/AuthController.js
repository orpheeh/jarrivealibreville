const AccessToken = require('../security/JWTAccessToken');
const UserRepository = require('../storages/MongoDBUserRepository');
const SearchUserByEmail = require('../../1_application_business_rules/use_case/SearchUserByEmail');
const Users = require('../../0_enterprise_business_rules/entities/User');

const accessToken = new AccessToken();
const userRepository = new UserRepository();
module.exports = {

    async generateAccessToken(ctx, _next) {
        try {
            console.log('payload zzzzzzzzzzzzzzzzzzzzzz');
            console.log(ctx.state.user.email);
            const token = await accessToken.generate({ email: ctx.state.user.email });
            console.log(token);
            ctx.cookies.set("token", token);
            await _next();
        } catch (err) {
            console.log(err);
            ctx.status = 401;
        }
    },

    async verifyAccessToken(ctx, _next) {
        const token = ctx.cookies.get("token");
        if (token) {
            try {
                const payload = await accessToken.decode(token);
                const userModel = await SearchUserByEmail(payload.email, { userRepository });
                const user = new Users(userModel);
                ctx.state.user = user;
                await _next();
            } catch (err) {
                console.log(err);
                await _next();
            }
        }
    }
}