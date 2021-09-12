
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
/*const cameras = [
  {
    "lenses": [
      "35mm 1.4",
      "50mm 1.6"
    ],
    "_id": "5be1ed3f1c9d44000030b061",
    "name": "Zurss 50S",
    "price": 49900,
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "vcam_1.jpg"
  },
  {
    "lenses": [
      "50mm 1.8",
      "60mm 2.8",
      "24-60mm 2.8/4.5"
    ],
    "_id": "5be1ef211c9d44000030b062",
    "name": "Hirsch 400DTS",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "price": 309900,
    "imageUrl": "vcam_2.jpg"
  },
  {
    "lenses": [
      "25mm 4.5"
    ],
    "_id": "5be9bc241c9d440000a730e7",
    "name": "Franck JS 105",
    "price": 209900,
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "vcam_3.jpg"
  },
  {
    "lenses": [
      "50mm 1.7",
      "35mm 1.4"
    ],
    "_id": "5be9c4471c9d440000a730e8",
    "name": "Kuros TTS",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "price": 159900,
    "imageUrl": "vcam_4.jpg"
  },
  {
    "lenses": [
      "50mm 1.4",
      "35mm 1.8",
      "28-200mm 2.8/4.5"
    ],
    "_id": "5be9c4c71c9d440000a730e9",
    "name": "Katatone",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "price": 59900,
    "imageUrl": "vcam_5.jpg"
  }
];*/
// ====================================
function listeProduits() {
/*          recuperation de mon catalogue de produit           */

fetch("http://localhost:3000/api/furniture")
 //     conversion des données en JSON
.then(reponse => reponse.json())
.then(data => {
    items = data;

// ====================================
    
    /*          integration au document de mon objet         */

const body = document.querySelector('main');

//      Creation d'une section
let newSection = document.createElement('div');
newSection.classList.add('produit');

//      Creation du titres
let newTitres = document.createElement('div');
newTitres.classList.add('produit__titres');
let newParagraphes = document.createElement('p');
newParagraphes.innerText = "Liste Produit Disponible";
newTitres.append(newParagraphes);
newSection.append(newTitres);

//      Creation d'un tableaux
let newUl = document.createElement('ul');
newUl.classList.add('produit__liste');
  for(let i in items) {
    let item = new produit;
    item = items[i];
    let newLi = document.createElement('li');
    newLi.classList.add('produit__liste__element');
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
    img.src = "../images/"+item.imageUrl;
    let newImg = document.createElement('div');
    newImg.classList.add('imageurl');
    newImg.appendChild(img);
    newBlock.append(newName);
    newBlock.append(newPrice);
    newLi.append(newBlock);
    newLi.append(newDescription);
    newLi.append(newImg);
    newUl.append(newLi);
  }
  newSection.append(newUl);
  body.append(newSection);
  })
  .catch(error => {
      console.warn("Erreur de chargement !", error);
  })
}