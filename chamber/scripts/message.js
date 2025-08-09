
export function message() {
  
  if (document.getElementById('visit-message')) return;

  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  let msg = '';

  if (!lastVisit) {
    msg = "Welcome! Let us know if you have any questions.";
  } else {
    const daysDiff = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (daysDiff < 1) {
      msg = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
      msg = "You last visited 1 day ago.";
    } else {
      msg = `You last visited ${daysDiff} days ago.`;
    }
  }


  const container = document.createElement('div');
  container.id = 'visit-message';
  


  const text = document.createElement('span');
  text.textContent = msg;


  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x'

  closeBtn.addEventListener('click', () => {
    container.remove();
  });

  container.appendChild(text);
  container.appendChild(closeBtn);

  document.body.appendChild(container);


  setTimeout(() => {
    container.remove();
  }, 5000);


  localStorage.setItem('lastVisit', now);
}
