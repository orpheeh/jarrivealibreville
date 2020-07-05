let _commande = null;
let _convoit = "bateau";
let _panierFile = null;

window.addEventListener('load', async () => {
    const splits = window.location.toString().split("/");
    if (splits[splits.length - 1]) {
        _commande = await fetchCommade(splits[splits.length - 1]);
        console.log(_commande);
        if (_commande) {
            if (isNaN(splits[splits.length - 2]) == false) {
                currentStepIndex = splits[splits.length - 2];
            }
        } else {
            console.log("Restart step");
            currentStepIndex = 0;
        }
    }
    loadAllStep();
    initializeStepByStep();
});

function loadPanier(e) {
    const file = e.files[0];
    if (file) {
        _panierFile = file;
    }
}

async function sendPanierToCommande() {
    const formData = new FormData();
    formData.append("panier", _panierFile);
    formData.append("convoit", _convoit);
    formData.append("id", _commande._id);
    formData.append("type", _commande.type);

    const res = await fetch("/uploads/commande/panier", {
        method: 'POST',
        body: formData
    });
    if (res.status == 200) {
        nextStep();
    } else {
        alert("Une erreur ses produite, votre panier n'a pas été envoyé");
    }
}

async function paiementReference() {
    const text = document.querySelector('#sms').value;
    const res = await fetch("/api/commandes/" + _commande._id, {
        method: 'PUT',
        body: JSON.stringify(
            { achat_import: { reference: text } }
        )
    });
    if (res.status == 200) {
        nextStep();
    } else {
        alert("Une erreur ses produite, votre panier n'a pas été envoyé");
    }
}

async function createCommandeAchatImport() {
    const res = await fetch("/api/commandes", {
        method: 'POST',
        body: JSON.stringify({
            type: 'achat_import',
        })
    });
    if (res.status != 200) {
        console.log(res.status);
    } else {
        _commande = await res.json();
        nextStep();
    }
}

async function fetchCommade(id) {
    const res = await fetch("/api/commandes/" + id);
    if (res.status == 200) {
        return await res.json();
    } else {
        return null;
    }
}



function changeConvoit(convoit) {
    _convoit = convoit;
    const convoits = document.querySelectorAll('.convoit');
    convoits.forEach(f => {
        f.classList.remove('selected-convoit');
    })
    if (convoit == 'bateau') {
        document.querySelector('.bateau').classList.add('selected-convoit');
    } else {
        document.querySelector('.avion').classList.add('selected-convoit');
    }
}