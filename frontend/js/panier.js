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
// ====================================
//      mise en page du main du html
const body = document.querySelector('main');
let newDiv = document.createElement('div');
//      Creation d'une section
let newSection = document.createElement('div');
newSection.classList.add('produit');
//      Creation du titres de la page html
let newTitres = document.createElement('div');
newTitres.classList.add('produit__titres');
//      Creation d'un element type paragraphe dans la page html
let newParagraphes = document.createElement('p');
newParagraphes.innerText = "Details produit";
//      integrations des deux elements dans la page html
newTitres.append(newParagraphes);
newSection.append(newTitres);
  /*          recuperation de l'id de mon produit           */
  let params = (new URL(document.location)).searchParams;
  //---Récupération de l'Url de l'objet--//
  var id = params.get("id");
  body.append(newSection);

  //      affichage dans la page html du produit
fetch("http://localhost:3000/api/furniture")
//     conversion des données en JSON
.then(reponse => reponse.json())

// ====================================
  /*          integration au document de mon objet         */
.then(data => {
  items = data;
  //      Creation d'un tableaux de produit dans la page html
  for(let i in items) {
  let item = new produit;
  item = items[i];
    if(item._id == id){
      let newBlock = document.createElement('div');
      newBlock.classList.add('block');
      let newName = document.createElement('div');
      newName.classList.add('name');
      newName.innerText = item.name;
      let newPrice = document.createElement('div');
      newPrice .classList.add('price');
      newPrice.innerText = item.price/100 + " €";
      let newDescription = document.createElement('div');
      newDescription.classList.add('description');
      let newDescriptionTitre = document.createElement('h2');
      let newDescriptionTexte = document.createElement('p');
      newDescriptionTitre.innerText = "Description: ";
      newDescriptionTexte.innerText = item.description;
      let img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.name;
      let newImg = document.createElement('div');
      newImg.classList.add('imageurl');
      let newLabel = document.createElement('label');
      newLabel.innerHTML = "Chois du vernis:";
      newLabel.name = "choixOption";
      newLabel.classList.add("selecteur");
      let newSelecteur = document.createElement('select');
      // liste des option
      for(let y in item.varnish){
          var value = item.varnish[y];
          let newoption = document.createElement('option');
          newSelecteur.appendChild(newoption); //ajoute l'option dans notre balise select
          newoption.textContent = value; //affichera le texte dans les différentes options
      }
      // bouton de mise dans le panier
      let newCommande = document.createElement('div');
      newCommande.classList.add("panier");
      newCommande.innerHTML = "Commande";
      let newQuantite = document.createElement('input');
      newQuantite.classList.add("quantiter");
      newQuantite.innerHTML = "combien d'exemplaire";
      let newBouton = document.createElement('buton');
      newBouton.classList.add("ajout_panier");
      newCommande.innerHTML = "Valider Commande";

  //      mise en place des items
  newImg.appendChild(img);
  newBlock.append(newName);
  newBlock.append(newPrice);
  newSection.append(newImg);
  newSection.append(newBlock);
  newDescription.append(newDescriptionTitre);
  newDescription.append(newDescriptionTexte);
  newSection.append(newDescription);
  newLabel.append(newSelecteur);
  newSection.append(newLabel);
  newCommande.append(newQuantite);
  newCommande.append(newBouton);
  newSection.append(newBouton);
  }}
  })
  .catch(error => {
    newParagraphes = " Erreure de Chargement des produits";
    newDiv.classList.add('erreur');
    newDiv.append(newParagraphes);
    newSection.append(newDiv);
    body.append(newSection);
  })