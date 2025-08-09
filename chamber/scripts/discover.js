
import { menu } from './menu.js';
import {loadCards} from './discover-places.js'
import { message } from './message.js';


document.addEventListener('DOMContentLoaded',()=>{
    menu()
    loadCards()
    message()
})
