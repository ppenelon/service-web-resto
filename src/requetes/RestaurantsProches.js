const restaurantDAO = require('../donnees/RestaurantDAO');

module.exports = function(parametres, callback){

    restaurantDAO.recupererRestaurantsProches(parametres.latitude, parametres.longitude, function(resultat){
        callback(resultat);
    }, 15);
}