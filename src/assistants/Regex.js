exports.telephone = function(champ){
    return champ.match(/^[0-9]{10}$/) != null;
}

exports.mail = function(champ){
    return champ.match(/^.+\@.+\..+$/) != null;
}

exports.motDePasse = function(champ){
    return champ.match(/^.{3,16}$/) != null;
}

exports.token = function(champ){
    return champ.match(/^[0-9a-f]{32}$/);
}

exports.client = function(client){
    return this.telephone(client.telephone) && this.mail(client.mail) && this.motDePasse(client.motDePasse) && this.token(client.token);
}