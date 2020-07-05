const User = require('../../0_enterprise_business_rules/entities/User');
const Commande = require('../../0_enterprise_business_rules/entities/Commandes')

const UserRepository = require('../storages/MongoDBUserRepository');
const CommandeRepository = require('../storages/MongoDBCommandeRepository');
const GMailSender = require('../messages/GMailSender');
const CounterRepository = require('../storages/MongoDBCommandeCounterRepository');

const GetCommandeNumero = require('../../1_application_business_rules/use_case/GetCommandeNumero');
const GetCommande = require('../../1_application_business_rules/use_case/GetCommande');
const CreateCommande = require('../../1_application_business_rules/use_case/CreateCommande');
const UpdateCommande = require('../../1_application_business_rules/use_case/UpdateCommande');
const GetAllCommande = require('../../1_application_business_rules/use_case/GetAllCommande');
const CreateCount = require('../../1_application_business_rules/use_case/CreateCommadeCounterIfNotExist');

const Notification = require('../../1_application_business_rules/constants/notification_email');
const CountCommande = require('../../1_application_business_rules/use_case/CountCommande');

const userRepository = new UserRepository();
const commandeRepository = new CommandeRepository();
const mailSender = new GMailSender(Notification.email, Notification.password);
const counterRepository = new CounterRepository();

const send = require('koa-send');

module.exports = {

    async getCommandes(ctx, _next) {
        const commandes = await commandeRepository.findAll();
        ctx.body = commandes;
    },

    async getCommandeById(ctx, _next) {
        const commande = await commandeRepository.findById(ctx.params.id);
        ctx.body = commande;
    },

    async createCommande(ctx, _next) {
        const user = ctx.state.user._id;
        const type = JSON.parse(ctx.request.body).type;
        console.log(type);
        try {
            await CreateCount(type, counterRepository);
            const count = await CountCommande(type, counterRepository);
            const numero = GetCommandeNumero(type, count.count+1);
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
            const res = await UpdateCommande(ctx.params.id, JSON.parse(ctx.request.body),
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

    async uploadFacture(ctx, _next) {
        const fields = ctx.request.body;
        const files = ctx.request.files;
        const id = fields['id'];
        const file = files['facture'];
        const type = fields['type'];
        try {
            if (type == 'achat_import') {
                const r = await UpdateCommande(id,
                    { achat_import: { facture: file.path + ";" + file.name } },
                    { commandeRepository });
            } else {
                const r = await UpdateCommande(id,
                    { import: { facture: file.path + ";" + file.name } },
                    { commandeRepository });
            }
            ctx.status = 200;
        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    },

    async uploadPanier(ctx, _next) {
        const fields = ctx.request.body;
        const files = ctx.request.files;
        const id = fields['id'];
        const file = files['panier'];
        const type = fields['type'];
        const convoit = fields['convoit'];
        try {
            if (type == 'achat_import') {
                const r = await UpdateCommande(id,
                    {
                        achat_import: { panier: file.path + ";" + file.name },
                        convoit
                    },
                    { commandeRepository });
            }
            ctx.status = 200;
        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    },

    async renderFacture(ctx, _next) {
        try {
            const commande = await GetCommande(ctx.params.id, { commandeRepository });
            const str = commande.type == 'achat_import' ? commande.achat_import.facture :
                commande.import.facture;
            const path = str.split(";")[0];
            const name = str.split(";")[1];
            ctx.attachment(name);
            await send(ctx, path);

        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    },

    async renderPanier(ctx, _next) {
        try {
            const commande = await GetCommande(ctx.params.id, { commandeRepository });
            const str = commande.type == 'achat_import' ? commande.achat_import.panier :
                commande.import.panier;
            const path = str.split(";")[0];
            const name = str.split(";")[1];
            ctx.attachment(name);
            await send(ctx, path);

        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    }
}