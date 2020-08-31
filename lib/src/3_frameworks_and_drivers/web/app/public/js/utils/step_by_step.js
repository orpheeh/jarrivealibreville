let _steps = [];
let currentStepIndex = 0;

function loadAllStep(){
    _steps = document.querySelectorAll(".one-step");
}

function initializeStepByStep(){
    _steps.forEach(step =>{
        if(step == _steps[currentStepIndex]){
            step.classList.add("current-step");
        } else {
            step.classList.remove("current-step");
        }
    })
}

function nextStep(){
    currentStepIndex++;
    if(currentStepIndex < _steps.length){
        initializeStepByStep();
    }
}