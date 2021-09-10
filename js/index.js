
/*          class produit           */
class produit {
    constructor(id, name,price,listeChoix,description,imageUrl) {
        this.id = id ;
        this.name = name ;
        this.price = price ;
        this.listeChoix = listeChoix;
        this.description = description;
        this.imageUrl = imageUrl;
    }
  }

// ====================================

/*          recuperation de mon catalogue de produit           */
const urlApi = "http://localhost:3000/api/cameras";
const body = document.querySelector('main');
fetch(urlApi)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
    /*          integration au document de mon objet         */
  .then(function(items) {
    //      Creation d'une section
    let newSection = document.createElement('div');
    newSection.classList.add('produit');
    
    //      Creation du titres
    let newTitres = document.createElement('div');
    newTitres.classList.add('produit__titres');
    let newParagraphes = document.createElement('p');
    newParagraphes.innerText = "Liste ";
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
      img.src = item.imageUrl;
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
  .catch(function(err) {
    //      Creation d'une section
    let newSection = document.createElement('div');
    newSection.classList.add('produit__titres');
    newSection.innerText = "oups";
    body.append(newSection);
  });  
