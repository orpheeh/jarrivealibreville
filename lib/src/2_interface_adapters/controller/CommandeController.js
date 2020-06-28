const User = require('../../0_enterprise_business_rules/entities/User');
const Commande = require('../../0_enterprise_business_rules/entities/Commandes')

const UserRepository = require('../storages/MongoDBUserRepository');
const CommandeRepository = require('../storages/MongoDBCommandeRepository');
const GMailSender = require('../messages/GMailSender');

const GetCommandeNumero = require('../../1_application_business_rules/use_case/GetCommandeNumero');
const CreateCommande = require('../../1_application_business_rules/use_case/CreateCommande');
const UpdateCommande = require('../../1_application_business_rules/use_case/UpdateCommande');
const GetAllCommande = require('../../1_application_business_rules/use_case/GetAllCommande');



const Notification = require('../../1_application_business_rules/constants/notification_email');

const userRepository = new UserRepository();
const commandeRepository = new CommandeRepository();
const mailSender = new GMailSender(Notification.email, Notification.password);

module.exports = {
    async createCommande(ctx, _next) {
        const user = ctx.state.user._id;
        const type = ctx.request.body.type;
        const numero = GetCommandeNumero(type);
        try {
            const result = await CreateCommande(user, type, numero, { commandeRepository });
            if (result) {
                ctx.body = result;
            } else {
                ctx.status = 500;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    },

    async getAllCommande(ctx, _next) {
        const user = ctx.state.user;
        try {
            const res = await GetAllCommande(user);
            if (res) {
                ctx.body = res;
            } else {
                ctx.status = 401;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    },

    async updateCommande(ctx, _next) {
        const user = ctx.state.user;
        try {
            const res = await UpdateCommande(user._id, ctx.request.body);
            if (res) {
                ctx.body = res;
            } else {
                ctx.status = 401;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    }
}