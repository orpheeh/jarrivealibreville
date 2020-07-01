const User = require('../../0_enterprise_business_rules/entities/User');
const Commande = require('../../0_enterprise_business_rules/entities/Commandes')

const UserRepository = require('../storages/MongoDBUserRepository');
const CommandeRepository = require('../storages/MongoDBCommandeRepository');
const GMailSender = require('../messages/GMailSender');
const CounterRepository = require('../storages/MongoDBCommandeCounterRepository');

const GetCommandeNumero = require('../../1_application_business_rules/use_case/GetCommandeNumero');
const CreateCommande = require('../../1_application_business_rules/use_case/CreateCommande');
const UpdateCommande = require('../../1_application_business_rules/use_case/UpdateCommande');
const GetAllCommande = require('../../1_application_business_rules/use_case/GetAllCommande');
const CreateCount = require('../../1_application_business_rules/use_case/CreateCommadeCounterIfNotExist');
const GetCounter = require('../../1_application_business_rules/use_case/GetCommandeCount');
const IncrementCommande = require('../../1_application_business_rules/use_case/CountCommande');

const Notification = require('../../1_application_business_rules/constants/notification_email');
const CountCommande = require('../../1_application_business_rules/use_case/CountCommande');

const userRepository = new UserRepository();
const commandeRepository = new CommandeRepository();
const mailSender = new GMailSender(Notification.email, Notification.password);
const counterRepository = new CounterRepository();

module.exports = {

    async getCommandes() {
        const commandes = await commandeRepository.findAll();
        ctx.body = commandes;
    },

    async createCommande(ctx, _next) {
        const user = ctx.state.user._id;
        const type = ctx.request.body.type;
        try {
            await CreateCount(type, counterRepository);
            const count = await CountCommande(type, counterRepository);
            const numero = GetCommandeNumero(type, count.count);
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
            const res = await GetAllCommande(user, { commandeRepository });
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
        try {
            const res = await UpdateCommande(ctx.params.id, ctx.request.body,
                { commandeRepository });
            if (res) {
                ctx.body = res;
            } else {
                console.log(res);
                ctx.status = 401;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    },

    async updateCommandeWithFile(ctx, _next) {
        const id = ctx.request.body.id;
        //Save file
    }
}