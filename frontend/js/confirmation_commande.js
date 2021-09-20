//          initialisation instance
const body = document.querySelector('.confirmation');
//          recuperation de l'id objet dans la page 
let params = (new URL(document.location)).searchParams;
var id = params.get("id");
var prenom = params.get("prenom");
var totalPrix = params.get("totalPrix");
//          integrations dans le html de la page
let titresValidation = document.createElement('h1');
titresValidation.innerText = "Commande Validée";
let divValidation = document.createElement('div');
let paragraphesValidation = document.createElement('p');
paragraphesValidation.innerText = "Merci pour votre commande " + prenom + " La commande n° :" + id + " et d'un montant de : " + totalPrix + "€";
divValidation.append(titresValidation);
divValidation.append(paragraphesValidation);
body.append(divValidation);
localStorage.clear();