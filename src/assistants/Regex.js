exports.telephone = function(champ){
    return champ.match(/^[0-9]{10}$/) != null;
}

exports.mail = function(champ){
    return champ.match(/^.+\@.+\..+$/) != null;
}

exports.motDePasse = function(champ){
    return champ.match(/^.{3,16}$/) != null;
}

exports.client = function(client){
    return this.telephone(client.telephone) && this.mail(client.mail) && this.motDePasse(client.motDePasse);
}

exports.restaurant = function(restaurant){
    return this.telephone(restaurant.telephone) && this.mail(restaurant.mail) && this.motDePasse(restaurant.motDePasse);
}

exports.token = function(champ){
    return champ.match(/^[0-9a-f]{32}$/) != null;
}

exports.date = function(champ){
    return champ.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) != null;
}

exports.heure = function(champ){
    return champ.match(/^[0-9]{2}:[0-9]{2}$/) != null;
}

exports.codeFidelite = function(champ){
    return this.token(champ);
}