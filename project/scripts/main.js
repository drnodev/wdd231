import { setupNav } from './nav.js';
import {fetchEvents, getUpcomingEvents, renderEventCard} from './data.js'


document.addEventListener('DOMContentLoaded',async ()=>{
    setupNav();
    const upcomming         = getUpcomingEvents(
       await fetchEvents() , 6
    )
    const upEnvents         = document.querySelector('#event-adds') 
    upcomming.map((event)   => {
        upEnvents.innerHTML += renderEventCard(event)
    })
})