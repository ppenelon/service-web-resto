exports.recupererReservationClientAvecToken = function(tokenClient, callback){
    var requete = `SELECT DATE(reservation.date) AS date, TIME(reservation.date) AS heure, reservation.nombrePersonnes AS nombrePersonnes, restaurant.nom AS nomRestaurant, restaurant.adresse AS adresseRestaurant
                   FROM reservation 
                   JOIN client ON reservation.idClient = client.idClient
                   JOIN restaurant ON restaurant.idRestaurant = reservation.idRestaurant
                   WHERE client.token LIKE ?
                   AND DATE(reservation.date) >= DATE(NOW())
                   AND DATE(reservation.date) < DATE(DATE_ADD(NOW(), INTERVAL 7 DAY))`;
    var donnees = [tokenClient];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur){
            callback({resultat: 0});
        }
        else{
            callback({
                resultat: 1,
                reservations: resultats
            });
        }
    });
}