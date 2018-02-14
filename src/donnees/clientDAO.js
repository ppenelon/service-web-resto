exports.ajouterClient = function(client){
    global.db.collection("client").insert(client);
};