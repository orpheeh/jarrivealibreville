let _commande = null;

window.addEventListener("load", () => {
    createCommandeImport();
    loadAllStep();
    initializeStepByStep();
});

async function createCommandeImport() {
    const res = await fetch("/api/commandes", {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            type: 'import',
        })
    });
    if (res.status != 200) {
        _commande = await res.json();
        window.location.reload();
    } else {
        nextStep();
    }
}