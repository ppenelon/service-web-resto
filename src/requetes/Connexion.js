const clientDAO = require("../donnees/ClientDAO");
const restaurantDAO = require('../donnees/RestaurantDAO');

const regex = require("../assistants/Regex");
const token = require('../assistants/Token');

module.exports = function(parametres, callback) {
	//Verification que la requete contient les bons paramètres
	if(!parametres.hasOwnProperty('login') || !parametres.hasOwnProperty('motDePasse'))
		throw new Error('Parametres manquants');

	//Verification des regex des parametres envoyes
	if((!regex.mail(parametres.login) && !regex.telephone(parametres.login)) || !regex.motDePasse(parametres.motDePasse))
		throw new Error('Mauvais format des parametres');

	//On genere un token pour le client ou le restaurant qui vient de se connecter
	var tokenGenere = token.genererToken(parametres.login);

	//On essaye de connecter le client en premier
	clientDAO.connecterClient(parametres.login, parametres.motDePasse, tokenGenere, function(resultat){
		if(resultat.resultat === 1){
			callback({
				resultat: 1,
				type: 'client',
				token: tokenGenere
			});
		}
		else{
			//Si le client n'est pas connecte on essaye ensuite de connecter le restaurant
			restaurantDAO.connecterRestaurant(parametres.login, parametres.motDePasse, tokenGenere, function(resultat){
				if(resultat.resultat === 1){
					callback({
						resultat: 1,
						type: 'restaurant',
						token: tokenGenere
					});
				}
				else{
					callback({resultat: 0});
				}
			});
		}
	});
};
