const clientDAO = require('../donnees/ClientDAO');

const regex = require('../assistants/Regex');

module.exports = function(parametres, callback){
    //Verification que tous les parametres sont la
    if(!parametres.hasOwnProperty('token'))
        throw new Error('Parametres manquants');

    //Verification de la validite des parametres envoyes
    if(!regex.token(parametres.token))
        throw new Error('Mauvais format des parametres');

    //On essaye de récupérer le client en fonction de son token
    clientDAO.recupererClientAvecToken(parametres.token, function(resultat){
        callback(resultat);
    });
}