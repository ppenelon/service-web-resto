const Client = require("../modeles/Client");

const clientDAO = require("../donnees/ClientDAO");

const regex = require("../assistants/Regex");

module.exports = function(parametres, callback) {
  var client = new Client(
    parametres.nom,
    parametres.prenom,
    parametres.telephone,
    parametres.mail,
    parametres.motDePasse
  );

  if(!regex.client(client)){
    callback({resultat: -1});
  }

  clientDAO.ajouterClient(client, function(resultat) {
    callback(resultat);
  });
};
