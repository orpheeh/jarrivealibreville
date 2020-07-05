const _achat_import_step = [
    { txt: "En attente de panier", color: 'yellow' },
    { txt: "En cours de facturation", color: 'orange' },
    { txt: "En attente de paiement", color: 'greenyellow' },
    { txt: "En cours de livraison", color: 'green' },
    { txt: "Paiement non reçu", color: 'red' }
];

const _import_step = [
    { txt: "En attente de validation", color: "yellow" },
    { txt: "En cours de livraison", color: 'green' },
];

window.addEventListener('load', () => {
    loadCommandes();
})

function changeMenu(element, content) {
    deselectAllMenuOptions();
    deselectAllContent();
    if (content == '.profil') {
    } else {
        element.classList.add("current-option");
    }
    document.querySelector(content).classList.add("current-content");
}

function deselectAllMenuOptions() {
    const drawerOptions = document.querySelectorAll(".drawer-option");
    drawerOptions.forEach(option => {
        option.classList.remove("current-option");
    });
}

function deselectAllContent() {
    const contents = document.querySelectorAll(".content > div");
    contents.forEach(content => {
        content.classList.remove("current-content");
    });
}

function toggleProfilMenu() {
    document.querySelector(".hidden-menu").classList.toggle("hidden-menu-show");
}

function toggleDrawer() {
    document.querySelector(".drawer").classList.toggle("drawer-show");
}

async function loadCommandes() {
    const res = await fetch("/api/commandes");
    if (res.status == 200) {
        const commandes = await res.json();
        commandes.reverse().forEach(c => {
            displayCommande(c);
        })
        console.log(commandes);
    }
}

function displayCommande(commande) {
    const d = new Date(commande.date);
    let stepIndex = 0;
    if (commande.type == 'achat_import' && commande.achat_import) {
        if (commande.achat_import.reference) {
            stepIndex = _achat_import_step.length - 2;
        } else if (commande.achat_import.facture) {
            stepIndex = _achat_import_step.length - 3;
        } else if (commande.achat_import.panier) {
            stepIndex = _achat_import_step.length - 4;
        }
        if(commande.isSave == false){
            stepIndex = _achat_import_step.length - 1;
        }
    } else if (commande.type == 'import' && commande.import) {
        if (commande.isSave == true) {
            stepIndex = 1;
        } else {
            stepIndex = 0;
        }
    }
    const container = document.querySelector("tbody");
    const tr = document.createElement('tr');
    const reference = document.createElement('td');
    reference.innerHTML = commande.numero;
    const state = document.createElement('td');
    if (commande.type == 'achat_import') {
        state.innerHTML = `<span>${_achat_import_step[stepIndex].txt}</span>`;
        state.querySelector('span').style.backgroundColor = _achat_import_step[stepIndex].color;
        state.querySelector('span').style.padding = '4px 32px';
    } else {
        state.innerHTML = `<span>${_import_step[stepIndex].txt}</span>`;
        state.querySelector('span').style.backgroundColor = _import_step[stepIndex].color;
    }
    state.querySelector('span').style.padding = '4px 32px';
    state.querySelector('span').style.borderRadius = '4px';
    state.querySelector('span').style.textAlign = 'center';
    state.querySelector('span').style.display = 'block';
    state.querySelector('span').style.margin = '16px 0px';

    const date = document.createElement('td');
    date.innerHTML = (d.getDate() < 10 ? "0" : "")
        + d.getDate() + "/"
        + (d.getMonth() + 1 < 10 ? "0" : "")
        + (d.getMonth() + 1) + "/"
        + d.getFullYear();

    const convoit = document.createElement('td');
    convoit.innerHTML = commande.convoit == 'bateau' ?
        `<i class="fa fa-ship"></i>` :
        `<i class="fas fa-plane"></i>`;
    tr.appendChild(convoit);
    tr.appendChild(reference);
    tr.appendChild(state);
    tr.appendChild(date);
    tr.appendChild(getActions(commande, stepIndex));

    container.appendChild(tr);
}

function getActions(commande, stepIndex) {
    const link = commande.type == 'achat_import' ?
        "/achat_import/" + (stepIndex + 2) + "/" + commande._id :
        "/import/" + (stepIndex + 2) + "/" + commande._id;
    const div = document.createElement('div');
    const prestation = `<a href="${link}">Continuer le processus</a>`

    if (commande.type == 'achat_import') {
        const facture = commande.achat_import.facture ?
            `<a href="/uploads/commande/facture/${commande._id}">Télécharger la facture</a>` : "";
        const panier = commande.achat_import.panier ?
            `<a href="/uploads/commande/panier/${commande._id}">Télécharger le panier</a>` : "";
        const reference = commande.achat_import.reference ?
            commande.achat_import.reference : "";
        div.innerHTML = `<button>Plus</button>
        <div>
         ${prestation}
         ${facture}
         ${panier}
         <p>${reference}</p>
        </div>
        `;
    }

    if (commande.type == 'import') {
        div.innerHTML = `<button>Plus</button>
        <div>
         ${prestation}
        </div>
        `;
    }
    div.classList.add("actions-cn");
    return div;
}