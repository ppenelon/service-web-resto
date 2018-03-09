var clientDAO = require('../donnees/ClientDAO');

var regex = require('../assistants/Regex');
var generateurCode = require('../assistants/GenerateurCode');

module.exports = function(parametres, callback){
    //Verification que tous les parametres sont la
    if(!parametres.hasOwnProperty('token'))
        throw new Error('Parametres manquants');

    //Verification de la validite des parametres envoyes
    if(!regex.token(parametres.token))
        throw new Error('Mauvais format des parametres');

    //On récupère l'ID du client, on calcule son code de fidélité via l'assitant, on l'ajoute dans la base de données et on retourne le code
    clientDAO.recupererIdClientAvecToken(parametres.token, function(resultat){
        if(resultat.resultat === 0){
            callback({resultat: 0});
        }
        else{
            var idClient = resultat.idClient;
            var codeGenere = generateurCode.genererCodeClient(idClient);
            clientDAO.definirCodeFidelite(codeGenere, idClient, function(resultat){
                if(resultat.resultat === 0){
                    callback({resultat: 0});
                }
                else{
                    callback({
                        resultat: 1,
                        code: codeGenere
                    });
                }
            });
        }
    });
}