const Log = require('../../3_frameworks_and_drivers/database/mongoDB/models/AdminLog')

module.exports = async (username, commande, details) => {
    try {
        const log = new Log({ username, commande, details});
        const res = await log.save();
        return res;
    } catch(err){
        console.log(err);
        return null;
    }
}