const GetAllCotation = require('../../1_application_business_rules/use_case/GetAllCotation');
const CreateCotation = require('../../1_application_business_rules/use_case/CreateCotation');
const UpdateCotation = require('../../1_application_business_rules/use_case/UpdateCotation');

const CotisationRepository = require('../storages/MongoDBCotationRepository');

const cotisationRepository = new CotisationRepository();

module.exports = {
    async getAllCotation(ctx, _next) {
        let cotations = await GetAllCotation(cotisationRepository);
        if (cotations.length == 0) {
            //France Avion
            await CreateCotation({ pays: "france", user_type: "particulier", transport: "avion", value: "0" }, cotisationRepository);
            //Chine Avion
            await CreateCotation({ pays: "chine", user_type: "particulier", transport: "avion", value: "0" }, cotisationRepository);
            //Maroc Avion
            await CreateCotation({ pays: "maroc", user_type: "particulier", transport: "avion", value: "0" }, cotisationRepository);
            //France Bateau
            await CreateCotation({ pays: "france", user_type: "particulier", transport: "bateau", value: "0" }, cotisationRepository);
            //Chine Bateau
            await CreateCotation({ pays: "chine", user_type: "particulier", transport: "bateau", value: "0" }, cotisationRepository);
            //Maroc Bateau
            await CreateCotation({ pays: "maroc", user_type: "particulier", transport: "bateau", value: "0" }, cotisationRepository);
            cotations = await GetAllCotation(cotisationRepository);
        }
        ctx.body = cotations;
    },

    async updateCotation(ctx, _next) {
        try {
            const res = await UpdateCotation(ctx.params.id, JSON.parse(ctx.request.body), cotisationRepository);
            ctx.body = res;
        } catch (err) {
            ctx.status = 500;
        }
    }
}