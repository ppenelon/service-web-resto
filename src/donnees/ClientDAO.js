const token = require('../assistants/Token');

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
    var requete = {
        $or: [
            {mail: login},
            {telephone: login}
        ],
        motDePasse: motDePasse
    };
    var update = {
        $set: {
            token: token.genererToken(login)
        }
    }
    global.bdd.collection('client').findAndModify(requete, {}, update, {new: true}, function(erreur, resultat){
        var document = resultat.value;
        if(erreur || document === null){
            callback({
                resultat: 0
            });
        }
        else{
            callback({
                resultat: 1,
                token: document.token
            });
        }
    });
};