exports.telephone = function(regex){
    return regex.match(/^[0-9]{10}$/) != null;
}

exports.mail = function(regex){
    return regex.match(/^.+\@.+\..+$/) != null;
}

exports.motDePasse = function(regex){
    return regex.match(/^.{3,16}$/) != null;
}

exports.client = function(client){
    return this.telephone(client.telephone) || this.mail(client.mail) || this.motDePasse(client.motDePasse);
}