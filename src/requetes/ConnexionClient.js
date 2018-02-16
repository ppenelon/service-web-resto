const clientDAO = require("../donnees/ClientDAO");

const regex = require("../assistants/Regex");

module.exports = function(parametres, callback) {
	//Verification que la requete contient les bons paramètres
	if(!parametres.hasOwnProperty('login') || !parametres.hasOwnProperty('motDePasse'))
		throw new Error('Parametres manquants');

	//Verification des regex des parametres envoyes
	if((!regex.mail(parametres.login) && !regex.telephone(parametres.login)) || !regex.motDePasse(parametres.motDePasse))
		throw new Error('Mauvais format des parametres');

	//On essaye de connecter le client
	clientDAO.connecterClient(parametres.login, parametres.motDePasse, function(resultat){
		callback(resultat);
	});
};
