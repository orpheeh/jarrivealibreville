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
    console.log(commande);
    const tr = document.createElement('tr');

    const convoit = document.createElement('td');
    convoit.innerHTML = commande.convoit == "bateau" ? "<i class='fa fa-ship'></i>" : "<i class='fas fa-plane'></i>";
    if(commande.isSave == true){
        convoit.style.color = 'green';
    } else if(commande.isSave == false){
        convoit.style.color = 'red';
    }

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
    panier.innerHTML = p == null ? "-" : p == "" ? "-" :
        `<a href="/uploads/commande/panier/${commande._id}">Télécharger le panier</a>`;

    const facture = document.createElement('td');
    const hasFacture = (commande.imports && commande.imports.facture) ||
        (commande.achat_import && commande.achat_import.facture);
    const idf = commande._id;
    facture.innerHTML = hasFacture ? `<a href="/uploads/commande/facture/${commande._id}">Télécharger la facture</a>` :
        `<form method="post" action="/uploads/commande/facture" enctype = "multipart/form-data")>
          <input type="hidden" name="id" value="${commande._id}">
          <input type="hidden" name="type" value="${commande.type}">
          <div class="form-group">  
            <label for="facture-${idf}"><i class="fa fa-upload"></i> <span>Fichier</span> <span class="filename">...</span></label>
            <input id="facture-${idf}" style="display:none;"  type="file" onchange="loadFile(this, 'facture-${idf}')" name="facture">
          </div>
          <button class="standard-button">Envoyer</button>
        </form>
   `;

    const paiement = document.createElement('td');
    const str = (commande.imports && commande.imports.reference) ? commande.imports.reference :
        (commande.achat_import && commande.achat_import.reference) ? commande.achat_import.reference : "";
    paiement.innerHTML = str != "" ?
        `<p>${str}</p>
       <button onclick="updateCommande('${commande._id}', { isSave: true})">Accepter</button>
       <button onclick="updateCommande('${commande._id}', { isSave: false})">Refuser</button>
  ` : "-";

    const date = document.createElement('td');
    const d = new Date(commande.date);
    const mm = d.getMonth()+1;
    const strDate = (d.getDate() < 10 ? "0" : "") +
        d.getDate() + "/" + (mm < 10 ? "0" : "") +
        mm + "/" + d.getFullYear();
    const strHeure = (d.getHours() < 10 ? "0" : "") + d.getHours()
        + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    date.innerHTML = strDate + " à " + strHeure;
    
    const cotation = document.createElement('td');
    cotation.innerHTML = commande.cotation;

    tr.appendChild(convoit);
    tr.appendChild(reference);
    tr.appendChild(auteur);
    tr.appendChild(date);
    tr.appendChild(panier);
    tr.appendChild(facture);
    tr.appendChild(paiement);
    tr.appendChild(cotation);
    container.appendChild(tr);
}

function loadFile(e, id) {
    const file = e.files[0];
    if (file) {
        console.log(id);
        document.querySelector('label[for="' + id + '"').innerHTML = file.name;
    }
}

async function updateCommande(id, value) {
    console.log(id)
    const res = await fetch("/api/commandes/" + id, {
        method: 'PUT',
        body: JSON.stringify(value)
    });
    if (res.status == 200) {
        window.location.reload();
    } else {
        alert("Une erreur ses produite, votre panier n'a pas été envoyé");
    }
}

async function fetchCommandes() {
    const res = await fetch("/api/commandes/open/admin");
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