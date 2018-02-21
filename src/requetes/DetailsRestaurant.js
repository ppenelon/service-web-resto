const restaurantDAO = require('../donnees/RestaurantDAO');

module.exports = function(parametres, callback){

    //Verification que la requete contient les bons paramètres
	if(!parametres.hasOwnProperty('idRestaurant'))
        throw new Error('Parametres manquants');

    //Verification de la validite des parametres envoyes
    if(isNaN(parametres.idRestaurant))
        throw new Error('');

    restaurantDAO.recupererDetailsRestaurant(parametres.idRestaurant, function(resultat){
        callback(resultat);
    });
}