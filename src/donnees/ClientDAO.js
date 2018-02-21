const Client = require('../modeles/Client');

const tokenAssistant = require('../assistants/Token');

//Regarde si un client existe deja dans la bdd
exports.clientExiste = function(telephone, mail, callback){
    var requete = "SELECT idClient FROM client WHERE telephone=? OR mail=?";
    var donnees = [telephone, mail];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        callback(erreur || resultats.length !== 0);
    });
};

//Ajout le client dans la bdd
exports.ajouterClient = function (client, callback) {
    this.clientExiste(client.telephone, client.mail, function(clientExiste){
        if(clientExiste){
            callback({resultat: 0});
        }else{
            var requete = "INSERT INTO client SET nom = ?, prenom = ?, telephone = ?, mail = ?, motDePasse = ?, token = ?";
            var tokenGenere = tokenAssistant.genererToken(client.mail);
            var donnees = [client.nom, client.prenom, client.telephone, client.mail, client.motDePasse, tokenGenere]
            global.bdd.query(requete, donnees, function(erreur, resultats, champs){
                if(erreur || resultats.affectedRows === 0)
                    callback({resultat: 0});
                else
                    callback({
                        resultat: 1,
                        token: tokenGenere
                    });
            });
        }
    });
};

exports.connecterClient = function (login, motDePasse, token, callback) {
    var requete = `UPDATE client 
                   SET token = ? 
                   WHERE (mail LIKE ? OR telephone LIKE ?) 
                   AND motDePasse LIKE ?`;
    var donnees = [token, login, login, motDePasse];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }
        else{
            callback({resultat: 1});
        }
    });
};

exports.modifierClient = function(client, token, callback){
    var requete = `UPDATE client SET nom = ?, prenom = ?, motDePasse = ?
                   WHERE idClient = (SELECT idClient WHERE token LIKE ?)`;
    var donnees = [client.nom, client.prenom, client.motDePasse, token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }else{
            callback({resultat: 1});
        }
    });
};

//Retourne un nouveau client en fonction des parametres
exports.creeClientAvecParametres = function(parametres){
    return new Client(
        parametres.nom, 
        parametres.prenom, 
        parametres.telephone, 
        parametres.mail, 
        parametres.motDePasse, 
        parametres.idClient
    );
};