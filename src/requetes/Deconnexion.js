const clientDAO = require('../donnees/ClientDAO');
const restaurantDAO = require('../donnees/RestaurantDAO');

const regex = require('../assistants/Regex');

module.exports = function(parametres, callback){
    //Verification que tous les parametres sont la
    if(!parametres.hasOwnProperty('token'))
        throw new Error('Parametres manquants')

    //Verification de la validite des parametres envoyes
    if(!regex.token(parametres.token))
        throw new Error('Mauvais format des parametres');

    //On essaye de deconnecter le client en premier
	clientDAO.deconnecterClient(parametres.token, function(resultat){
        if(resultat.resultat === 1){
            callback({resultat: 1});
        }
        else{
            //Si cela ne correspondait a aucun client, on essaye de deconnecter un restaurant
            restaurantDAO.deconnecterRestaurant(parametres.token, function(resultat){
                callback(resultat);
            });
        }
    });
}