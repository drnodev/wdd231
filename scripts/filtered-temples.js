const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;



/* */


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "San Salvador El Salvador",
    location: "San Salvador El Salvador",
    dedicated: "2011, August, 21",
    area: 27986,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/135-San-Salvador-El-Salvador-Temple.jpg"
  },

  {
    templeName: "Montevideo Uruguay Temple",
    location: "Montevideo, Uruguay",
    dedicated: "2001, March, 18",
    area: 10700,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/montevideo-uruguay-temple/montevideo-uruguay-temple-18474-main.jpg"
  },

{
    templeName: "Cobán Guatemala Temple",
    location: "Cobán, Guatemala",
    dedicated: "2024, June, 9",
    area: 8772,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/coban-guatemala-temple/coban-guatemala-temple-46348-main.jpg"
  },
];



const container = document.querySelector(".gallery");
const showTemples = (filteredTemples) => {
	container.innerHTML = ""
	filteredTemples.forEach((temple) => {
		const card = document.createElement("div");
		card.className = "temple-card";
		card.innerHTML = `
			<h3>${temple.templeName}</h3>
			<div>
				<span class="label">Location:<span>
				<span class="value">${temple.location}</span>
			</div>
			<img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" width="400" height="250" />
			<div>
				<span class="label">Dedicated:<span>
				<span class="value">${temple.dedicated}</span>
			</div>
			<div>
				<span class="label">Area:<span>
				<span class="value">${temple.area.toLocaleString()} sq ft</span>
			</div>
		`;
		container.appendChild(card);
	});
}


document.getElementById('old').addEventListener('click', ()=>{
	const oldTemples  = temples.filter(temple =>  {
		const year = parseInt(temple.dedicated.split(",")[0].trim());
  		return year < 1900;
	})
	showTemples(oldTemples)
})

document.getElementById('small').addEventListener('click', ()=>{
	const oldTemples  = temples.filter(temple =>  temple.area < 10000)
	showTemples(oldTemples)
})

document.getElementById('large').addEventListener('click', ()=>{
	const oldTemples  = temples.filter(temple =>  temple.area > 90000)
	showTemples(oldTemples)
})

document.getElementById('all').addEventListener('click', ()=>{
	showTemples(temples)
})

document.getElementById('new').addEventListener('click', ()=>{
	const oldTemples  = temples.filter(temple =>  {
		const year = parseInt(temple.dedicated.split(",")[0].trim());
  		return year < 2000;
	})
	showTemples(oldTemples)
})

document.addEventListener('DOMContentLoaded', ()=>{
	showTemples(temples)
})



