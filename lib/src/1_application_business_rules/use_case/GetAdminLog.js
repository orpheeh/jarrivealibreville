const Log = require('../../3_frameworks_and_drivers/database/mongoDB/models/AdminLog');

module.exports = async () => {
    try {
        return await Log.find({});
    } catch(err){
        console.log(err);
        return null;
    }
}