const Client = require("../modeles/Client");

const clientDAO = require("../donnees/ClientDAO");

module.exports = function(parametres, callback) {
  var client = new Client(
    parametres.nom,
    parametres.prenom,
    parametres.telephone,
    parametres.mail,
    parametres.motDePasse
  );

  clientDAO.ajouterClient(client, function(resultat) {
    callback(resultat);
  });
};
