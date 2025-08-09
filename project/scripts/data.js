

export function getUpcomingEvents(events, count = 5) {
  const today = new Date();
  
  return events.events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, count);
}



export function renderEventCard(event) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return `
    <div class="event-card">
      <h3 class="event-title">${event.title}</h3>
      <div class="event-content">
       <div>  
          <img src=${event.icon_path} loading='lazy' width="100"  >
        </div>
        <div>
          <p class="event-date"><strong>Date:</strong> ${formattedDate}</p>
          <p class="event-location"><strong>Location:</strong> ${event.location}</p>
          <p class="event-description">${event.description}</p>
        </div>
      </div>
    </div>
  `;
}