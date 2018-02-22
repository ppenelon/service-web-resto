const resto = require('../modeles/Restaurant');

const restoDAO = require('../donnees/RestaurantDAO');

const regex = require('../assistants/Regex');
const tokenAssistant = require('../assistants/Token');
const convertirAdresse = require('../assistants/ConvertirAdresse');

module.exports = function(parametres, callback) {
    // Vérification des paramètres

    if(
        !parametres.hasOwnProperty("nom") ||
        !parametres.hasOwnProperty("adresse") ||
        !parametres.hasOwnProperty("telephone") ||
        !parametres.hasOwnProperty("mail") ||
        !parametres.hasOwnProperty("description") ||
        !parametres.hasOwnProperty("motDePasse")
    ) {
        throw new Error("Parametres manquants");
    }

    if(
        parametres.nom.length > 150 ||
        parametres.adresse.length > 150 ||
        !regex.telephone(parametres.telephone) ||
        !regex.mail(parametres.mail) ||
        !regex.motDePasse(parametres.motDePasse)
    ){
        throw new Error("Mauvais format des paramètres");
    }

    convertirAdresse.convertir(parametres.adresse, function(position){
        parametres.latitude = position.latitude;
        parametres.longitude = position.longitude;
        
        var resto = restoDAO.creeRestaurantAvecParametres(parametres);

        restoDAO.ajouterRestaurant(resto, function(resultat) {
            callback(resultat);
        });
    });
};
