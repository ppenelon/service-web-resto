const express = require('express');
const app = express();

app.get('/:requete/:parametres', function(requete, reponse){
	try {
		var module = require(require.resolve(`./src/requetes/${requete.params.requete}`));

		reponse.setHeader('Content-Type', 'application/json');
		reponse.end(JSON.stringify(module(requete.params.parametres)));
	}
	catch(e) {
	    reponse.status(400).send('Bad Request');
	}
});

app.listen(80);