/*const data = [
	{
		name: 'Mario Kart 8 Deluxe',
		released: '2017-04-27',
		metacritic: 92,
		background_image: 'images/mario-kart-8-deluxe.jpg',
	},
	{
		name: 'God of War Ragnarok',
		released: '2022-11-09',
		metacritic: 94,
		background_image: 'images/god-of-war-ragnarok.jpg',
	},
	{
		name: 'The Last of Us Part 2',
		released: '2020-06-19',
		metacritic: 94,
		background_image: 'images/the-last-of-us-part-2.jpg',
	},
];
function renderGameThumbnail({ name, background_image, released, metacritic }) {
	const releasedDate = new Date(released);
	return `<a href="${background_image}">
			<img src="${background_image}" />
			<footer>
				<h3>${name}</h3>
				<div class="infos">
					<time datetime="${released}">${releasedDate.toLocaleDateString()}</time>
					<span class="metacritic">${metacritic}</span>
				</div>
			</footer>
		</a>`;
}
let html = '';
data.forEach(game => (html += renderGameThumbnail(game)));
document.querySelector('.gameList .results').innerHTML = html;

//console.log(document.querySelectorAll('h3')[2].innerHTML);
document.querySelector('.viewContainer header').innerHTML = '<h1>Magasin</h1>';
document.querySelectorAll('body>footer div')[1].innerHTML +=
	' / CSS inspirée de <a href="https://store.steampowered.com/">Steam</a>';

const oldClass = document.querySelector('.gameListLink').getAttribute('class');
document
	.querySelector('.gameListLink')
	.setAttribute('class', 'active ' + oldClass);

function showSearchBar() {
	if (document.querySelector('.searchForm').getAttribute('style') === '') {
		document
			.querySelector('.searchForm')
			.setAttribute('style', 'display: none');
		document
			.querySelector('button.toggleSearchButton')
			.setAttribute('class', 'toggleSearchButton');
	} else {
		document.querySelector('.searchForm').setAttribute('style', '');
		document
			.querySelector('button.toggleSearchButton')
			.setAttribute('class', 'opened toggleSearchButton');
	}
}
document
	.querySelector('button.toggleSearchButton')
	.addEventListener('click', showSearchBar);

document.querySelector('.gameList').classList.add('active');
function clickHeader(event) {
	event.preventDefault();
	document.querySelector('.viewContainer header').innerHTML =
		'<h1>' + event.currentTarget.innerHTML + '</h1>';
	document.querySelector('.mainMenu .active').classList.remove('active');
	event.currentTarget.classList.add('active');
	//console.log(event.currentTarget.getAttribute('href'));
	document.querySelector('.viewContent .active').classList.remove('active');
	const active = event.currentTarget.getAttribute('href').replace('/', '');
	if (active === '') {
		document.querySelector('.gameList').classList.add('active');
	} else {
		document.querySelector('.' + active).classList.add('active');
	}
}
const mainMenu = document.querySelectorAll('.mainMenu a');
for (let i = 0; i < mainMenu.length; i++) {
	mainMenu[i].addEventListener('click', clickHeader);
}

function sendHelp(event) {
	event.preventDefault();
	//console.log('onon g bezwin ded :<');
	const form = document.querySelector('.helpForm'),
		author = form.querySelector('input[name=subject]'),
		text = form.querySelector('textarea[name=body]');
	console.log(author.value + ' ' + text.value);
}
document.querySelector('.helpForm').addEventListener('submit', sendHelp);*/

document.addEventListener("DOMContentLoaded", function () {
	const csvFilePath = "data/mods.csv"; // Ensure this file exists in your server root

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
	const table = document.getElementById("csvTable");
	if (!table) {
		console.error("Table element not found!");
		return;
	}

	const rows = csvText.trim().split("\n").map(row => row.split(","));
	table.innerHTML = ""; // Clear previous content

	rows.forEach(row => {
		if (row[0] === "name") {
			table.innerHTML += `<tr><td>icon</td><td>name</td><td>desc</td></tr>`;
		} else {
			table.innerHTML += `<tr><td><img src="images/${row[0]}.png"/></td><td><a href="${row[1]}">${row[0]}</a></td><td>${row[2]}</td></tr>`;
		}
	});
}