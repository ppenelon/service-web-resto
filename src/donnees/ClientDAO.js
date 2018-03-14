const Client = require('../modeles/Client');

const tokenAssistant = require('../assistants/Token');

//Retourne l'ID d'un client en fonction de son token
exports.recupererIdClientAvecToken = function (token, callback){
    var requete = `SELECT idClient
                   FROM client
                   WHERE token LIKE ?`;
    var donnees = [token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.length === 0){
            callback({resultat: 0});
        }
        else{
            callback({
                resultat: 1,
                idClient: resultats[0].idClient
            });
        }
    });
}

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
                   AND motDePasse LIKE ?
                   AND token LIKE ''`;
    var donnees = [token, login, login, motDePasse];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }
        else{
            //On récupère le nom du client
            var requete2 = `SELECT nom, prenom, mail
                            FROM client
                            WHERE token LIKE ?`;
            var donnees2 = [token];
            global.bdd.query(requete2, donnees2, function(erreur2, resultats2, champs2){
                if(erreur || resultats2.length == 0){
                    callback({resultat: 0});
                }
                else{
                    callback({
                        resultat: 1,
                        nom: resultats2[0].nom + " " + resultats2[0].prenom,
                        mail: resultats2[0].mail
                    });
                }
            });
        }
    });
};

//Fonction qui définit le code de fidélité d'un client en fonction de son id
exports.definirCodeFidelite = function(codeFidelite, idClient, callback){
    var requete = `UPDATE client
                   SET codeFidelite = ?
                   WHERE idClient = ?`;
    var donnees = [codeFidelite, idClient];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }
        else{
            callback({resultat: 1});
        }
    });
}

exports.deconnecterClient = function(token, callback){
    var requete = `UPDATE client
                   SET token = ''
                   WHERE token = ?`;

    var donnees = [token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }
        else{
            callback({resultat: 1});
        }
    });
}

exports.modifierClient = function(client, token, callback){
    var requete = `UPDATE client SET nom = ?, prenom = ?, motDePasse = ?, mail = ?, telephone = ?
                   WHERE idClient = (SELECT idClient WHERE token LIKE ?)`;
    var donnees = [client.nom, client.prenom, client.motDePasse, client.mail, client.telephone, token];

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

//Regarde si un client existe deja dans la bdd
exports.clientExiste = function(telephone, mail, callback){
    var requete = `SELECT idClient
                   FROM client
                   WHERE (telephone LIKE ? OR mail LIKE ?)
                   UNION
                   SELECT idRestaurant
                   FROM restaurant
                   WHERE (telephone LIKE ? OR mail LIKE ?)`;
    var donnees = [telephone, mail, telephone, mail];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        callback(erreur || resultats.length !== 0);
    });
};

exports.clientExisteExclureToken = function(telephone, mail, token, callback){
    var requete = `SELECT idClient 
                   FROM client 
                   WHERE (telephone LIKE ? OR mail LIKE ?)
                   AND token <> ?
                   UNION
                   SELECT idRestaurant
                   FROM restaurant
                   WHERE (telephone LIKE ? OR mail LIKE ?)`;
    var donnees = [telephone, mail, token, telephone, mail];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        callback(erreur || resultats.length !== 0);
    });
};