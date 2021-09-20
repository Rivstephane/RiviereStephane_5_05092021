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
newParagraphes.innerText = "Liste Produit Disponible";
//      integrations des deux elements dans la page html
newTitres.append(newParagraphes);
newSection.append(newTitres);
  
  // ====================================
/*          recuperation de mon catalogue de produit           */

fetch("http://localhost:3000/api/furniture")
  //     conversion des données en JSON
  .then(reponse => reponse.json())

  // ====================================
    /*          integration au document de mon objet         */
  .then(data => {
    items = data;
    //      Creation d'un tableaux de produit dans la page html
    let newUl = document.createElement('ul');
    newUl.classList.add('produit__liste');
    for(let i in items) {
      // selecttion d'un produit
      let item = new produit;
      item = items[i];
      let newLi = document.createElement('li');
      // incorporation de l'id du produit dans html de liaison vers detail
      let newRef = document.createElement('a');
      newLi.classList.add('produit__liste__element');
      newRef.id = item._id;
      newRef.href = "detail.html?id=" + item._id ;
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
      newDescription.innerText = item.description;
      let img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.name;
      let newImg = document.createElement('div');
      newImg.classList.add('imageurl');
      //      mise en place des items
      newImg.appendChild(img);
      newBlock.append(newName);
      newBlock.append(newPrice);
      newRef.append(newImg);
      newRef.append(newBlock);
      newLi.append(newRef);
      newUl.append(newLi);
    }
    newSection.append(newUl);
    body.append(newSection);
    }) 
  .catch(error => {
    newParagraphes = " Erreure de Chargement des produits";
    newDiv.classList.add('erreur');
    newDiv.append(newParagraphes);
    newSection.append(newDiv);
    body.append(newSection);
  })