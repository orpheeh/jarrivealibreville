window.addEventListener('load', () => {
    loadCommandes();
})

function changeMenu(element, content) {
    deselectAllMenuOptions();
    deselectAllContent();
    if (content == '.profil') {
    } else {
        element.classList.add("current-option");
    }
    document.querySelector(content).classList.add("current-content");
}

function deselectAllMenuOptions() {
    const drawerOptions = document.querySelectorAll(".drawer-option");
    drawerOptions.forEach(option => {
        option.classList.remove("current-option");
    });
}

function deselectAllContent() {
    const contents = document.querySelectorAll(".content > div");
    contents.forEach(content => {
        content.classList.remove("current-content");
    });
}

function toggleProfilMenu() {
    document.querySelector(".hidden-menu").classList.toggle("hidden-menu-show");
}

function toggleDrawer() {
    document.querySelector(".drawer").classList.toggle("drawer-show");
}

async function loadCommandes(){
    const res = await fetch("/api/commandes");
    if(res.status == 200){
      const commandes = await res.json();
      console.log(commandes);
    }
}