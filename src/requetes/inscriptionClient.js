
const Client = require('../modeles/Client');

const clientDAO = require('../donnees/ClientDAO');

module.exports = function(parametres){
    clientDAO.ajouterClient(new Client(
        parametres.nom, 
        parametres.prenom,
        parametres.telephone, 
        parametres.mail,
        parametres.motDePasse));
    return {
        resultat: 1
    }
};