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
let item = new produit;
let quantiter;
var panier = [];
const paniers = localStorage.getItem("panier");
if (paniers != null ) panier = JSON.parse(paniers);
// ====================================
//creation de mes element de page
const body = document.querySelector('main');
const sectionTabCommande = document.getElementById('tableauxCommandeproduit');
let newDiv = document.createElement('div');
let newSection = document.createElement('div');
let newTitres = document.createElement('div');
let newParagraphes = document.createElement('h1');
let newImg = document.createElement('div');
let newQuantite = document.createElement('h3');
let newName = document.createElement('h3');
let newPrice = document.createElement('h3');
let newBlock = document.createElement('div');
let newInfo = document.createElement('h1');

// ====================================
// recuperation de la commande dans local storage
  let numeroCommande = localStorage.getItem('numeroCommande');
  let id;
  let Quantiter;
  let testP = [];
  let testdiv = [];
  let y = 0;
  fetch("http://localhost:3000/api/furniture")
  //     conversion des données en JSON
    .then(reponse => reponse.json())
    .then(data => {
      items = data;
      
    for(i = 0; i<= numeroCommande.length; i++){
      id = localStorage.getItem('id'+"--"+i);
      quantiter = localStorage.getItem('quantiter'+"--"+i);
      newImg.classList.add('imageurl');
      newQuantite.classList.add("quantiter");
      newQuantite.innerText = "quantiter";
      newName.classList.add('name');
      newName.innerText = "Nom";
      newPrice.classList.add('prix');
      newPrice.innerText = " Prix";
      newBlock.classList.add('tabCommande');
      newBlock.append(newImg);
      newBlock.append(newName);
      newBlock.append(newQuantite);
      newBlock.append(newPrice);
      sectionTabCommande.append(newBlock);
      if(id != null){
        for( let j in items){
          if(id == items[j]._id){
            item = items[j];
            let newImg = document.createElement('div');
            let img = document.createElement("img");
            img.src = item.imageUrl;
            img.alt = item.name;
            newImg.classList.add('imageurl');
            let newQuantite = document.createElement('p');
            newQuantite.classList.add("quantiter");
            newQuantite.innerText = quantiter;
            let newName = document.createElement('h2');
            newName.classList.add('name');
            newName.innerText = item.name;
            let newPrice = document.createElement('p');
            newPrice.classList.add('prix');
            newPrice.innerText = quantiter * item.price/100 +" € ";
            let newBlock = document.createElement('div');
            newBlock.classList.add('tabCommande');
            let buttonSupPanier = document.createElement('button');
            buttonSupPanier.classList.add('buttonSupPanier');
            buttonSupPanier.value = "id"+"--"+y;
            buttonSupPanier.innerText = " Suprimer ";
            newImg.appendChild(img);
            newBlock.append(newImg);
            newBlock.append(newName);
            newBlock.append(newQuantite);
            newBlock.append(newPrice);
            newBlock.append(buttonSupPanier);
            sectionTabCommande.append(newBlock);
          }
        }
      }
    }
  })
  .catch(error => {
    newInfo.innerHTML = " Panier vide";
    sectionTabCommande.append(newInfo);
  })