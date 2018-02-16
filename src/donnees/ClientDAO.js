const Client = require('../modeles/Client');

const tokenAssistant = require('../assistants/Token');

exports.ajouterClient = function (client, callback) {
    var condition = {
        $or: [
            {telephone: client.telephone},
            {mail:client.mail}
        ]};
    global.bdd.collection("client").findOne(condition, function(erreur, resultat){
        if(resultat == null){
            global.bdd.collection("client").insert(client, function (erreur, resultat) {
                if (erreur) {
                    callback({ resultat: -1 });
                    return;
                }
                callback({ resultat: 1 });
            });
        }else{
            callback({resultat: -1});
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