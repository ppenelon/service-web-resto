exports.ajouterClient = function(client){
    global.bdd.collection("client").insert(client);
};