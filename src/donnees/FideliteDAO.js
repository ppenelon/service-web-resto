//Fonction qui regarde si un client est déjà enregistré dans ce restaurant
exports.verifierClientInscritDansRestaurant = function(codeFidelite, token, callback){
    var requete = `SELECT *
                   FROM fidelite
                   WHERE idClient = (SELECT idClient
                                     FROM client
                                     WHERE codeFidelite LIKE ?)
                   AND idRestaurant = (SELECT idRestaurant
                                       FROM restaurant
                                       WHERE token LIKE ?)`;
    var donnees = [codeFidelite, token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur){
            callback({resultat: 0});
        }
        else{
            callback({
                resultat: 1,
                premiereVisite: (resultats.length == 0)
            })
        }
    });
};

//Fonction qui crée un compte de fidélité d'un client dans un restaurant
exports.creerCompteFideliteClient = function(codeFidelite, token, callback){
    var requete = `INSERT INTO fidelite
                   VALUES(
                       (SELECT idClient
                        FROM client
                        WHERE codeFidelite LIKE ?),
                       (SELECT idRestaurant
                        FROM restaurant
                        WHERE token LIKE ?),
                       0
                   )`;
    var donnees = [codeFidelite, token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }
        else{
            callback({resultat: 1});
        }
    });
};

//Fonction qui récupère le nombre de points de fidélité d'un client dans un restaurant
exports.recupererPointsClient = function(codeFidelite, token, callback){
    var requete = `SELECT *
                   FROM fidelite
                   WHERE idClient = (SELECT idClient
                                     FROM client
                                     WHERE codeFidelite LIKE ?)
                   AND idRestaurant = (SELECT idRestaurant
                                       FROM restaurant
                                       WHERE token LIKE ?)`;
    var donnees = [codeFidelite, token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur){
            callback({resultat: 0});
        }
        else{
            callback({
                resultat: 1,
                points: resultats[0].points
            })
        }
    });
};

//Fonction qui modifie les points d'un compte de fidélité
exports.modifierPoints = function(codeFidelite, token, points, callback){
    var requete = `UPDATE fidelite
                   SET points = GREATEST(points + ?, 0)
                   WHERE idClient = (SELECT idClient
                                     FROM client
                                     WHERE codeFidelite LIKE ?)
                   AND idRestaurant = (SELECT idRestaurant
                                       FROM restaurant
                                       WHERE token LIKE ?)`;
    var donnees = [points, codeFidelite, token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows == 0){
            callback({resultat: 0});
        }
        else{
            callback({resultat: 1});
        }
    });
};