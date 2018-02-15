const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017'
global.bdd;

MongoClient.connect(mongoUrl, function(erreur, client){
	if(erreur)throw erreur;
	global.bdd = client.db("resto");
	app.listen(80);
});

app.get('/:requete/:parametres', function(requete, reponse){
	try {
		var module = require(require.resolve(`./src/requetes/${requete.params.requete}`));

		reponse.setHeader('Content-Type', 'application/json');
		module(JSON.parse(requete.params.parametres), function(resultat){
			reponse.end(JSON.stringify(resultat));
		});
	}
	catch(e) {
	    reponse.status(400).send('Bad Request');
	}
});

