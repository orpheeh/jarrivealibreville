const User = require('../../0_enterprise_business_rules/entities/User');

const Bcrypt = require('../security/Bcrypt');
const UserRepository = require('../storages/MongoDBUserRepository');
const GMailSender = require('../messages/GMailSender');

const CreateUser = require('../../1_application_business_rules/use_case/CreateUser');
const UpdateUser = require('../../1_application_business_rules/use_case/UpdateUser');
const Authenticate = require('../../1_application_business_rules/use_case/Authenticate');
const SearchUserByEmail = require('../../1_application_business_rules/use_case/SearchUserByEmail');
const SendEmail = require('../../1_application_business_rules/use_case/SendEmail');
const GetUsers = require('../../1_application_business_rules/use_case/GetUsers');

const Notification = require('../../1_application_business_rules/constants/notification_email');
const Domain = require('../../1_application_business_rules/constants/domain');

const encrypt = new Bcrypt();
const userRepository = new UserRepository();
const mailSender = new GMailSender(Notification.email, Notification.password);

module.exports = {

    async getUsers(ctx, _next) {
        const users = await GetUsers(userRepository);
        ctx.body = users;
    },

    async createUser(ctx, _next) {
        const request = ctx.request;
        const userData = request.body;
        console.log(userData);
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
        console.log("update");
        console.log(userData);
        const result = await UpdateUser(ctx.state.user._id, userData, { userRepository, encrypt });
        await ctx.redirect("/mon_compte");
    },

    async changePassworSendEmailAPI(ctx, _next) {
        const token = ctx.cookies.get("token");
        console.log(token);
        if (!token) {
            ctx.status = 500;
            return;
        }
        try {
            const link = `${Domain}/change-password/${token}`;
            const html = `
            <html>
            <head>
            <style>
              a {
                  padding: 16px;
                  margin-top: 20px
                  background-color: yellow;
                  color: white;
                  display: inline-block;
                  text-decoration: none;
              }

              p {
                  text-align: center;
              }
            </style>
            </head>
            <body>
            <img src="${Domain}/img/logo-jal.png" alt="Logo de j'arrive à Libreville" style="width: 300px height: auto">
            <p>Pour changer votre mot de passe cliquez sur le lien ci-desous</p>
            <p><a href="${link}">Changer de mot de passe</a></p>
            </body>
            </html>
            `;
            const result = await SendEmail(ctx.state.user.email, "J'arrive à Libreville, Mot de passe oublié", html, mailSender);
            console.log(result);
            ctx.status = 200;
        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    },

    async changePassworVerifyEmailAPI(ctx, _next) {
        const email = ctx.params.email;
        console.log(email);
        const user = await SearchUserByEmail(email, { userRepository });
        if (user) {
            ctx.state.user = new User(user);
            await _next();
        } else {
            ctx.status = 401;
        }
    }
}