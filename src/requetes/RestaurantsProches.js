const restaurantDAO = require("../donnees/RestaurantDAO");

module.exports = function(parametres, callback) {
  //Verification que tous les parametres sont la
  if (!parametres.hasOwnProperty("latitude") ||
    !parametres.hasOwnProperty("longitude") ||
    !parametres.hasOwnProperty("rayon")) {
    throw new Error("Parametres manquants");
  }

  //Verification de la validite des parametres envoyes
  if(isNaN(parametres.latitude) || isNaN(parametres.longitude) || isNaN(parametres.rayon)){
    throw new Error("Mauvais format des parametres");
  }

  restaurantDAO.recupererRestaurantsProches(parametres.latitude, parametres.longitude, function(resultat) {
      callback(resultat);
  },parametres.rayon);
};
