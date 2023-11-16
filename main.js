/*
    lat x
    long y
*/
//récupération de la zone de résultat
const resultat = document.querySelector('#resultat');
resultat.textContent = "";
//fonction calcul de distance entre 2 coordonnées
function distance(){
    //récupération des valeurs en Float
    const latDepart = parseFloat(document.querySelector('#lat_d').value);
    const longDepart = parseFloat(document.querySelector('#long_d').value);
    const latArrive = parseFloat(document.querySelector('#lat_a').value);
    const longArrive = parseFloat(document.querySelector('#long_a').value);
    //récupération de la zone de résultat
    const resultat = document.querySelector('#resultat');
    //facteur d'échelle
    const factE = 1.852;
    //test si les champs sont tous remplis
    if(latDepart!=""&&longDepart!=""&&latArrive!=""&&longArrive!=""){
        //calcul angle x en deg
        const xDeg = Math.abs(latDepart-latArrive)*Math.cos((longDepart+longArrive)/2);
        //calcul angle y en deg
        const yDeg = Math.abs(longDepart-longArrive);
        //calcul de la distance en deg
        const distDeg = Math.sqrt((xDeg**2)+(yDeg**2));
        //conversion en kilométres
        const distance = (factE*60*distDeg).toFixed(2);
        //Affichage du résultat
        resultat.textContent = "La distance est de : "+distance+" km";
    }
    //test sinon les champs ne sont pas tous remplis
    else{
        resultat.textContent = "Veuillez renseigner toutes les valeurs";
    }
}
function distance2(){
    //récupération des villes
    const villeD = document.querySelector("#ville_d").value;
    let latDepart;
    let longDepart;
    const villeA = document.querySelector("#ville_a").value;
    let latArrive;
    let longArrive;
    const url = "https://api-adresse.data.gouv.fr/search/?q=";
    //test siles champs ville ne sont pas tous remplis
    if(villeA == "" || villeA == ""){
        resultat.textContent = "Veuillez renseigner toutes les valeurs";
    }
    //récupération des coordonnées de la ville de départ
    const recupCoordVilleD = fetch(url+villeD).then(async response=>{
        const data = await response.json();
        //test si la ville n'existe pas
        if(data.features== ""){
            latDepart = "vide";
            longDepart = "vide";
        }
        //test si la ville existe
        else{
            latDepart= data.features[0].geometry.coordinates[0];
            longDepart= data.features[0].geometry.coordinates[1];
        }
    });
    //récupération des coordonnées de la ville d'arrivé
    const recupCoordVilleA = fetch(url+villeA).then(async response=>{
        const data = await response.json();
        //test si la ville n'existe pas
        if(data.features== ""){
            latArrive = "vide";
            longArrive = "vide";
        }
        //test si la ville existe
        else{
            latArrive= data.features[0].geometry.coordinates[0];
            longArrive= data.features[0].geometry.coordinates[1];
        }
    });
    //lancement du calcul de distance
    setTimeout(()=>{
        //récupération de la zone de résultat
        const resultat = document.querySelector('#resultat');
        //test les 2 villes n'existent pas
        if(latDepart == "vide" && longDepart == "vide" && latArrive == "vide" && longArrive == "vide"){
            document.querySelector("#ville_d").value = "";
            document.querySelector("#ville_a").value = "";
            document.querySelector("#ville_d").placeholder = `${villeD} n'existe pas`;
            document.querySelector("#ville_a").placeholder = `${villeA} n'existe pas`;
            resultat.textContent = "";
        }
        //test la ville de départ n'existe pas
        else if(latDepart == "vide" && longDepart == "vide"){
            document.querySelector("#ville_d").value = "";
            document.querySelector("#ville_d").placeholder = `${villeD} n'existe pas`;
            resultat.textContent = "";
        }
        //test la ville d'arrivé n'existe pas
        else if(latArrive == "vide" && longArrive == "vide"){
            document.querySelector("#ville_a").value = "";
            document.querySelector("#ville_a").placeholder = `${villeA} n'existe pas`;
            resultat.textContent = "";
        }
        //test les 2 villes existent
        else{
            document.querySelector("#ville_d").value = "";
            document.querySelector("#ville_a").value = "";
            document.querySelector("#ville_d").placeholder = "";
            document.querySelector("#ville_a").placeholder = "";
            //facteur d'échelle
            const factE = 1.852;
            //test si les champs sont tous remplis
            if(villeD!=""&&villeA!=""){
                //calcul angle x en deg
                const xDeg = Math.abs(latDepart-latArrive)*Math.cos((longDepart+longArrive)/2);
                //calcul angle y en deg
                const yDeg = Math.abs(longDepart-longArrive);
                //calcul de la distance en deg
                const distDeg = Math.sqrt((xDeg**2)+(yDeg**2));
                //conversion en kilométres
                const distance = (factE*60*distDeg).toFixed(2);
                //Affichage du résultat
                resultat.textContent = "La distance est de : "+distance+" km";
                resultat.style.color = "green";
            }
        }
    }, 500);
}
