exports.recupererReservationClientAvecToken = function(tokenClient, callback){
    var requete = `SELECT DATE(reservation.date) AS date, DATE_FORMAT(reservation.date, "%H:%i") AS heure, reservation.nombrePersonnes AS nombrePersonnes, restaurant.nom AS nomRestaurant, restaurant.adresse AS adresseRestaurant
                   FROM reservation 
                   JOIN client ON reservation.idClient = client.idClient
                   JOIN restaurant ON restaurant.idRestaurant = reservation.idRestaurant
                   WHERE client.token LIKE ?
                   AND DATE(reservation.date) >= CURRENT_DATE()
                   AND DATE(reservation.date) < DATE_ADD(CURRENT_DATE(), INTERVAL 7 DAY)
                   ORDER BY reservation.date ASC`;
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

exports.recupererReservationRestaurantAvecToken = function(tokenRestaurant, callback){
    var requete = `SELECT DATE_FORMAT(reservation.date, "%H:%i") AS heure, reservation.nombrePersonnes AS nombrePersonnes, CONCAT(client.nom,' ',client.prenom) AS nomClient, client.telephone AS telephoneClient
                   FROM reservation
                   JOIN restaurant ON reservation.idRestaurant = restaurant.idRestaurant
                   JOIN client ON client.idClient = reservation.idClient
                   WHERE restaurant.token LIKE ?
                   AND DATE(reservation.date) = CURRENT_DATE()
                   ORDER BY reservation.date ASC`;

    var donnees = [tokenRestaurant];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur){
            callback({resultat: 0});
        }
        else{
            callback({
                resultat: 1,
                reservations: resultats
            })
        }
    });
}

exports.ajouterReservation = function(date, heure, nombrePersonnes, idRestaurant, tokenClient, callback){
    var requete = `INSERT INTO reservation
                   VALUES ((SELECT idClient FROM client WHERE token LIKE ? LIMIT 1), ?, ?, ?)`;

    var donnees = [tokenClient, idRestaurant, (date + ' ' + heure), nombrePersonnes];

    global.bdd.query(requete, donnees, function(erreur, resultats, champs){
        if(erreur || resultats.affectedRows === 0){
            callback({resultat: 0});
        }
        else{
            callback({resultat: 1});
        }
    });
}