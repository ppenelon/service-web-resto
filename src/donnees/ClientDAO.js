const Client = require('../modeles/Client');

const tokenAssistant = require('../assistants/Token');

exports.ajouterClient = function (client, callback) {
    var requete = "SELECT idClient FROM client WHERE telephone=? OR mail=?";
    var donnees = [client.telephone, client.mail];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        //Si il y a déjà un client avec les informations du client que l'on veut ajouter
        if(erreur || resultats.length !== 0){
            callback({resultats: -1});
        }else{
            requete = "INSERT INTO client SET ?";
            global.bdd.query(requete, client, function(erreur, resultats, champs){
                if(erreur || resultats.affectedRows === 0)
                    callback({resultat: 0});
                else
                    callback({resultat: 1});
            });
        }
    });
};

exports.connecterClient = function (login, motDePasse, callback) {
    var tokenGenere = tokenAssistant.genererToken(login);

    var requete = "UPDATE client SET token = ? WHERE (mail LIKE ? OR telephone LIKE ?) AND motDePasse LIKE ?";
    var donnees = [tokenGenere, login, login, motDePasse];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }
        else{
            callback({
                resultat: 1,
                token: tokenGenere
            })
        }
    });
};

exports.modifierClientAvecToken = function(client, callback){
    var requete = `UPDATE client SET nom = ?, prenom = ?, motDePasse = ?
                   WHERE idClient = (SELECT idClient WHERE token LIKE ?)`;
    var donnees = [client.nom, client.prenom, client.motDePasse, client.token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }else{
            callback({resultat: 1});
        }
    });
};