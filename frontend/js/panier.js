//      crations des class
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
//      initialisation des instance
let itemCommande = new produitCommander;
let item = new produit;
let quantiter;
let tabPanier= [];
const recupPanier = localStorage.getItem("tabPanier");
let validation = false;
let totalPrix = 0 ;
if (recupPanier != null ) tabPanier = JSON.parse(recupPanier);
//      selection de mes element de page
const sectionTabCommande = document.getElementById('tableauxCommandeproduit');
const newSection = document.getElementById('titres_pages');
//      integrations a la page
let newDivTitres = document.createElement('div');
newDivTitres.classList.add('div_titres');
let titresPages = document.createElement('h1');
titresPages.classList.add('panier');
titresPages.innerText = "Panier";
newDivTitres.append(titresPages);
newSection.append(newDivTitres);

// ====================================
//      recuperation des informatiopn produit pour la commande
let id;
let testP = [];
let testdiv = [];
let y = 0;
fetch("http://localhost:3000/api/furniture")
//     conversion des données en JSON
  .then(reponse => reponse.json())
  .then(data => {
    items = data;
//      creation du tableaux pour la liste des produits a commander
    if(tabPanier.length){
      let tabCommande = document.createElement("table");
      tabCommande.classList.add("tabCommande");
      sectionTabCommande.append(tabCommande);
      let designationElementTabCommande = document.createElement("thead");
      designationElementTabCommande.classList.add("designationElementTabCommande");
      designationElementTabCommande.innerHTML +=`
        <tr>
            <th> </th>
            <th>Nom</th>
            <th>Quantiter</th>
            <th>Prix</th>
            <th> </th>
        </tr>
        `;
        tabCommande.append(designationElementTabCommande);
//      ajout au tableaux chaque element dans mon panier
      for(i = 0; i< tabPanier.length; i++){
        id = tabPanier[i]._id;
        quantiter = tabPanier[i].quantiter;
        for( let j in items){// compares elements du panier avec la basse de données
          if(id == items[j]._id){// elements panier trouver dans la basse de données
            item = items[j];
            totalPrix += quantiter *item.price/100;
            console.log(totalPrix);

            let ElementTabCommande = document.createElement("tbody");
            ElementTabCommande.classList.add("ElementTabCommande");
            ElementTabCommande.innerHTML +=`
            <tr>
              <td>
                <div>
                  <img class="imagPanier" src="${item.imageUrl}" alt="voir-produit-${item.name}">
                </div>
              </td>
              <td class="name">${item.name}</td>
              <td class="quantiter">${quantiter}</td>
              <td class="prix">${quantiter * item.price/100} €</td>
              <td class="buttonSupPanier">
                  <button class="supElementPanier" type="bouton" id="delete_${item._id}" onclick="supElementPanier('${id}')">Supprimer</button>
              </td>
            </tr>
            `;
            tabCommande.append(ElementTabCommande);   //        integrations dans le html       
          };     
        }
      }
      //      calcul du prix total de la commande
      let divTotalPrix = document.createElement("h3");
      divTotalPrix.innerHTML = "PrixTotal: " + totalPrix + "€";
      sectionTabCommande.append(divTotalPrix);
      localStorage.setItem("totalPrix",totalPrix);
    }
    //      si le panier est vide
    else{
      let newInfo = document.createElement('h1');
      newInfo.innerHTML = "Panier Vide";
      sectionTabCommande.append(newInfo);
    }
  })
  //      message d'erreur si pas de reponse
  .catch(error => {
    let newInfo = document.createElement('h1');
    newInfo.innerHTML = " erreur de chargement";
    sectionTabCommande.append(newInfo);
  })
  //    fonction de supression de l'element du panier
function supElementPanier(iden){
  let newTabPanier=[];
  if(tabPanier.length <= 1){
    tabPanier = [];
  }else{
    console.log(tabPanier);
    for(let i=0; i<tabPanier.length; i++) {
      if(iden != tabPanier[i]._id ){
        newTabPanier.push(tabPanier[i]);
      }
    }
    tabPanier = newTabPanier;
  }
  const miseEnFormePanier = JSON.stringify(tabPanier);
    localStorage.setItem('tabPanier', miseEnFormePanier );
    document.location.reload();
  }

  //      fonction d'envoie des information a la bdd
function validCommande() {  
  event.preventDefault();
  if(document.forms['formulaire'] !="") {
//---les données sont valides, on envoi le formulaire---//
  var contact = {
//---On récupère les données du formulaire avec leur valeur---//
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    zip: document.getElementById("zip").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value
  };
  var products = []
  for (let z = 0; z < tabPanier.length; z++) {
    products.push(tabPanier[z]._id);
  }
//---Les produits sont envoyés dans le panier---//

  fetch("http://localhost:3000/api/furniture/order", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({contact, products})
  })
//---Contact et products sont transformés en JSON---//
    .then(response => response.json())
    .then(response => {
      if(response.orderId) {
        alert(`Votre commande numéro ${response.orderId} à bien été passée.`);
        localStorage.setItem("orderId", response.orderId);
        localStorage.setItem("firstName", response.contact.firstName);
        totalPrix = localStorage.getItem("totalPrix");
        //      ouverture de la page de confirmation avec les donées dans l'url
        window.location.href = "/frontend/views/confirmation_commande.html?id="+response.orderId +"&prenom="+response.contact.firstName+"&totalPrix="+totalPrix;
      }
      //      si il y as une erreure dans l'envoie des données
      else{
        alert(`Votre commande comporte une erreur`)
      }
    });      
  }
  // si le formulaire est vide
  else {
    alert("Veuillez remplir le formulaire !")
  }
}