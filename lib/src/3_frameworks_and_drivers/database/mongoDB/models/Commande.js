const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    user: { type: mongoose.Types.ObjectId, ref: "Commande" },
    type: { type: String, enum: [ 'import', 'achat_import'] },
    numero: { type: String, require: true, unique: true },
    date: { type: Date, default: Date.now() },
    achat_import: { 
        panier: String,
        facture: String,
        montant: Number,
        reference: String
     },
    import: { 
       facture: String,
       montant: Number
     },
    isSave: { type: Boolean, default: false },
    isFinish: { type: Boolean, default: false }
});

module.exports = mongoose.model('Commande', schema);