const bcrypt = require('bcryptjs');

const EncryptManager = require('../../1_application_business_rules/security/Encrypt');

module.exports = class extends EncryptManager {

    async hash(value){
        return await bcrypt.hash(value, 10);
    }

    async compare(value, hash){
        return await bcrypt.compare(value, hash);
    }
}