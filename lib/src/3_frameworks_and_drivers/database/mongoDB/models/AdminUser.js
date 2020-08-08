const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserAdminSchema = Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    fullname: { type: String, require: true },
    email: String,
    tel: String
});

module.exports = mongoose.model('AdminUser', UserAdminSchema);