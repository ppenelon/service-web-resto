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

exports.recupererClient = function (parametres, callback) {
    global.bdd.collection("client").findOne({ telephone: parametres.telephone }, function (erreur, resultat) {
        try {
            if (resultat.motDePasse != parametres.motDePasse) {
                callback({ resultat: -1 });
                return;
            }
            callback({ resultat: 1 });
        } catch (e) {
            callback({ resultat: -1 });
        }
    });
};