const tokenAssistant = require('../assistants/Token');

const Restaurant = require('../modeles/Restaurant');

exports.recupererDetailsRestaurant = function(idRestaurant, callback){
    var requete = `SELECT nom, adresse, telephone, mail, description FROM restaurant 
                   WHERE idRestaurant = ?`;
    var donnees = [idRestaurant];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.length === 0){
            callback({resultat: 0});
        }else{
            callback({
                resultat: 1,
                details: resultats[0]
            });
        }
    });
};

exports.recupererRestaurantsProches = function(latitude, longitude, callback, rayon){
    var requete = `SELECT idRestaurant, nom, description, longitude, latitude,
                          6371e+3 AS rayonTerre,
                          ? AS latClient,
                          ? AS lonClient,
                          RADIANS((SELECT latClient)) AS radLat1,
                          RADIANS((SELECT latitude)) AS radLat2,
                          RADIANS((SELECT latitude) - (SELECT latClient)) AS deltaLat,
                          RADIANS((SELECT longitude) - (SELECT lonClient)) AS deltaLon,
                          (SIN((SELECT deltaLat) / 2) * SIN((SELECT deltaLat) / 2)) + (COS((SELECT radLat1)) * COS((SELECT radLat2)) * SIN((SELECT deltaLon) / 2) * SIN((SELECT deltaLon) / 2)) AS a,
                          2 * ATAN2(SQRT((SELECT a)), SQRT(1 - (SELECT a))) AS c,
                          (SELECT rayonTerre) * (SELECT c) / 1000 AS d
                   FROM restaurant
                   HAVING d <= ?`;
    
    var donnees = [latitude, longitude, rayon]; //latitude, longitude, kilometres max

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur){
            callback({resultat: 0});
        }else{
            callback({
                resultat: 1,
                restaurants: resultats
            });
        }
    });
};

exports.modifierRestaurant = function(restaurant, token, callback){
    var requete = `UPDATE restaurant
                   SET nom = ?, adresse = ?, longitude = ?, latitude = ?, telephone = ?, mail = ?, motDePasse = ?, description = ?
                   WHERE token LIKE ?`;

    var donnees = [restaurant.nom, restaurant.adresse, restaurant.longitude, restaurant.latitude, restaurant.telephone, restaurant.mail, restaurant.motDePasse, restaurant.description, token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }
        else{
            callback({resultat: 1});
        }
    });
}

exports.connecterRestaurant = function(login, motDePasse, token, callback){
    var requete = `UPDATE restaurant
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
    })
};

exports.deconnecterRestaurant = function(token, callback){
    var requete = `UPDATE restaurant
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

exports.creeRestaurantAvecParametres = function(parametres){
    return new Restaurant(
        parametres.idRestaurant, 
        parametres.nom, 
        parametres.description, 
        parametres.adresse, 
        parametres.latitude, 
        parametres.longitude,
        parametres.telephone,
        parametres.mail,
        parametres.motDePasse
    );
};

exports.ajouterRestaurant = function(restaurant, callback){
    this.restaurantExiste(restaurant.telephone, restaurant.mail, function(restaurantExiste){
        if(restaurantExiste){
            callback({resultat: 0});
        }else{
            var requete = `INSERT INTO restaurant SET nom = ?, adresse = ?, latitude = ?, longitude = ?, telephone = ?, mail = ?, motDePasse = ?, description = ?, token = ?`;
            var tokenGenere = tokenAssistant.genererToken(restaurant.mail);
            var donnees = [restaurant.nom, restaurant.adresse, restaurant.latitude, restaurant.longitude, restaurant.telephone, restaurant.mail, restaurant.motDePasse, restaurant.description, tokenGenere];
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
}

exports.restaurantExiste = function(telephone, mail, callback){
    var requete = "SELECT idRestaurant FROM restaurant WHERE telephone=? OR mail=?";
    var donnees = [telephone, mail];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        callback(erreur || resultats.length !== 0);
    });
};

exports.restaurantExisteExclureToken = function(telephone, mail, token, callback){
    var requete = `SELECT idRestaurant 
                   FROM restaurant 
                   WHERE (telephone=? OR mail=?)
                   AND token <> ?`;
    var donnees = [telephone, mail, token];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        callback(erreur || resultats.length !== 0);
    });
};