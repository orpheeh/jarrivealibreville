let _commande = null;
let _convoit = "bateau";

window.addEventListener("load", async () => {
    const splits = window.location.toString().split("/");
    if (splits[splits.length - 1]) {
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