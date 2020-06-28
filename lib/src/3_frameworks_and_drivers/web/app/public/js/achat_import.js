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