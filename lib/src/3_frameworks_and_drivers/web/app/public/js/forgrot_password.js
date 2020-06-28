async function updatePassword(){
    const email = document.querySelector("input[name='email'").value;
    
    const res = await fetch("/api/users/forgot-password/" + email);
    
    const result = document.querySelector('.result');
    if(res.status == 200) {
        //Un email vous à été envoyer
        result.innerHTML = "Un email vous à été envoyer avec un lien pour changer votre mot de passe";
        result.style.color = 'green';
    } else if(res.status == 401) {
        //Email n'existe pas
        result.innerHTML = "Désolé, mais cette email n'appartien à aucun compte client";
        result.style.color = 'red';
    } else {
        //Une erreur c'est produite veuillez reesayer
        result.innerHTML = "Une erreur s'est produite, veuillez vérifer l'email et réessayer s'il vous plaît";
        result.style.color = 'red';
    }
}