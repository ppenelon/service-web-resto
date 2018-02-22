const Restaurant = require('../modeles/Restaurant');

const restaurantDAO = require('../donnees/RestaurantDAO');

const regex = require('../assistants/Regex');
const convertirAdresse = require('../assistants/ConvertirAdresse');

module.exports = function(parametres, callback){
    //Verification que tous les parametres sont la
    if(!parametres.hasOwnProperty('token') || !parametres.hasOwnProperty('nom') || !parametres.hasOwnProperty('adresse') || 
        !parametres.hasOwnProperty('telephone') || !parametres.hasOwnProperty('mail') || !parametres.hasOwnProperty('motDePasse') ||
        !parametres.hasOwnProperty('description'))
        throw new Error('Parametres manquants')

    //Verification de la validite des parametres envoyes
    if(!regex.token(parametres.token) || parametres.nom.length > 150 || parametres.adresse.length > 300 ||
        !regex.telephone(parametres.telephone) || !regex.mail(parametres.mail) || !regex.motDePasse(parametres.motDePasse))
        throw new Error('Mauvais format des parametres');

    //On regarde si le numéro et le mail n'est pas deja utilise
    restaurantDAO.restaurantExisteExclureToken(parametres.telephone, parametres.mail, parametres.token, function(existe){
        if(!existe){
            //On trouve la longitude et la latitude de l'adresse
            convertirAdresse.convertir(parametres.adresse, function(coordonnees){
                //On cree le nouveau restaurant modifie
                var restaurantModifie = new Restaurant(
                    null,
                    parametres.nom,
                    parametres.description,
                    parametres.adresse,
                    coordonnees.latitude,
                    coordonnees.longitude,
                    parametres.telephone,
                    parametres.mail,
                    parametres.motDePasse
                );

                //On tente de modifier le restaurant
                restaurantDAO.modifierRestaurant(restaurantModifie, parametres.token, function(resultat){
                    callback(resultat);
                });
            });
        }
        else{
            callback({resultat: 0});
        }
    });
}