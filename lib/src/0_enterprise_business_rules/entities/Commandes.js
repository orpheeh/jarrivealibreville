module.exports = class {

    constructor(param){
        this._id = param._id;
        this.user = param.user;
        this.numero = param.numero;
        this.achat_import = param.achat_import;
        this.import = param.import;
        this.isSave = param.isSave;
        this.isFinish = param.isFinish;
    }
}