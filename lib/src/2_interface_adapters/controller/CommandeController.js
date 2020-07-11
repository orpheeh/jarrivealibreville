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
const SendEmail = require('../../1_application_business_rules/use_case/SendEmail');

const Notification = require('../../1_application_business_rules/constants/notification_email');
const JALEmail = require('../../1_application_business_rules/constants/JALEmail');
const Domain = require('../../1_application_business_rules/constants/domain');
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
        const cotation = JSON.parse(ctx.request.body).cotation;

        console.log(type);
        try {
            await CreateCount(type,  counterRepository);
            const count = await CountCommande(type, counterRepository);
            const numero = GetCommandeNumero(type, count.count + 1);
            const result = await CreateCommande(user, type, cotation, numero, { commandeRepository });
            const object = "[Commande n°" + numero + "] J'arrive à Libreville - Nouvelle commande";
            SendEmail(JALEmail, object, `
                <html>
                <p>Vous venez de recevoir une nouvelle commande ${numero}</p>
                <p>
                <a href="${Domain}/admin">Suivre la commande</a>
                </p>
                </html>
            `, mailSender);

            if (ctx.state.user.email) {
                SendEmail(ctx.state.user.email, object, `
            <html>
            <p>Vous venez de créer une nouvelle commande ${numero}</p>
            <p>
            <a href="${Domain}/mon_compte">Suivre la commande</a>
            </p>
            </html>
        `, mailSender);
            }
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
        const id = ctx.params.id;
        try {
            const c = await commandeRepository.findById(id);
            const res = await UpdateCommande(ctx.params.id, JSON.parse(ctx.request.body),
                { commandeRepository });
            if (res) {
                const object = "[Commande n°" + c.numero + "] J'arrive à Libreville - Il y'a eu dun changement sur une commande";
                SendEmail(JALEmail, object, `
                <html>
                <p>Il y'a une des changement consernant la commande ${c.numero}</p>
                <p>
                <a href="${Domain}/admin">Suivre la commande</a>
                </p>
                </html>
            `, mailSender);
            const user = await userRepository.findById(c.user);
                if (user && user.email) {
                    SendEmail(user.email, object, `
            <html>
            <p>Il y'a une des changement consernant la commande ${c.numero}</p>
            <p>
            <a href="${Domain}/mon_compte">Suivre la commande</a>
            </p>
            </html>
        `, mailSender);
                }
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
            let r = null
            if (type == 'achat_import') {
                r = await UpdateCommande(id,
                    { achat_import: { facture: file.path + ";" + file.name } },
                    { commandeRepository });
            } else {
                r = await UpdateCommande(id,
                    { import: { facture: file.path + ";" + file.name } },
                    { commandeRepository });
            }
            const object = "[" + r.numero + "] J'arrive à Libreville - Facture envoyé"
            const c = await commandeRepository.findById(id);
            const user = await userRepository.findById(c.user);
            if (user && user.email) {
                console.log("send email facture");
                SendEmail(user.email, object, `
                <html>
                <p>J'arrive à Libreville vient de vous envoyer la facture consernant la commande ${r.numero}.</p>
                <p>
                <a href="${Domain}/mon_compte">Suivre la commande</a>
                </p>
                </html>
            `, mailSender);
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
                const object = "[" + r.numero + "] J'arrive à Libreville - Panier envoyer"
                SendEmail(JALEmail, object, `
                <html>
                <p>Il y'a eu des modification sur la commande ${r.numero}. Le panier y a été ajouté.</p>
                <p>
                <a href="${Domain}/admin">Suivre la commande</a>
                </p>
                </html>
            `, mailSender);
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