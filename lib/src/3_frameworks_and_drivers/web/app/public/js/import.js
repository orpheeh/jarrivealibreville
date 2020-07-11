let _commande = null;
let _convoit = "bateau";
let _cotations = [];

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
    _cotations = await fetchCotation();
    changeConvoit('bateau');
});

async function fetchCotation() {
    const res = await fetch("/api/cotation");
    if (res.status == 200) {
        const cotations = await res.json();
        return cotations;
    } else {
        return null;
    }
}

function displayCotation(cotation) {
    if (cotation.pays == "france" && cotation.transport == "avion") {
        document.querySelector('.cotation-fr').innerHTML = cotation.value + " FCFA / Kg";
    } else if (cotation.pays == "chine" && cotation.transport == "avion") {
        document.querySelector('.cotation-chine').innerHTML = cotation.value + " FCFA / Kg";
    } else if (cotation.pays == "maroc" && cotation.transport == "avion") {
        document.querySelector('.cotation-ma').innerHTML = cotation.value + " FCFA / Kg";
    } else if (cotation.pays == "france" && cotation.transport == "bateau") {
        document.querySelector('.cotation-fr').innerHTML = cotation.value + " FCFA / CBN";
    } else if (cotation.pays == "chine" && cotation.transport == "bateau") {
        document.querySelector('.cotation-chine').innerHTML = cotation.value + " FCFA / CBN";
    } else if (cotation.pays == "maroc" && cotation.transport == "bateau") {
        document.querySelector('.cotation-ma').innerHTML = cotation.value + " FCFA / CBN";
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
        const array = _cotations.filter(c => c.transport == "bateau");
        array.forEach(a => {
            displayCotation(a);
        })
    } else {
        document.querySelector('.avion').classList.add('selected-convoit');
        const array = _cotations.filter(c => c.transport == "avion");
        array.forEach(a => {
            displayCotation(a);
        })
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
    let str = "";
    _cotations.forEach(c => {
        str = str + c.pays + ": " + c.value + "-" + c.transport + "; ";
    })
    console.log(str);
    const res = await fetch("/api/commandes", {
        method: 'POST',
        body: JSON.stringify({
            type: 'import',
            cotation: str
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