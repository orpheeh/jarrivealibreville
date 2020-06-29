let _commande = null;

window.addEventListener('load', () => {
    loadAllStep();
    initializeStepByStep();
});

function sendPanierToCommande(){
    nextStep();
}

function paiementReference(){
   nextStep();
}

async function createCommandeAchatImport(){
    const res = await fetch("/api/commandes", {
        method: 'POST',
        headers: { "content-type":"application/json"},
        body: JSON.stringify({
            type: 'achat_import',
        })
    });
    if(res.status != 200){
        commande = await res.json();
        window.location.reload();
    } else {
        nextStep();
    }
}