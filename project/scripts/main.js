import { setupNav } from './nav.js';
import  events from '../data/data.js'
import {getUpcomingEvents, renderEventCard} from './data.js'
import { reservations } from './reservations.js';

document.addEventListener('DOMContentLoaded',async ()=>{
    setupNav();
    const upcomming         = getUpcomingEvents(
       events, 6
    )
    
    try {
        const upEnvents         = document.querySelector('#event-adds') 
        upcomming.map((event)   => {
            upEnvents.innerHTML += renderEventCard(event)
        })
    } catch (error) {
    }

    try {
        reservations()
    } catch (error) {
        console.log(error)
    }
})