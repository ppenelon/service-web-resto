module.exports = function Restaurant(idRestaurant, nom, description, adresse, latitude, longitude, telephone, mail, motDePasse){
    this.idRestaurant = idRestaurant;
    this.nom = nom;
    this.description = description;
    this.adresse = adresse;
    this.latitude = latitude;
    this.longitude = longitude;
    this.telephone = telephone;
    this.mail = mail;
    this.motDePasse = motDePasse;
}