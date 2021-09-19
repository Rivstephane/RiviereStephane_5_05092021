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
class produitCommander {
    constructor(_id, quantiter) {
        this._id = _id ;
        this.quantiter = quantiter ;
    }
}
let item = new produit;
let itemCommande = new produitCommander;
let tabPanier= [];
let x = 0;
const recupPanier = localStorage.getItem("tabPanier");
if (recupPanier != null ){
  tabPanier = JSON.parse(recupPanier)
  x = tabPanier.length;
};
let quantiterDesirer = 1;
localStorage.setItem('quantiter', quantiterDesirer );
// ====================================
  //creation de mes element de page
const body = document.querySelector('main');
let newDiv = document.createElement('div');
let newDescriptionTitre = document.createElement('h3');
let newDescriptionTexte = document.createElement('p');

// ====================================
// titres pages
let newSection = document.createElement('div');
newSection.classList.add('detail');
let newTitres = document.createElement('div');
newTitres.classList.add('detail__titres');
let newParagraphes = document.createElement('h1');
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
    let newBlock = document.createElement('div');
    newBlock.classList.add('block');
    let newName = document.createElement('h2');
    newName.classList.add('name');
    newName.innerText = item.name;
    let newDescription = document.createElement('div');
    newDescription.classList.add('description');
    let newDescriptionTitre = document.createElement('h3');
    newDescriptionTitre.innerText = "Description: ";
    let newDescriptionTexte = document.createElement('p');
    newDescriptionTexte.innerText = item.description;
    let img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.name;
    let newImg = document.createElement('div');
    newImg.classList.add('imageurl');
    let newSelecteur = document.createElement('select');
    newSelecteur.classList.add("choixOption");
    let newLabelTitre = document.createElement('h3');
    newLabelTitre.innerHTML = "Chois du vernis:";
    let newLabel = document.createElement('label');
    newLabel.classList.add("selecteurOption");
    // liste des option
    for(let y in item.varnish){
        let newoption = document.createElement('option');
        newSelecteur.appendChild(newoption);
        newoption.textContent = item.varnish[y]; 
    }
    // partie commande
    let newDivCommande = document.createElement('label');
    newDivCommande.classList.add("selecteur");
    newDivCommande.id = 'selecteur';
    let newQuantite = document.createElement('select');
    newQuantite.classList.add("quantiter");
    let newLabelQuantite = document.createElement('h3');
    newLabelQuantite.innerHTML = "Nombre d'exemplaire :";
    newLabel.classList.add("selecteur");
    for(let y = 1; y < 21; y++){
      let newNbexemplaire = document.createElement('option');
      newQuantite.appendChild(newNbexemplaire);
      newNbexemplaire.textContent = " " + y +" "; 
    }
    let newPriceTitre = document.createElement('h3');
    newPriceTitre.innerText ="Prix: ";
    let newPrice = document.createElement('p');
    newPrice.classList.add("prix");
    newPrice.textContent = item.price/100 + " €";
    let blockBouton = document.createElement('div');
    blockBouton.classList.add('block1');
    let boutonValidationCommande = document.createElement('button');
    boutonValidationCommande.classList.add("ajout_panier");
    boutonValidationCommande.innerHTML = "Ajouter et valider la commande";
    let boutonContinuerAchat = document.createElement('button');
    boutonContinuerAchat.classList.add("continuer_achat");
    boutonContinuerAchat.innerHTML = "Ajouter et Poursuivre les achat";
    boutonContinuerAchat.click = "index.html" ;
  
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
    newSection.append(blockBouton);
    blockBouton.append(boutonValidationCommande);
    blockBouton.append(boutonContinuerAchat);
    // calcul du prix de la commande
    const selectElement = document.querySelector('#selecteur');
    selectElement.addEventListener('change', (event) => {
      var prix = document.querySelector('.prix');
      quantiterDesirer = event.target.value;
      localStorage.setItem('quantiter', quantiterDesirer );
      prix.textContent = quantiterDesirer * item.price /100 + " €";
    });
    let produitDansPanier  = false;
    const boutonContinueAchat = document.querySelector('.continuer_achat');
    boutonContinueAchat.addEventListener('click', event => {
      quantiterDesirer = localStorage.getItem('quantiter');
      if(quantiterDesirer == null)quantiterDesirer =1;
      for(let i=0; i<x; i++) {
          if(id == tabPanier[i]._id) {
            var nb1 = parseInt(quantiterDesirer);
            var nb2 = parseInt(tabPanier[i].quantiter);
            tabPanier[i].quantiter= nb1 + nb2 ;
            produitDansPanier = true;
            break;
          }
      }
      if(produitDansPanier == false) {
        itemCommande._id= item._id;
        itemCommande.quantiter= quantiterDesirer;
        tabPanier.push(itemCommande);
      }
      const miseEnFormePanier = JSON.stringify(tabPanier);
      localStorage.setItem('tabPanier', miseEnFormePanier );
      location.href="index.html";
    });
    const boutonValidCommande = document.querySelector('.ajout_panier');
    boutonValidCommande.addEventListener('click', event => {
      quantiterDesirer = localStorage.getItem('quantiter');
      if(quantiterDesirer == null)quantiterDesirer =1;
      for(let i=0; i<x; i++) {
          if(id == tabPanier[i]._id) {
            var nb1 = parseInt(quantiterDesirer);
            var nb2 = parseInt(tabPanier[i].quantiter);
            tabPanier[i].quantiter= nb1 + nb2 ;
            produitDansPanier = true;
            break;
          }
      }
      if(produitDansPanier == false) {
        itemCommande._id= item._id;
        itemCommande.quantiter= quantiterDesirer;
        tabPanier.push(itemCommande);
      }
      const miseEnFormePanier = JSON.stringify(tabPanier);
      localStorage.setItem('tabPanier', miseEnFormePanier );
      location.href="panier.html";
    });
      localStorage.clear();
  })
    .catch(error => {
    newParagraphes = " Erreure de Chargement des produits";
    newDiv.classList.add('erreur');
    newDiv.append(newParagraphes);
    newSection.append(newDiv);
    body.append(newSection);
  })
  