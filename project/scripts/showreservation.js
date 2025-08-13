import { setupNav } from './nav.js';
import { reservations, showReservation } from './reservations.js';

document.addEventListener('DOMContentLoaded',async ()=>{
    setupNav();
    try {
        showReservation()
    } catch (error) {
        console.log(error)
    }
})