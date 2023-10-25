/*
    lat x
    long y
*/
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
        const distDeg = Math.sqrt((xDeg*xDeg)+(yDeg*yDeg));
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
