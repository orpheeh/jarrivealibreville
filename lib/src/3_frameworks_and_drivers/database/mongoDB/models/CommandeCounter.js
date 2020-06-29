const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    type: { type: String },
    count: { type: String },
    year: Number
});

module.exports = mongoose.model('CommandeCount', schema);