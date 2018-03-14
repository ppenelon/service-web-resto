const md5 = require('md5');

//Alphabet disponible pour convertir l'ID du client
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//Fonction qui génère un code client pour le système de fidélité en fonction de son ID (ID max : tailleAlphabet * tailleAlphabet * tailleAlphabet * tailleAlphabet)
//Retourne une chaine de la forme O-O-O-O (Où O est un élément de l'alphabet ci-dessus et - est un chiffre)
exports.genererCodeClient = function(idClient){
    //On décrémente l'ID du client pour commencer la conversion à 1 au lieu de 0
    idClient--;
    //On initialise la chaine finale qu'on retournera ainsi qu'une variable qui contiendra la lettre de l'alphabet associée au chiffre convertit
    var chaineFinale = "";
    var lettre;
    //On calcule X (O-O-O-X)
    lettre = alphabet.charAt(idClient % alphabet.length);
    chaineFinale = lettre + chaineFinale;
    //On ajoute un chiffre aléatoire de 0 à 9 à l'endroit _ (O-O-O_O)
    chaineFinale = Math.round(Math.random() * 9) + chaineFinale;
    //On calcule X (O-O-X-O)
    lettre = alphabet.charAt(Math.floor(idClient / alphabet.length) % alphabet.length);
    chaineFinale = lettre + chaineFinale;
    //On ajoute un chiffre aléatoire de 0 à 9 à l'endroit _ (O-O_O-O)
    chaineFinale = Math.round(Math.random() * 9) + chaineFinale;
    //On calcule X (O-X-O-O)
    lettre = alphabet.charAt(Math.floor(idClient / (alphabet.length * alphabet.length)) % alphabet.length);
    chaineFinale = lettre + chaineFinale;
    //On ajoute un chiffre aléatoire de 0 à 9 à l'endroit _ (O_O-O-O)
    chaineFinale = Math.round(Math.random() * 9) + chaineFinale;
    //On calcule X (X-O-O-O)
    lettre = alphabet.charAt(Math.floor(idClient / (alphabet.length * alphabet.length * alphabet.length)) % alphabet.length);
    chaineFinale = lettre + chaineFinale;
    //On retourne le résultat cryptée
    return md5(new Date().getTime() + chaineFinale);
}