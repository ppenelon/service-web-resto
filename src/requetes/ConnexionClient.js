const clientDAO = require("../donnees/ClientDAO");

const regex = require("../assistants/Regex");

module.exports = function(parametres, callback) {
  if (!regex.telephone(parametres.telephone) || !regex.motDePasse(parametres.motDePasse)) {
    callback({ resultat: -1 });
  }
  clientDAO.recupererClient(parametres, function(resultat) {
    callback(resultat);
  });
};
