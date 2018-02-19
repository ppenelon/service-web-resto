const resto = require('../modeles/Restaurant');

const restoDAO = require('../donnees/RestaurantDAO');

const regex = require('../assistants/Regex');
const tokenAssistant = require('../assistants/Token');

module.exports = function(parametres, callback) {
    //création du nouveau restaurant
    var resto = restoDAO.creeRestaurantAvecParametres(parametres);

    //Si les champs remplis ne conviennent pas
    if(!regex.restaurant(resto))
        throw new Error('Mauvais format des parametres');

    restoDAO.ajouterRestaurant(resto, function(resultat) {
        callback(resultat);
    });
};
