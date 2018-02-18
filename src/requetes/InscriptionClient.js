const Client = require('../modeles/Client');

const clientDAO = require('../donnees/ClientDAO');

const regex = require('../assistants/Regex');
const tokenAssistant = require('../assistants/Token');

module.exports = function(parametres, callback) {
  //Création du nouveau client
  parametres.token = tokenAssistant.genererToken(parametres.mail);
  var client = clientDAO.creeClientAvecParametres(parametres);

  //Si les champs remplis ne conviennent pas
  if(!regex.client(client))
    throw new Error('Mauvais format des parametres');

  clientDAO.ajouterClient(client, function(resultat) {
    callback(resultat);
  });
};
