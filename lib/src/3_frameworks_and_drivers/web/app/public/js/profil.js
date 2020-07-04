const _achat_import_step = [
    { txt: "En attente de panier", color: 'yellow' },
    { txt: "En cours de facturation", color: 'greenyellow' },
    { txt: "En attente de paiement", color: 'red' },
    { txt: "En cours de livraison", color: 'green' }
];

const _import_step = [
    { txt: "En attente de contact", color: "yellow" },
    { txt: "En cours de facturation", color: 'greenyellow' },
    { txt: "En attente de paiement", color: 'red' },
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
            stepIndex = _achat_import_step.length - 1;
        } else if (commande.achat_import.facture) {
            stepIndex = _achat_import_step.length - 2;
        } else if (commande.achat_import.panier) {
            stepIndex = _achat_import_step.length - 3;
        }
    } else if(commande.type == 'import' && commande.import){
        if(commande.import.reference){
            stepIndex = _import_step.length-1;
        }
    }
    const container = document.querySelector("tbody");
    const tr = document.createElement('tr');
    const reference = document.createElement('td');
    reference.innerHTML = commande.numero;
    const state = document.createElement('td');
    state.innerHTML = _achat_import_step[stepIndex].txt;
    const date = document.createElement('td');
    date.innerHTML = (d.getDate() < 10 ? "0" : "")
        + d.getDate() + "/"
        + (d.getMonth() + 1 < 10 ? "0" : "")
        + (d.getMonth() + 1) + "/"
        + d.getFullYear();
    tr.appendChild(reference);
    tr.appendChild(state);
    tr.appendChild(date);
    container.appendChild(tr);
    if (commande.type == 'achat_import') {
        tr.addEventListener('click', () => {
            window.location = "/achat_import/" + (stepIndex + 2) + "/" + commande._id;
        })
    } else {
        tr.addEventListener('click', () => {
            window.location = "/import/" + (stepIndex + 2) + "/" + commande._id;
        })
    }
}