const Client = require("../modeles/Client");

const clientDAO = require("../donnees/ClientDAO");

const regex = require("../assistants/Regex");
const tokenAssistant = require("../assistants/Token");

module.exports = function(parametres, callback) {
	//Verification que tous les parametres sont la
	if (!parametres.hasOwnProperty("nom") ||
		!parametres.hasOwnProperty("prenom") ||
		!parametres.hasOwnProperty("telephone") ||
		!parametres.hasOwnProperty("mail") ||
		!parametres.hasOwnProperty("motDePasse") ||
		!parametres.hasOwnProperty("token")) {
		throw new Error("Parametres manquants");
	}

	//Verification de la validite des parametres envoyes
	if (parametres.nom.length > 150 ||
		parametres.prenom.length > 150 ||
		!regex.telephone(parametres.telephone) ||
		!regex.mail(parametres.mail) ||
		(!regex.motDePasse(parametres.motDePasse) && parametres.motDePasse != "") ||
		!regex.token(parametres.token)) {
		throw new Error("Mauvais format des parametres");
	}

	clientDAO.clientExisteExclureToken(parametres.telephone, parametres.mail, parametres.token, function(existe){
		if(!existe){
			var clientModifie = clientDAO.creeClientAvecParametres(parametres);

			clientDAO.modifierClient(clientModifie, parametres.token, function(resultat){
				callback(resultat);
			});
		}
		else{
			callback({resultat: 0});
		}
	});
};
