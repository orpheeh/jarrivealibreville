const User = require('../../0_enterprise_business_rules/entities/User');

const Bcrypt = require('../security/Bcrypt');
const UserRepository = require('../storages/MongoDBUserRepository');
const GMailSender = require('../messages/GMailSender');

const CreateUser = require('../../1_application_business_rules/use_case/CreateUser');
const UpdateUser = require('../../1_application_business_rules/use_case/UpdateUser');
const Authenticate = require('../../1_application_business_rules/use_case/Authenticate');
const SearchUserByEmail = require('../../1_application_business_rules/use_case/SearchUserByEmail');
const SendEmail = require('../../1_application_business_rules/use_case/SendEmail');

const Notification = require('../../1_application_business_rules/constants/notification_email');

const encrypt = new Bcrypt();
const userRepository = new UserRepository();
const mailSender = new GMailSender(Notification.email, Notification.password);

module.exports = {

    async createUser(ctx, _next) {
        const request = ctx.request;
        const userData = request.body;
        const user = await CreateUser(userData, { userRepository, encrypt });
        if (user) {
            const u = new User(user);
            ctx.state.user = u;
            await _next();
        } else {
            ctx.status = 500;
            ctx.body = "Impossible de créer l'utilisateur";
        }
    },

    async authenticate(ctx, _next) {
        const email = ctx.request.body.email;
        const password = ctx.request.body.password;
        const user = await Authenticate(email, password, { userRepository, encrypt });
        if (user) {
            const u = new User(user);
            ctx.state.user = u;
            await _next();
        } else {
            await ctx.render("connexion/index", { title: "Connexion | J'arrive à Libreville", error: "Email ou mot de passe incorrecte" });
        }
    },

    async updateUser(ctx, _next) {
        const request = ctx.request;
        const userData = request.body;
        const result = await UpdateUser(ctx.state.user._id, userData, { userRepository, encrypt });
        await ctx.redirect("/mon_compte");
    },


    async updateUserAPI(ctx, _next) {
        const request = ctx.request;
        const userData = request.body;
        const result = await UpdateUser(ctx.state.user._id, userData, { userRepository, encrypt });
    },

    async sendEmailChangePasswordAPI(ctx, _next) {
        const email = ctx.request.params.email;
        const user = await SearchUserByEmail(email, { userRepository });
        if (user) {
            try {
                const result = await SendEmail(email, "J'arrive à Libreville, Mot de passe oublié", html, mailSender);
                console.log(result);
            } catch (err) {
                console.log(err);
                ctx.status = 500;
            }
        } else {
            ctx.status = 401;
        }
    }
}