const CreateAdminUser = require("../../1_application_business_rules/use_case/CreateAdminUser");
const MongoDBAdminRepository = require('../storages/MongoDBAdminUserRepository');
const Bcrypt = require('../security/Bcrypt');
const JWT = require('../security/JWTAccessToken');
const AuthenticateAdmin = require("../../1_application_business_rules/use_case/AuthenticateAdmin");
const AdminUser = require("../../0_enterprise_business_rules/entities/AdminUser");

const GetVk = require('../../1_application_business_rules/use_case/GetVk.js');

const VkRepository = require('../../2_interface_adapters/storages/MongoDBVkRepository');

const vkRepo = new VkRepository();

const GetUsers = require('../../1_application_business_rules/use_case/GetUsers');
const UserRepository = require('../../2_interface_adapters/storages/MongoDBUserRepository');

const userRepository = new UserRepository();

const adminRepository = new MongoDBAdminRepository();
const bcrypt = new Bcrypt();
const jwt = new JWT();

const Root = {
    username: "root",
    password: "maFOIcrystoReflechirAlaLumiere"
}

module.exports = {

    async commandes(ctx, _next) {
        if (ctx.state.user) {
            await ctx.render('admin/commandes', { title: "Administration de la plateforme", user: ctx.state.user });
        } else {
            await ctx.render('admin/login', { title: "Login | Administration de la plateforme" });
        }
    },

    async cotation(ctx, _next) {
        if (ctx.state.user) {
            await ctx.render('admin/cotation', { title: "Administration de la plateforme", user: ctx.state.user });
        } else {
            await ctx.render('admin/login', { title: "Login | Administration de la plateforme" });
        }
    },

    async vk(ctx, _next) {
        if (ctx.state.user) {
            let vk = await GetVk(vkRepo);
            vk = vk.reverse();
            console.log(vk);
            await ctx.render('admin/vk', { title: "Administration de la plateforme", user: ctx.state.user, vk });
        } else {
            await ctx.render('admin/login', { title: "Login | Administration de la plateforme" });
        }
    },

    async visite(ctx, _next) {
        if (ctx.state.user) {
            let users = await GetUsers(userRepository);
            users = users.sort((a, b) => {
                const f1 = a.nom + " " + a.prenom;
                const f2 = b.nom + " " + b.prenom;
                return f1.localeCompare(f2);
            });
            await ctx.render('admin/users.pug', { title: "Administration de la plateforme", user: ctx.state.user, users });
        } else {
            await ctx.render('admin/login', { title: "Login | Administration de la plateforme" });
        }
    },

    async createAdmin(ctx, _next) {
        const user = ctx.request.body;
        const res = await CreateAdminUser(user, adminRepository, bcrypt);
        if (res) {
            console.log(res);
            ctx.status = 200;
        } else {
            ctx.status = 500;
        }
    },

    async getCreateAdminToken(ctx, _next) {
        console.log(ctx.request.body);
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        if (password == Root.password && username == Root.username) {
            const token = await jwt.generate({ message: "J'arrive à Libreville" });
            ctx.body = token;
        } else {
            ctx.status = 401;
        }
    },

    async authAdmin(ctx, _next) {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        const res = await AuthenticateAdmin(username, password, adminRepository, bcrypt);
        if (res) {
            const admin = new AdminUser(res);
            const token = await jwt.generate({ username });
            ctx.cookies.set("token_admin", token);
            ctx.state.user = admin;
            await _next();
        } else {
            await _next();
        }
    },

    async verifyAdminToken(ctx, _next) {
        const token = ctx.cookies.get("token_admin");
        if (token) {
            try {
                const admin = await jwt.decode(token);
                if (admin) {
                    ctx.state.user = admin;
                }
                await _next();
            } catch (err) {
                console.log(err);
                await _next();
            }
        } else {
            await _next();
        }
    },

    async verifyRootToken(ctx, _next) {
        console.log(ctx.headers);
        const token = ctx.headers["authorization"].split(" ")[1];
        if (token) {
            const welcome = await jwt.decode(token);
            console.log(welcome);
        }
        await _next();
    }
}