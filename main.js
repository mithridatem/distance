//récupération de la zone de résultat
const resultat = document.querySelector("#resultat");
resultat.textContent = "";

//fonction affichage de la distance entre 2 coordonnées
function distance2() {
	//récupération de la zone de résultat
	const resultat = document.querySelector("#resultat");
	//récupération des villes
	const villeD = document.querySelector("#ville_d").value;
	const villeA = document.querySelector("#ville_a").value;
	//base url
	const url = "https://api-adresse.data.gouv.fr/search/?q=";
	//test si les champs ville ne sont pas tous remplis
	if (villeD == "" || villeA == "") {
		resultat.textContent = "Veuillez renseigner toutes les valeurs";
	}
	//récupération des coordonnées de la ville de départ
	const recupCoordVilleD = apiVille(url + villeD);
	//récupération des coordonnées de la ville d'arrivée
	const recupCoordVilleA = apiVille(url + villeA);
    console.log(recupCoordVilleD, recupCoordVilleA);
	//lancement du calcul de distance
	setTimeout(() => {
		//test les 2 villes n'existent pas
		if (recupCoordVilleD.x === "vide" && recupCoordVilleA.y === "vide") {
			document.querySelector("#ville_d").value = "";
			document.querySelector("#ville_a").value = "";
			document.querySelector(
				"#ville_d"
			).placeholder = `${villeD} n'existe pas`;
			document.querySelector(
				"#ville_a"
			).placeholder = `${villeA} n'existe pas`;
			resultat.textContent = "";
		}
		//test la ville de départ n'existe pas
		else if (
			recupCoordVilleD.x === "vide" &&
			recupCoordVilleD.y === "vide"
		) {
			document.querySelector("#ville_d").value = "";
			document.querySelector(
				"#ville_d"
			).placeholder = `${villeD} n'existe pas`;
			resultat.textContent = "";
		}
		//test la ville d'arrivé n'existe pas
		else if (
			recupCoordVilleA.x === "vide" &&
			recupCoordVilleA.y === "vide"
		) {
			document.querySelector("#ville_a").value = "";
			document.querySelector(
				"#ville_a"
			).placeholder = `${villeA} n'existe pas`;
			resultat.textContent = "";
		}
		//test les 2 villes existent
		else {
			document.querySelector("#ville_d").value = "";
			document.querySelector("#ville_a").value = "";
			document.querySelector("#ville_d").placeholder = `${villeD}`;
			document.querySelector("#ville_a").placeholder = `${villeA}`;
			//Affichage du résultat
			resultat.textContent =
				"La distance est de : " +
				calcul(
					recupCoordVilleD.x,
					recupCoordVilleD.y,
					recupCoordVilleA.x,
					recupCoordVilleA.y
				) +
				" km";
			resultat.style.color = "green";
		}
	}, 500);
}

//calcul de la distance entre 2 points
function calcul(latDepart, longDepart, latArrive, longArrive) {
	//facteur d'échelle
	const factE = 1.852;
	//calcul angle x en deg
	const xDeg =
		Math.abs(latDepart - latArrive) *
		Math.cos((longDepart + longArrive) / 2);
	//calcul angle y en deg
	const yDeg = Math.abs(longDepart - longArrive);
	//calcul de la distance en deg
	const distDeg = Math.sqrt(xDeg ** 2 + yDeg ** 2);
	//conversion en kilométres
	const distance = (factE * 60 * distDeg).toFixed(2);
	return distance;
}

//récupération des coordonnées de la ville
function apiVille(url) {
	const objVille = {};
    fetch(url).then((response)=>response.json()
    )
    .then((data)=>{
        console.log(data);
        //test si la ville n'existe pas
        if(data.features.length == 0){
            objVille.x = "vide";
            objVille.y = "vide";
        }
        //test si la ville existe
        else{
            objVille.x = data.features[0].geometry.coordinates[0];
            objVille.y = data.features[0].geometry.coordinates[1];
        }
    });
    return objVille;
}

/* aide mémoire
    lat x
    long y
*/

/* ------------------ old code ------------------
function distance() {
	//récupération des valeurs en Float
	const latDepart = parseFloat(document.querySelector("#lat_d").value);
	const longDepart = parseFloat(document.querySelector("#long_d").value);
	const latArrive = parseFloat(document.querySelector("#lat_a").value);
	const longArrive = parseFloat(document.querySelector("#long_a").value);
	//récupération de la zone de résultat
	const resultat = document.querySelector("#resultat");
	//facteur d'échelle
	const factE = 1.852;
	//test si les champs sont tous remplis
	if (
		latDepart != "" &&
		longDepart != "" &&
		latArrive != "" &&
		longArrive != ""
	) {
		//calcul angle x en deg
		const xDeg =
			Math.abs(latDepart - latArrive) *
			Math.cos((longDepart + longArrive) / 2);
		//calcul angle y en deg
		const yDeg = Math.abs(longDepart - longArrive);
		//calcul de la distance en deg
		const distDeg = Math.sqrt(xDeg ** 2 + yDeg ** 2);
		//conversion en kilométres
		const distance = (factE * 60 * distDeg).toFixed(2);
		//Affichage du résultat
		resultat.textContent = "La distance est de : " + distance + " km";
	}
	//test sinon les champs ne sont pas tous remplis
	else {
		resultat.textContent = "Veuillez renseigner toutes les valeurs";
	}
}
function apiVille2(url) {
	const tabVille = [];
    fetch(url).then(async response=>{
        const data = await response.json();
        //test si la ville n'existe pas
        if(data.features== ""){
            tabVille.push("vide","vide");
        }
        //test si la ville existe
        else{
            tabVille.push(data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[1]);
        }
    });
    return tabVille;
} */
