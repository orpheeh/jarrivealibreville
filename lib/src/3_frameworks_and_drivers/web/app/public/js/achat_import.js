let _commande = null;
let _convoit = "bateau";

window.addEventListener('load', () => {
    const splits = window.location.toString().split("/");
    if (isNaN(splits[splits.length - 1]) == false) {
        currentStepIndex = splits[splits.length - 1];
        console.log(currentStepIndex);
    }
    loadAllStep();
    initializeStepByStep();
});

async function sendPanierToCommande() {
    const panier = document.querySelector('#panier').value;
    console.log(_commande);
    const res = await fetch("/api/commandes/" + _commande._id, {
        method: 'PUT',
        body: JSON.stringify({
            convoit: _convoit,
            achat_import: {
                panier
            },
            isFinish: true
        })
    });
    if (res.status == 200) {
        nextStep();
    } else {
        alert("Une erreur ses produite, votre panier n'a pas été envoyé");
    }
}

function paiementReference() {
    nextStep();
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



function changeConvoit(convoit){
    _convoit = convoit;
    const convoits  = document.querySelectorAll('.convoit');
    convoits.forEach(f => {
        f.classList.remove('selected-convoit');
    })
    if(convoit == 'bateau'){
        document.querySelector('.bateau').classList.add('selected-convoit');
    } else {
        document.querySelector('.avion').classList.add('selected-convoit');
    }
}