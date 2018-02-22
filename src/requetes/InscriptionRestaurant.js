const resto = require('../modeles/Restaurant');

const restoDAO = require('../donnees/RestaurantDAO');

const regex = require('../assistants/Regex');
const tokenAssistant = require('../assistants/Token');

module.exports = function(parametres, callback) {
    // Vérification des paramètres

    if(
        !parametres.hasOwnProperty("nom") ||
        !parametres.hasOwnProperty("adresse") ||
        !parametres.hasOwnProperty("telephone") ||
        !parametres.hasOwnProperty("mail") ||
        !parametres.hasOwnProperty("descripion") ||
        !parametres.hasOwnProperty("motDePasse")
    ) {
        throw new Error("Parametres manquants");
    }

    if(
        parametres.nom.length > 150 ||
        parametres.adresse > 150 ||
        !regex.telephone(parametres.telephone) ||
        !regex.mail(parametres.mail) ||
        !regex.motDePasse(parametres.motDePasse)
    ){
        throw new Error("Mauvais format des paramètres");
    }

    //création du nouveau restaurant
    var resto = restoDAO.creeRestaurantAvecParametres(parametres);

    //Si les champs remplis ne conviennent pas
    if(!regex.restaurant(resto))
        throw new Error('Mauvais format des parametres');

    restoDAO.ajouterRestaurant(resto, function(resultat) {
        callback(resultat);
    });
};
