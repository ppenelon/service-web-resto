const Client = require('../modeles/Client');

const clientDAO = require('../donnees/ClientDAO');

const regex = require('../assistants/Regex');

module.exports = function(parametres, callback){
    //Verification que la requete contient les bons paramètres
	// if(!parametres.hasOwnProperty('token'))
    //     throw new Error('Parametres manquants');

    var client = new Client(
        parametres.nom,
        parametres.prenom,
        null,
        null,
        parametres.motDePasse,
        null,
        parametres.token
      );    

    //Verification des regex des parametres envoyes
    if(!regex.motDePasse(parametres.motDePasse) || !regex.token(parametres.token))
        throw new Error('Mauvais format des parametres');

    clientDAO.modifierClientAvecToken(client, function(resultat){
        callback(resultat);
    });
}