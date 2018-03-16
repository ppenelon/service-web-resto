const clientDAO = require('../donnees/ClientDAO');
const fideliteDAO = require('../donnees/FideliteDAO');

const regex = require('../assistants/Regex');

module.exports = function(parametres, callback){
    //Verification que tous les parametres sont la
    if(!parametres.hasOwnProperty('codeFidelite') || !parametres.hasOwnProperty('token') || !parametres.hasOwnProperty('points'))
        throw new Error('Parametres manquants');

    //Verification de la validite des parametres envoyes
    if(!regex.codeFidelite(parametres.codeFidelite) || !regex.token(parametres.token) || isNaN(parametres.points))
        throw new Error('Mauvais format des parametres');

    //On essaye de modifier les points du client
    fideliteDAO.modifierPoints(parametres.codeFidelite, parametres.token, parametres.points, function(resultat){
        if(resultat.resultat === 0){
            callback({resultat: 0});
        }
        else{
            clientDAO.supprimerCodeFidelite(parametres.codeFidelite, function(resultat2){
                callback({resultat: resultat2.resultat});
            });
        }
    });
}