

import placesJson from '../data/places.js' 


export const loadCards = async () =>{
    try {
      //const response = await fetch('./data/places.json');
      const places = placesJson;

      console.log(places)

      const container = document.querySelector('.card-container');

      container.innerHTML = ''; // Limpia contenido previo si lo hubiera

      places.forEach(place => {
        const cardHTML = `
          <div class="card">
            <h2>${place.name}</h2>
            <figure>
              <img src="${place.image}" alt="${place.name}" loading="lazy">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button>${place.button}</button>
          </div>
        `;
        container.innerHTML += cardHTML;
      });
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  }