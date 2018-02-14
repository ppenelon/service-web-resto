const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017/resto'
global.db;

MongoClient.connect(mongoUrl, function(erreur, database){
	if(erreur)throw erreur;
	global.db = database;
	app.listen(80);
});

app.get('/:requete/:parametres', function(requete, reponse){
	try {
		var module = require(require.resolve(`./src/requetes/${requete.params.requete}`));

		reponse.setHeader('Content-Type', 'application/json');
		reponse.end(JSON.stringify(module(JSON.parse(requete.params.parametres))));
	}
	catch(e) {
	    reponse.status(400).send('Bad Request');
	}
});