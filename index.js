const express = require('express');
const app = express();

const mysql = require('mysql');
global.bdd = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'resto'
});
global.bdd.connect();

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

app.listen(80);