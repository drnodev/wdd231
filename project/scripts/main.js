import { setupNav } from './nav.js';
import events from '../data/data.js'
import { getUpcomingEvents, renderEventCard } from './data.js'
import { reservations } from './reservations.js';
import { addToCart } from './cart.js'


document.addEventListener('DOMContentLoaded', async () => {

    setupNav();
    const upcomming = getUpcomingEvents(
        events, 6
    )

    try {
        const upEnvents = document.querySelector('#event-adds')
        upcomming.map((event) => {
            upEnvents.innerHTML += renderEventCard(event)
        })
        const btnMainEvent = document.getElementById('btn-main-event')
        btnMainEvent.addEventListener('click', () => {
            addToCart({
                id: "Sports Legends for Children",
                title: "Sports Legends for Children",
                price: 10.99
            })
        })


        const btnAddToCart = document.querySelectorAll('.add-to-cart-btn');
        btnAddToCart.forEach(button => {
            button.addEventListener('click', (e) => {
                addToCart({
                    id: button.dataset.id,
                    title: button.dataset.title,
                    price: parseFloat(button.dataset.price)
                });
            });
        });



    } catch (error) {
        console.log(error)
    }

    try {
        reservations()
    } catch (error) {
        console.log(error)
    }
})