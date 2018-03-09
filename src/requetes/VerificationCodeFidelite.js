const fideliteDAO = require('../donnees/FideliteDAO');

const regex = require('../assistants/Regex');

module.exports = function(parametres, callback){
    //Verification que tous les parametres sont la
    if(!parametres.hasOwnProperty('codeFidelite') || !parametres.hasOwnProperty('token'))
        throw new Error('Parametres manquants');

    //Verification de la validite des parametres envoyes
    if(!regex.codeFidelite(parametres.codeFidelite) || !regex.token(parametres.token))
        throw new Error('Mauvais format des parametres');

    //On regarde le nombre de points du client dans ce restaurant, si c'est la première fois on crée un compte de fidélité dans ce restaurant avec 0 point.
    fideliteDAO.verifierClientInscritDansRestaurant(parametres.codeFidelite, parametres.token, function(resultat){
        if(resultat.resultat === 0){
            callback({resultat: 0});
        }
        else{
            //Le client est déjà venu dans ce restaurant
            //Sinon c'est la première fois
            if(resultat.premiereVisite){
                fideliteDAO.creerCompteFideliteClient(parametres.codeFidelite, parametres.token, function(resultat){
                    if(resultat.resultat === 0){
                        callback({resultat: 0});
                    }
                    else{
                        callback({
                            resultat: 1,
                            points: 0
                        });
                    }
                });
            }
            else{
                fideliteDAO.recupererPointsClient(parametres.codeFidelite, parametres.token, function(resultat){
                    if(resultat.resultat === 0){
                        callback({resultat: 0});
                    }
                    else{
                        callback({
                            resultat: 1,
                            points: resultat.points
                        });
                    }
                });
            }
        }
    });
}