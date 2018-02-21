const Client = require('../modeles/Client');

const clientDAO = require('../donnees/ClientDAO');

const regex = require('../assistants/Regex');
const tokenAssistant = require('../assistants/Token');

module.exports = function(parametres, callback){
    //Verification que la requete contient les bons paramètres
	// if(!parametres.hasOwnProperty('token'))
    //     throw new Error('Parametres manquants');

    var client = clientDAO.creeClientAvecParametres(parametres);

    //Verification des regex des parametres envoyes
    if(!regex.motDePasse(parametres.motDePasse) || !regex.token(parametres.token))
        throw new Error('Mauvais format des parametres');

    clientDAO.modifierClient(client, parametres.token, function(resultat){
        callback(resultat);
    });
}