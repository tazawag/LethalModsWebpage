document.addEventListener("DOMContentLoaded", function () {
	const csvFilePath = "src/mods.csv";

	fetch(csvFilePath)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(csvText => displayCSV(csvText))
		.catch(error => console.error("Error loading CSV:", error));
});

function displayCSV(csvText) {
	const importantTable = document.getElementById("importantTable");
	const notImportantTable = document.getElementById("notImportantTable");
	if (!importantTable) {
		console.error("Table element not found!");
		return;
	}

	const rows = csvText.trim().split("\n").map(row => row.split(";"));
	importantTable.innerHTML = `<tr><th colspan="3">MODS IMPORTANTS</th></tr>`;
	notImportantTable.innerHTML = `<tr><th colspan="3">MODS OPTIONELS</th></tr>`;

	const importantMods = [];
	const nonImportantMods = [];
	rows.forEach(row => {
		if (row[0] !== "name") {
			const mod = `<tr><td><img src="src/img/mods/${row[0]}.png"/></td><td><a href="${row[1]}" target=”_blank”>${row[0]}</a></td><td>${row[2]}</td></tr>`;
			if (row[3] === "y") {
				importantMods.push(mod);
			} else {
				nonImportantMods.push(mod);
			}
		}
	});
	importantMods.forEach(mod => {
		importantTable.innerHTML += mod;
	});
	nonImportantMods.forEach(mod => {
		notImportantTable.innerHTML += mod;
	});
}

let offsetX = 0; // Position horizontale du fond
const speedX = 0.15; // Vitesse du déplacement horizontal
const speedY = 0.5; // Vitesse du parallax vertical

function animateBackground() {
    const scrolled = window.scrollY;
    offsetX -= speedX; // Déplace l’image vers la gauche
    document.querySelector('.parallax').style.backgroundPosition = `${offsetX}px ${-(scrolled * speedY)}px`;
    requestAnimationFrame(animateBackground);
}

// Lancer l'animation
animateBackground();