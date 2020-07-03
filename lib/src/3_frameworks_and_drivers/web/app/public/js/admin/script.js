window.addEventListener('load', () => {
    fetchAndDisplayCommandes();
})

async function fetchAndDisplayCommandes() {
    const commandes = await fetchCommandes();
    const users = await fetchUsers();
    displayCommandes(commandes, users);
}

function displayCommandes(commandes, users) {
    const container = document.querySelector(".commandes");
    commandes.reverse().forEach(commande => {
        const user = users.find(user => user._id == commande.user);
        displayCommande(commande, user, container);
    })
}

function displayCommande(commande, user, container) {
    const tr = document.createElement('tr');

    const reference = document.createElement('td');
    reference.innerHTML = commande.numero;

    const auteur = document.createElement('td');
    auteur.innerHTML = `
     <div>
       <p>${user.nom}</p>
       <p>${user.email}</p>
       <p>${user.telephone}</p>
     </div>
   `;

    const panier = document.createElement('td');
    const p = commande.achat_import ? commande.achat_import.panier : "";
    panier.innerHTML = p == null ? "Aucun panier" : p == "" ? "-" : p;

    console.log(commande);

    const facture = document.createElement('td');
    const hasFacture = (commande.imports && commande.imports.facture) ||
        (commande.achat_import && commande.achat_import.facture);
        const idf = Date.now();    
        facture.innerHTML = hasFacture ? `<a href="/uploads/commande/facture/${commande._id}">Télécharger la facture</a>` :
        `<form method="post" action="/uploads/commande/facture" enctype = "multipart/form-data")>
          <input type="hidden" name="id" value="${commande._id}">
          <input type="hidden" name="type" value="${commande.type}">
          <div class="form-group">  
            <label for="facture-${idf}"><i class="fa fa-upload"></i> Fichier...</label>
            <input id="facture-${idf}" type="file" name="facture">
          </div>
          <button class="standard-button">Envoyer</button>
        </form>
   `;

    const paiement = document.createElement('td');
    const str = (commande.imports && commande.imports.reference) ? commande.imports.reference :
        (commande.achat_import && commande.achat_import.reference) ? commande.achat_import.reference : "";
    paiement.innerHTML = str != "" ?
        `<p>${str}</p>
    <form method="post" action="/commandes/update">
         <input type="hidden" name="id" value="${commande._id}">
         <input type="hidden" name="isSave" value="true">
         <button>Accepter</button>
    </form>
    <form method="post" action="/commandes/update">
    <input type="hidden" name="id" value="${commande._id}">
    <input type="hidden" name="isSave" value="false">
    <button>Refuser</button>
</form>
  ` : "Aucun paiment";

    const date = document.createElement('td');
    const d = new Date(commande.date);
    const strDate = (d.getDate() < 10 ? "0" : "") +
        d.getDate() + "/" + (d.getMonth() < 10 ? "0" : "") +
        d.getMonth() + "/" + d.getFullYear();
    const strHeure = (d.getHours() < 10 ? "0" : "") + d.getHours()
        + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    date.innerHTML = strDate + " à " + strHeure;

    tr.appendChild(reference);
    tr.appendChild(auteur);
    tr.appendChild(date);
    tr.appendChild(panier);
    tr.appendChild(facture);
    tr.appendChild(paiement);
    container.appendChild(tr);
}

async function fetchCommandes() {

    const res = await fetch("/api/commandes");
    if (res.status == 200) {
        const commades = await res.json();
        return commades;
    } else {
        return null;
    }
}

async function fetchUsers() {
    const res = await fetch("/api/users");
    if (res.status == 200) {
        const users = await res.json();
        return users;
    } else {
        return null;
    }
}