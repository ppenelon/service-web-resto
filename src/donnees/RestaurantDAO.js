const tokenAssistant = require('../assistants/Token');

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

exports.recupererRestaurantsProches = function(latitude, longitude, callback, rayon = 10){
    var requete = `SELECT idRestaurant, nom, description FROM restaurant 
                   WHERE latitude - ${rayon} < ? AND latitude + ${rayon} > ? AND longitude - ${rayon} < ? AND longitude + ${rayon} > ?`;
    var donnees = [latitude, latitude, longitude, longitude];
    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.length === 0){
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