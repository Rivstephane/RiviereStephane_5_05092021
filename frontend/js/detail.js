/*          class produit           */
class produit {
    constructor(id, name,price,liste_choix,description,imageUrl) {
        this.id = id ;
        this.name = name ;
        this.price = price ;
        this.liste_choix = liste_choix;
        this.description = description;
        this.imageUrl = imageUrl;
    }
  }
class instCommande {
    constructor(quantiter,_id) {
        this.id = _id ;
        this.quantiter = quantiter ;
    }
}
let item = new produit;
let listeCommande = new instCommande;
let quantiter = 1;
// ====================================
  //creation de mes element de page
const body = document.querySelector('main');
let newDiv = document.createElement('div');
let newSection = document.createElement('div');
let newTitres = document.createElement('div');
let newParagraphes = document.createElement('h1');
let newBlock = document.createElement('div');
let newName = document.createElement('h2');
let newDescription = document.createElement('div');
let newDescriptionTitre = document.createElement('h3');
let newDescriptionTexte = document.createElement('p');
let newLabelTitre = document.createElement('h3');
let newLabel = document.createElement('label');
let newImg = document.createElement('div');
let img = document.createElement("img");
let newSelecteur = document.createElement('select');
let newDivCommande = document.createElement('label');
let newQuantite = document.createElement('select');
let newLabelQuantite = document.createElement('h3');
let newPriceTitre = document.createElement('h3');
let newPrice = document.createElement('p');
let newBouton = document.createElement('button');

// ====================================
// titres pages
newSection.classList.add('detail');
newTitres.classList.add('detail__titres');
newParagraphes.innerText = "Details produit";
newTitres.append(newParagraphes);
newSection.append(newTitres);
body.append(newSection);

// ====================================
// recuperation de l'id objet dans la page
let params = (new URL(document.location)).searchParams;
var id = params.get("id");
//      recuperation de mon objet dans la basse de données
fetch("http://localhost:3000/api/furniture/"+id)
//     conversion des données en JSON
  .then(reponse => reponse.json())
  .then(data => {
    item = data;
// integration de l'objet a ma page
    newBlock.classList.add('block');
    newName.classList.add('name');
    newName.innerText = item.name;
    newDescription.classList.add('description');
    newDescriptionTitre.innerText = "Description: ";
    newDescriptionTexte.innerText = item.description;
    img.src = item.imageUrl;
    img.alt = item.name;
    newImg.classList.add('imageurl');
    newLabelTitre.innerHTML = "Chois du vernis:";
    newLabel.classList.add("selecteur");
    // liste des option
    for(let y in item.varnish){
        let newoption = document.createElement('option');
        newSelecteur.appendChild(newoption);
        newoption.textContent = item.varnish[y]; 
    }
    // partie commande
    newDivCommande.classList.add("selecteur");
    newDivCommande.id = 'selecteur';
    newQuantite.classList.add("quantiter");
    newLabelQuantite.innerHTML = "Nombre d'exemplaire :";
    newLabel.classList.add("selecteur");
    for(let y = 1; y < 21; y++){
      let newNbexemplaire = document.createElement('option');
      newQuantite.appendChild(newNbexemplaire);
      newNbexemplaire.textContent = " " + y +" "; 
    }
    newPriceTitre.innerText ="Prix: ";
    newPrice.classList.add("prix");
    newPrice.textContent = item.price/100 + " €";
    newBouton.classList.add("ajout_panier");
    newBouton.innerHTML = "Valider Commande";
  
    //      mise en place des element de la page
    newSection.append(newName);
    newImg.appendChild(img);
    newSection.append(newImg);
    newDescription.append(newDescriptionTitre);
    newDescription.append(newDescriptionTexte);
    newSection.append(newDescription);
    newLabel.append(newLabelTitre);
    newLabel.append(newSelecteur);
    newBlock.append(newLabel);
    newDiv.append(newPriceTitre);
    newDiv.append(newPrice);
    newDivCommande.append(newLabelQuantite);
    newDivCommande.append(newQuantite);
    newBlock.append(newDivCommande);
    newBlock.append(newDiv);
    newSection.append(newBlock);
    newSection.append(newBouton);
    // calcul du prix de la commande
    const selectElement = document.querySelector('#selecteur');
    selectElement.addEventListener('change', (event) => {
      var prix = document.querySelector('.prix');
      quantiter = event.target.value;
      localStorage.setItem('quantiter', quantiter );
      prix.textContent = quantiter * item.price /100 + " €";
    });
    const button = document.querySelector('.ajout_panier');
    button.addEventListener('click', event => {
      let numeroCommande = localStorage.getItem('numeroCommande');
      numeroCommande = numeroCommande +1;
      quantiter = localStorage.getItem('quantiter');
      var x = numeroCommande.length;
      let exist = false;
      //---Initialisation de la variable "exist"--//
      for(let i=0; i<=x; i++) {
        var contenuPanier = localStorage.getItem('id'+"--"+i);
        var contenuquantiter = localStorage.getItem('quantiter'+"--"+i  );
        var varia = varia +1;
          if(item._id == contenuPanier) {
            quantiter = quantiter + contenuquantiter;
            localStorage.setItem('numeroCommande', numeroCommande );
            localStorage.setItem('id'+"--"+x, id );
            localStorage.setItem('quantiter'+"--"+x, quantiter );
              exist = true;
              break;
          }
      }
      if(exist==false) {
        localStorage.setItem('numeroCommande', numeroCommande );
        localStorage.setItem('id'+"--"+x, id );
        localStorage.setItem('quantiter'+"--"+x, quantiter );
      }
      location.href="panier.html";
    });
  })
    .catch(error => {
    newParagraphes = " Erreure de Chargement des produits";
    newDiv.classList.add('erreur');
    newDiv.append(newParagraphes);
    newSection.append(newDiv);
    body.append(newSection);
  })
  