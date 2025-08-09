import { setupNav } from './nav.js';
import  {events} from '../data/data.js'
import {getUpcomingEvents, renderEventCard} from './data.js'


document.addEventListener('DOMContentLoaded',async ()=>{
    setupNav();
    const upcomming         = getUpcomingEvents(
       events, 6
    )
    const upEnvents         = document.querySelector('#event-adds') 
    upcomming.map((event)   => {
        upEnvents.innerHTML += renderEventCard(event)
    })
})