const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    pays: { type: String },
    transport: { type: String },
    user_type: { type: String },
    value: { type: String },
});

module.exports = mongoose.model('Cotation', schema);