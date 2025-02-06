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

window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    document.querySelector('.parallax').style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});