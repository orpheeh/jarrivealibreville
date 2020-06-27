module.exports = class {

    constructor(param){
        this._id = param._id;
        this.nom = param.nom;
        this.prenom = param.prenom;
        this.email = param.email;
        this.password = param.password;
        this.adresse = param.adresse;
        this.pays = param.pays;
        this.telephone = param.telephone;
    }
}