

export async function fetchEvents() {
  const url = './data/data.json'
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to load events');
  const data = await response.json();
  console.log(data.events)
  return data.events;
}


export function getUpcomingEvents(events, count = 5) {
  const today = new Date();
  
  return events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, count);
}



export function renderEventCard(event) {
  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return `
    <div class="event-card">
      <h3 class="event-title">${event.title}</h3>
      <p class="event-date"><strong>Date:</strong> ${formattedDate}</p>
      <p class="event-location"><strong>Location:</strong> ${event.location}</p>
      <p class="event-description">${event.description}</p>
    </div>
  `;
}