const AccessToken = require('../security/JWTAccessToken');
const UserRepository = require('../storages/MongoDBUserRepository');
const SearchUserByEmail = require('../../1_application_business_rules/use_case/SearchUserByEmail');
const Users = require('../../0_enterprise_business_rules/entities/User');

const accessToken = new AccessToken();
const userRepository = new UserRepository();
module.exports = {

    async generateAccessToken(ctx, _next) {
        try {
            const token = await accessToken.generate({ email: ctx.state.user.email });
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
                console.log(payload);
                const userModel = await SearchUserByEmail(payload.email, { userRepository });
                const user = new Users(userModel);
                console.log(user);
                ctx.state.user = user;
                await _next();
            } catch (err) {
                console.log(err);
                await _next();
            }
        } else {
            await _next();
        }
    }
}