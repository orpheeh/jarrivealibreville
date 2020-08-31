const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminLogSchema = Schema({
    username: String,
    commande: String,
    details: String,
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('AdminLog', AdminLogSchema);