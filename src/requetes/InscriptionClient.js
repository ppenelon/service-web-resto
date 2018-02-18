const Client = require("../modeles/Client");

const clientDAO = require("../donnees/ClientDAO");

const regex = require("../assistants/Regex");
const tokenAssistant = require("../assistants/Token");

module.exports = function(parametres, callback) {
  var client = new Client(
    parametres.nom,
    parametres.prenom,
    parametres.telephone,
    parametres.mail,
    parametres.motDePasse,
    null,
    tokenAssistant.genererToken(parametres.mail)
  );

  //Si les champs remplis ne conviennent pas
  if(!regex.client(client)){
    callback({resultat: -1});
    return;
  }

  clientDAO.ajouterClient(client, function(resultat) {
    callback(resultat);
  });
};
