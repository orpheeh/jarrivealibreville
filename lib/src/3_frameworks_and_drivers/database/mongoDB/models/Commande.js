const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ['import', 'achat_import'] },
    numero: { type: String, require: true, unique: true },
    date: { type: Date, default: Date.now },
    convoit: { type: String, enum: [ 'bateau', 'avion'], default: 'bateau'},
    cotation: { type: String, default: "" },
    achat_import: {
        panier: { type: String, default: null },
        facture: { type: String, default: null },
        montant: { type: String, default: null },
        reference: { type: String, default: null }
    },
    import: {
        facture: { type: String, default: null },
        montant: { type: Number, default: null }
    },
    isSave: { type: Boolean, default: null },
    isFinish: { type: Boolean, default: false }
});

module.exports = mongoose.model('Commande', schema);