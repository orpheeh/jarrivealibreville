const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const villeDuGabon = require('../../../../0_enterprise_business_rules/entities/VilleGabon');

const schema = Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    nom: { type: String, require: true },
    prenom: { type: String, require: true },
    adresse: { type: String },
    pays: { type: String, require: true },
    telephone: { type: String }
});

module.exports = mongoose.model('User', schema);