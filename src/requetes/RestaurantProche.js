const restaurantDAO = require('../donnees/RestaurantDAO');

module.exports = function(parametres, callback){

    restaurantDAO.recupererRestaurantProche(parametres.latitude, parametres.longitude, function(resultat){
        callback(resultat);
    }, 15);
}