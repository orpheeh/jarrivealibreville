window.addEventListener('load', async () => {
    console.log('load');
    await automaticallyDisplayCountry();
})

async function getCounttryByIP() {
    try {
        const res = await fetch('https://extreme-ip-lookup.com/json/');
        if(res.status == 200){
            const data = await res.json();
            console.log(data);
            return data.country;
        } else {
            return null;
        }
    } catch(err){
        console.log(err);
        return null;
    }

}

async function automaticallyDisplayCountry(){
    const country = await getCounttryByIP();
    console.log(country);
    if(country){
        document.querySelector('#pays').value = country;
    }
}