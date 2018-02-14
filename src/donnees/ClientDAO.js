exports.ajouterClient = function (client, callback) {
    global.bdd.collection("client").insert(client, function (erreur, resultat) {
        if (erreur) callback({ resultat: -1 });
        callback({ resultat: 1 });
    });
};

exports.recupererClient = function (parametres, callback) {
    global.bdd.collection("client").findOne({ telephone: parametres.telephone }, function (erreur, resultat) {
        try {
            if (resultat.motDePasse != parametres.motDePasse) callback({ resultat: -1 })
            callback({ resultat: 1 })
        } catch (e) {
            callback({ resultat: -1 });
        }
    });
};