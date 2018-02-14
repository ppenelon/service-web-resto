const clientDAO = require("../donnees/ClientDAO");

module.exports = function(parametres, callback){
    clientDAO.recupererClient(parametres, function(resultat){
        callback(resultat);
    });
}