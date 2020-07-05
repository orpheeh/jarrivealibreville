let _commande = null;
let _convoit = "bateau";

window.addEventListener("load", async () => {
    const splits = window.location.toString().split("/");
    console.log(splits[splits.length - 1]);
    if (splits[splits.length - 1] && splits[splits.length - 1] != 'null') {
        _commande = await fetchCommade(splits[splits.length - 1]);
        console.log(_commande);
        if (_commande) {
            if (isNaN(splits[splits.length - 2]) == false) {
                currentStepIndex = splits[splits.length - 2];
            }
        } else {
            currentStepIndex = 0;
        }
    }
    loadAllStep();
    initializeStepByStep();
});

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

async function updateConvoit() {
    const res = await fetch("/api/commandes/" + _commande._id, {
        method: 'PUT',
        body: JSON.stringify(
            { convoit: _convoit }
        )
    });
    if (res.status == 200) {
        nextStep();
    } else {
        alert("Une erreur ses produite, votre panier n'a pas été envoyé");
    }
}

async function createCommandeImport() {
    const res = await fetch("/api/commandes", {
        method: 'POST',
        body: JSON.stringify({
            type: 'import',
        })
    });
    if (res.status != 200) {
        console.log(res.status);
    } else {
        console.log('save');
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