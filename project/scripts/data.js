import { renderEvents } from './ui.js';

export async function loadEvents() {
  try {
    const res = await fetch('./data/events.json');
    if (!res.ok) throw new Error('Could not fetch events');
    const data = await res.json();
    const items = data.events.slice(0, 15); // O los que haya
    renderEvents(items);
  } catch (err) {
    console.error(err);
  }
}
