import events from '../data/data.js'
import { getUpcomingEvents, renderEventCard } from './data.js'


export const saveReservations = (list) => {
  localStorage.setItem('reservations', JSON.stringify(list));
}

export const loadReservations = () => {
  try {
    return JSON.parse(localStorage.getItem('reservations')) || [];
  } catch (err) {
    console.error('Error reading reservations from localStorage:', err);
    return [];
  }
}

export const normalize = (s) => { return String(s || '').trim().toLowerCase(); }



export const reservations = () => {
  try {
    const form = document.getElementById('reservationForm');
    const results = document.querySelector('#reservations-items .results')

    const upcomming = getUpcomingEvents(
      events, 50
    )

    upcomming.map((event) => {
      results.innerHTML += renderEventCard(event)
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const fullName = form.fullName.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const eventType = form.eventType.value;
      const date = form.date.value;
      const time = form.time.value;
      const guests = form.guests.value;
      const reason = form.reason.value.trim();

      const available = checkAvailability(eventType, date, time);
      if (!available.ok) {
        showMessage(available.reason, 'error');
        return;
      }

      const reservations = loadReservations();
      const newReservation = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        fullName,
        phone,
        email,
        eventType,
        date,
        time,
        guests: Number(guests),
        reason
      };
      reservations.push(newReservation);
      saveReservations(reservations);
      showMessage('✅ Reservation confirmed! We will contact you soon.', 'success');
      setTimeout(() => {
        form.submit()
      }, 1000);
    })
  } catch (error) {

  }
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tbody = document.querySelector('main');

  
  for (const [key, value] of urlParams.entries()) {
    const row = document.createElement('tr');
    const paramCell = document.createElement('td');
    paramCell.textContent = key;
    const valueCell = document.createElement('td');
    valueCell.textContent = value;
    row.appendChild(paramCell);
    row.appendChild(valueCell);
    tbody.appendChild(row);
  }

  
  if (!urlParams.toString()) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.setAttribute('colspan', '2');
    cell.textContent = 'No query parameters found.';
    row.appendChild(cell);
    tbody.appendChild(row);
  }
  } catch (error) {
    
  }
}


export const showMessage = (text, type = 'success') => {
  const messagesEl = document.getElementById('formMessages');
  messagesEl.innerHTML = '';
  const div = document.createElement('div');
  div.className = type === 'success' ? 'message-success' : 'message-error';
  div.textContent = text;
  messagesEl.appendChild(div);
}


export const isSameDate = (datetime, dateStr) => {
  let datetimeStr = typeof datetime === 'string' ? datetime : datetime.toISOString();
  return datetimeStr.slice(0, 10) === dateStr;
}


export const checkAvailability = (location, date, time) => {
  const reservations = loadReservations();

  for (const ev of events.events) {

    if (normalize(ev.location) === normalize(location) && isSameDate(ev.date, date)) {
      if (!ev.time) {
        return { ok: false, reason: `There is an official event (${ev.title}) at ${location} on ${date}.` };
      }
      if (ev.time === time) {
        return { ok: false, reason: `There is an official event (${ev.title}) at ${location} on ${date} at ${time}.` };
      }
    }
  }

  for (const r of reservations) {
    if (normalize(r.eventType) === normalize(location) && r.date === date && r.time === time) {
      return { ok: false, reason: `This slot is already reserved for ${location} on ${date} at ${time}.` };
    }
  }
  console.log("ok")
  return { ok: true, reason: null };
}
