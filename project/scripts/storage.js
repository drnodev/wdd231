export function loadPreferences() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.body.dataset.theme = theme;
  }
}

export function savePreferences(key, value) {
  localStorage.setItem(key, value);
}
