window.addEventListener('load', () => {
    loadVilleGabon();
})

async function loadVilleGabon(){
    const res = await fetch('/api/villes');
    if(res.status == 200){
        const villes = await res.json();
        console.log(villes);
        const select = document.querySelector('select[name="ville"]');
        villes.forEach(ville => {
            const option = document.createElement('option');
            option.value = ville;
            option.innerHTML = ville;
            select.appendChild(option);
        })
    }
    
}