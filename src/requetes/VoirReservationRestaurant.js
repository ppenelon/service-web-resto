const reservationDAO = require('../donnees/ReservationDAO');

const regex = require('../assistants/Regex');

module.exports = function(parametres, callback){
    //Verification que la requete contient les bons paramètres
	if(!parametres.hasOwnProperty('token'))
        throw new Error('Parametres manquants');

    //Verification des regex des parametres envoyes
    if(!regex.token(parametres.token))
        throw new Error('Mauvais format des parametres');

    //On essaye de recuperer les reservations
    reservationDAO.recupererReservationRestaurantAvecToken(parametres.token, function(resultat){
        callback(resultat);
    });
}