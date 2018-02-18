const http = require('http');

exports.convertir = function(adresse, callback){
    http.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${adresse.replace(' ', '+')}`, function(reponse){
        var buffers = [];
        reponse
            .on('data', function (reponse) {
                buffers.push(reponse);
            })
            .on('end', function(){
                var resultat = JSON.parse(Buffer.concat(buffers).toString());
                if(resultat.status == "OK"){
                    var latitude = resultat.results[0].geometry.location.lat;
                    var longitude = resultat.results[0].geometry.location.lng;
                    callback({
                        latitude: latitude, 
                        longitude: longitude
                    });
                }
            }); 
    });
};
