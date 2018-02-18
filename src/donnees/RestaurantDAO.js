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