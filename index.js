const express = require('express');
const app = express();

app.get('/inscriptionClient/:client', function(requete, reponse){
    reponse.setHeader('Content-Type', 'application/json');

    //Récupération du client
    var client = JSON.parse(requete.params.client);
    
    //Envoie du client comme confirmation
    reponse.end(JSON.stringify(client));
});

app.listen(80);