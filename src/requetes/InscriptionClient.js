const Client = require("../modeles/Client");

const clientDAO = require("../donnees/ClientDAO");

const regex = require("../assistants/Regex");
const tokenAssistant = require("../assistants/Token");

module.exports = function(parametres, callback) {
  //Verification que tous les parametres sont la
  if (
    !parametres.hasOwnProperty("nom") ||
    !parametres.hasOwnProperty("prenom") ||
    !parametres.hasOwnProperty("telephone") ||
    !parametres.hasOwnProperty("mail") ||
    !parametres.hasOwnProperty("motDePasse")
  ) {
    throw new Error("Parametres manquants");
  }

  //Verification de la validite des parametres envoyes
  if (
    parametres.nom.length > 150 ||
    parametres.prenom > 150 ||
    !regex.telephone(parametres.telephone) ||
    !regex.mail(parametres.mail) ||
    !regex.motDePasse(parametres.motDePasse)
  ) {
    throw new Error("Mauvais format des parametres");
  }

  //Création du nouveau client
  var client = clientDAO.creeClientAvecParametres(parametres);

  clientDAO.ajouterClient(client, function(resultat) {
    callback(resultat);
  });
};
