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


export const renderReservationCard = (reservation) => {
  return `
    <div class="event-card">
      <div>
        <h3 class="event-title">${reservation.fullName}</h3>
        <small>Booked at: ${new Date(reservation.createdAt).toLocaleString()}</small>
      </div>
      <div class="event-content">
        <div>
          <p><strong>Location:</strong> ${reservation.eventType}</p>
          <p><strong>Date:</strong> ${reservation.date}</p>
        </div>
        <div>
          <p><strong>Time:</strong> ${reservation.time}</p>
          <p><strong>Guests:</strong> ${reservation.guests}</p>
        </div>
      </div>
    </div>
  `;
};


export const reservations = () => {
  try {


    const eventType = document.getElementById('eventType')



    const form = document.getElementById('reservationForm');
    const results = document.querySelector('#reservations-items .results')
    const showData = (filter) => {

      console.log(filter)
      results.innerHTML = ""

      const upcomming = getUpcomingEvents(
        events, 50
      )
      upcomming.filter((r) => {
        if (filter.length < 1) return r
        if (r.location === filter) return r
      }).map((event) => { results.innerHTML += renderEventCard(event) }).join('')
      const reservations = loadReservations();
      results.innerHTML += reservations.filter((r) => {
        if (filter.length < 1) return r
        if (r.eventType === filter) return r
      }).map(renderReservationCard).join('');
    }

    showData("")

    eventType.addEventListener('change', () => {
      showData(eventType.value)
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
  return { ok: true, reason: null };
}


export const showReservation = () => {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const container = document.querySelector('#data');

    if (!urlParams.toString()) {
      const noParamsDiv = document.createElement('div');
      noParamsDiv.textContent = 'No query parameters found.';
      noParamsDiv.classList.add('no-params');
      container.appendChild(noParamsDiv);
      return;
    }

    // Container para todas las filas
    const wrapper = document.createElement('div');
    wrapper.classList.add('params-wrapper');

    for (const [key, value] of urlParams.entries()) {
      const row = document.createElement('div');
      row.classList.add('param-row');

      const paramName = document.createElement('div');
      paramName.classList.add('param-name');
      paramName.textContent = key.replace(/([A-Z])/g, ' $1');

      const paramValue = document.createElement('div');
      paramValue.classList.add('param-value');
      paramValue.textContent = value;

      row.appendChild(paramName);
      row.appendChild(paramValue);

      wrapper.appendChild(row);
    }

    container.appendChild(wrapper);
  } catch (error) {
    console.error('Error showing reservation:', error);
  }
}