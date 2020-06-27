const jwt = require('jsonwebtoken');

const AccessToken = require('../../1_application_business_rules/security/AccessToken');

const JWT_SECRETE_CODE = "jal2020dev";

module.exports = class extends AccessToken {

    async generate(payload){
        return await jwt.sign(payload, JWT_SECRETE_CODE);
    }

    async decode(accessToken){
        return await jwt.verify(accessToken, JWT_SECRETE_CODE);
    }
}