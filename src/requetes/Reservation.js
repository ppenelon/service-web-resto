const reservationDAO = require('../donnees/ReservationDAO');

const regex = require('../assistants/Regex');

module.exports = function(parametres, callback){
    //Verification que tous les parametres sont la
    if(!parametres.hasOwnProperty('date') || !parametres.hasOwnProperty('heure') ||
        !parametres.hasOwnProperty('nombrePersonnes') || !parametres.hasOwnProperty('idRestaurant') || !parametres.hasOwnProperty('token'))
        throw new Error('Parametres manquants');

    //Verification de la validite des parametres envoyes
    if(!regex.date(parametres.date) || !regex.heure(parametres.heure) ||
        isNaN(parametres.nombrePersonnes) || isNaN(parametres.idRestaurant) || !regex.token(parametres.token))
        throw new Error('Mauvais format des parametres');

    //On essaye d'ajouter la reservation
    reservationDAO.ajouterReservation(parametres.date, parametres.heure, parametres.nombrePersonnes, parametres.idRestaurant, parametres.token, function(resultat){
        callback(resultat);
    });
}