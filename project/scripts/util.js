export function renderEvents(events) {
  const container = document.querySelector('#event-list');
  container.innerHTML = '';
  events.forEach(ev => {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
      <h3>${ev.title}</h3>
      <p><strong>Date:</strong> ${ev.date}</p>
      <p><strong>Location:</strong> ${ev.location}</p>
      <p>${ev.description}</p>
    `;
    container.appendChild(card);
  });
}
