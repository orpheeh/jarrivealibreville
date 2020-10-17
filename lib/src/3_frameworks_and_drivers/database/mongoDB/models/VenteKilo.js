const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    nom: { type: String, },
    email: { type: String,  },
    telephone: { type: String,  },
    depart: { type: String,  },
    kilo: { type: Number,  },
    arrivee: { type: String },
    date: { type: Date },
    aeroport_depart: String,
    aeroport_arrivee: String,
    create_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VenteKilo', schema);