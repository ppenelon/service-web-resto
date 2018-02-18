const restaurantDAO = require('../donnees/RestaurantDAO');

module.exports = function(parametres, callback){

    //Verification que la requete contient les bons paramètres
	if(!parametres.hasOwnProperty('idRestaurant'))
        throw new Error('Parametres manquants');

    restaurantDAO.recupererDetailsRestaurant(parametres.idRestaurant, function(resultat){
        callback(resultat);
    });
}