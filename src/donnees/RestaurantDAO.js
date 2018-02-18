exports.recupererDetailsRestaurant = function(idRestaurant, callback){
    var requete = `SELECT nom, adresse, telephone, mail, description FROM restaurant 
                   WHERE idRestaurant = ?`;
    var donnees = [idRestaurant];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.length === 0){
            callback({resultat: -1});
        }else{
            callback({resultat: resultats[0]});
        }
    });
};

exports.recupererRestaurantsProches = function(latitude, longitude, callback, rayon = 10){
    var requete = `SELECT idRestaurant, nom, description FROM restaurant 
                   WHERE latitude - ${rayon} < ? AND latitude + ${rayon} > ? AND longitude - ${rayon} < ? AND longitude + ${rayon} > ?`;
    var donnees = [latitude, latitude, longitude, longitude];
    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.length === 0){
            callback({resultat: -1});
        }else{
            callback({resultat: resultats});
        }
    });
};